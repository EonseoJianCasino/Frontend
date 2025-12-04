import type { CurTest } from '@/types/Test.types'
import { saveWebVitals, type WebVitalsRequest } from '@/apis/saveWebVitals'

const getHashedWebVitalsFromViteManifest = async (): Promise<string | null> => {
  try {
    const res = await fetch(chrome.runtime.getURL('.vite/manifest.json'))
    if (!res.ok) return null
    const manifest = await res.json()
    const entry = manifest?.['src/content/webVitalsInject.ts'] as { file?: string } | undefined
    if (entry?.file && entry.file.endsWith('.js')) {
      return entry.file
    }
  } catch {
    // ignore
  }
  return null
}

const buildScriptCandidates = async () => {
  const manifest = chrome.runtime.getManifest()
  const candidates: string[] = []

  // Vite manifest에서 해시된 번들 우선
  const hashed = await getHashedWebVitalsFromViteManifest()
  if (hashed) {
    candidates.push(hashed)
  }

  // Dev 기본 경로들 (JS만)
  candidates.push('src/content/webVitalsInject.js')

  // manifest.web_accessible_resources에서 webVitalsInject 포함 JS만 추출
  const war =
    manifest.web_accessible_resources
      ?.flatMap((item) => {
        if (typeof item === 'string') return []
        if (Array.isArray(item.resources)) return item.resources
        return []
      })
      ?.filter(
        (p): p is string =>
          typeof p === 'string' && p.endsWith('.js') && p.includes('webVitalsInject'),
      ) ?? []
  candidates.push(...war)

  // Deduplicate while preserving order
  return [...new Set(candidates)]
}

const resolveWebVitalsScriptPath = async (): Promise<string[] | null> => {
  const candidates = await buildScriptCandidates()
  // Probe availability; keep only fetchable paths
  const available: string[] = []
  await Promise.all(
    candidates.map(async (candidate) => {
      try {
        const url = chrome.runtime.getURL(candidate)
        const res = await fetch(url)
        if (res.ok) {
          available.push(candidate)
        }
      } catch {
        /* ignore */
      }
    }),
  )
  if (available.length > 0) return available
  return null
}

const injectedTabs = new Set<number>()

chrome.tabs.onRemoved.addListener((tabId) => {
  injectedTabs.delete(tabId)
})

chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (info.status === 'loading') {
    injectedTabs.delete(tabId)
  }
})

const ensureWebVitalsInjected = async (tabId: number): Promise<string | null> => {
  const scriptCandidates = await resolveWebVitalsScriptPath()
  if (!scriptCandidates || scriptCandidates.length === 0) {
    console.error('[Background] no available webVitals script to inject')
    return null
  }

  if (injectedTabs.has(tabId)) {
    return scriptCandidates[0] ?? null
  }

  for (const candidate of scriptCandidates) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: [candidate],
      })
      injectedTabs.add(tabId)
      return candidate
    } catch (err) {
      console.warn('[Background] inject failed for candidate', candidate, err)
    }
  }

  return null
}

const isHttpUrl = (url?: string | null) => url?.startsWith('http://') || url?.startsWith('https://')
let lastHttpTabId: number | null = null

chrome.tabs.onUpdated.addListener((tabId, _info, tab) => {
  if (isHttpUrl(tab.url)) {
    lastHttpTabId = tabId
  }
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) return
    if (isHttpUrl(tab.url)) {
      lastHttpTabId = tabId
    }
  })
})

const resolveTargetTabId = async (preferredTabId?: number | null): Promise<number | null> => {
  const tryTab = (candidate?: number | null) =>
    new Promise<number | null>((resolve) => {
      if (candidate == null) return resolve(null)
      chrome.tabs.get(candidate, (tab) => {
        if (chrome.runtime.lastError) return resolve(null)
        if (isHttpUrl(tab.url) && tab.id != null) {
          resolve(tab.id)
        } else {
          resolve(null)
        }
      })
    })

  // 1) 메시지에서 전달된 탭
  const fromMessage = await tryTab(preferredTabId)
  if (fromMessage != null) return fromMessage

  // 2) 마지막으로 본 http/https 탭
  const fromLastSeen = await tryTab(lastHttpTabId)
  if (fromLastSeen != null) return fromLastSeen

  // 3) 현재 창의 활성 http/https 탭
  return new Promise<number | null>((resolve) => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true, url: ['http://*/*', 'https://*/*'] },
      (tabs) => {
        if (chrome.runtime.lastError) {
          resolve(null)
          return
        }
        resolve(tabs[0]?.id ?? null)
      },
    )
  })
}

// runtime.onMessage: 팝업/콘텐츠 스크립트 등에서 보내는 메시지를 수신
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'RUN_WEB_VITALS') {
    resolveTargetTabId(message.tabId as number | undefined)
      .then(async (targetTabId) => {
        if (targetTabId == null) {
          console.warn('[Background] no http/https tab found for injection', {
            fromMsgTabId: message.tabId,
          })
          sendResponse({ ok: false, error: 'no target tab' })
          return
        }
        const injectedScript = await ensureWebVitalsInjected(targetTabId)
        if (!injectedScript) {
          sendResponse({ ok: false, error: 'inject failed' })
          return
        }

        // 콘텐츠 스크립트에 실행 트리거 전달
        chrome.tabs.sendMessage(targetTabId, { type: 'START_WEB_VITALS' }, (resp) => {
          if (chrome.runtime.lastError) {
            console.warn(
              '[Background] sendMessage to content failed',
              chrome.runtime.lastError.message,
            )
            sendResponse({
              ok: true,
              tabId: targetTabId,
              script: injectedScript,
              warn: 'no listener',
            })
            return
          }
          sendResponse({ ok: true, tabId: targetTabId, script: injectedScript, contentResp: resp })
        })
      })
      .catch((err) => {
        console.error('[Background] resolveTargetTabId failed', err)
        sendResponse({ ok: false, error: String(err) })
      })
    // 요청을 보낸 쪽에 응답
    console.log('[Background] RUN_WEB_VITALS', { data: message.data, tabId: sender.tab?.id })
    return true
  }

  if (message?.type === 'WEB_VITALS') {
    const runId = message.runId as string | undefined
    const metrics = message.data as Partial<WebVitalsRequest>
    console.log('[Background] WEB_VITALS received', {
      runId,
      data: metrics,
      reason: message.reason,
    })
    chrome.storage.local.get<{
      curTest?: CurTest
      curTestStatus?: string
      curTestStartedAt?: number
    }>(
      ['curTest', 'curTestStatus', 'curTestStartedAt'],
      ({ curTest, curTestStatus, curTestStartedAt }) => {
        if (!curTest?.testId) {
          console.error('[Background] testId missing in curTest')
          sendResponse({ ok: false, error: 'testId missing' })
          return
        }

        if (curTestStatus !== 'loading') {
          console.warn('[Background] WEB_VITALS ignored because status is not loading', {
            curTestStatus,
          })
          sendResponse({ ok: false, error: 'not loading' })
          return
        }

        if (!runId) {
          console.warn('[Background] WEB_VITALS without runId, ignoring')
          sendResponse({ ok: false, error: 'runId missing' })
          return
        }
        if (runId !== curTest.testId) {
          console.warn('[Background] WEB_VITALS runId mismatch, ignoring', {
            runId,
            curTestTestId: curTest.testId,
          })
          sendResponse({ ok: false, error: 'runId mismatch' })
          return
        }

        const metricKeys: (keyof WebVitalsRequest)[] = ['CLS', 'FCP', 'INP', 'LCP', 'TTFB']
        const hasAllMetrics =
          metrics &&
          metricKeys.every((key) => typeof metrics[key] === 'number' && !Number.isNaN(metrics[key]))
        if (!hasAllMetrics) {
          console.warn('[Background] WEB_VITALS missing metrics, ignoring', metrics)
          sendResponse({ ok: false, error: 'metrics missing' })
          return
        }

        if (!curTestStartedAt) {
          console.warn('[Background] curTestStartedAt missing, ignoring')
          sendResponse({ ok: false, error: 'start missing' })
          return
        }

        ;(async () => {
          try {
            const body: WebVitalsRequest = {
              CLS: metrics.CLS!,
              FCP: metrics.FCP!,
              INP: metrics.INP!,
              LCP: metrics.LCP!,
              TTFB: metrics.TTFB!,
            }
            await saveWebVitals(curTest.testId, body)
            console.log('[Background] saveWebVitals success', curTest.testId)
            chrome.storage.local.set({ curTestStatus: 'done', curTestStatusUpdatedAt: Date.now() })
            sendResponse({ ok: true })
          } catch (e) {
            console.error('[Background] saveWebVitals failed', e)
            sendResponse({ ok: false, error: String(e) })
          }
        })()
      },
    )
    return true
  }
})
