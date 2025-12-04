import { getWebVitals, type MetricName, type WebVitalsValues } from '@/utils/getWebVitals'

declare global {
  interface Window {
    __webVitalsInjected?: boolean
    __webVitalsRunId?: string
  }
}

const getRunId = (): Promise<string> =>
  new Promise((resolve) => {
    try {
      chrome.storage?.local?.get('curTest', (res: { curTest?: { testId?: string } }) => {
        const id = res.curTest?.testId
        if (typeof id === 'string' && id.length > 0) {
          resolve(id)
        } else {
          resolve(`run-${Date.now()}`)
        }
      })
    } catch {
      resolve(`run-${Date.now()}`)
    }
  })

const runWebVitals = async () => {
  const runId = await getRunId()
  if (window.__webVitalsRunId === runId) {
    console.log('[webVitalsInject] already ran for runId', runId)
    return
  }
  window.__webVitalsRunId = runId
  console.log('[webVitalsInject] injected', runId)

  const metrics: Partial<WebVitalsValues> = {}
  let sent = false
  let fallbackTimer: number | undefined

  const normalizeData = (): WebVitalsValues => ({
    CLS: metrics.CLS ?? 0,
    FCP: metrics.FCP ?? 0,
    INP: metrics.INP ?? 0,
    LCP: metrics.LCP ?? 0,
    TTFB: metrics.TTFB ?? 0,
  })

  const cleanup = () => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer)
    }
    window.removeEventListener('visibilitychange', onHidden)
    window.removeEventListener('pagehide', onHidden)
  }

  const sendIfNeeded = (reason: string) => {
    if (sent) return
    sent = true
    const data = normalizeData()
    console.log('[webVitalsInject] sending WEB_VITALS', reason, { runId, data })
    chrome.runtime.sendMessage({ type: 'WEB_VITALS', data, reason, runId }).catch((err) => {
      console.error('[webVitalsInject] sendMessage failed', err)
    })
    cleanup()
  }

  const maybeSendComplete = () => {
    if (
      metrics.CLS != null &&
      metrics.FCP != null &&
      metrics.INP != null &&
      metrics.LCP != null &&
      metrics.TTFB != null
    ) {
      sendIfNeeded('complete')
    }
  }

  const onHidden = () => {
    sendIfNeeded('pagehide')
  }

  window.addEventListener('visibilitychange', onHidden)
  window.addEventListener('pagehide', onHidden)

  fallbackTimer = window.setTimeout(() => {
    sendIfNeeded('timeout')
  }, 40000)

  getWebVitals(10000, (name: MetricName, value: number) => {
    metrics[name] = value
    console.log('[webVitalsInject] metric', name, value)
    maybeSendComplete()
  })
    .then((values) => {
      // getWebVitals가 모든 값을 모은 경우 보정해 두고 전송
      Object.assign(metrics, values)
      maybeSendComplete()
    })
    .catch((err) => {
      console.error('[webVitalsInject] failed', err)
      sendIfNeeded('error')
    })
}

const ensureListener = () => {
  if (window.__webVitalsInjected) return
  window.__webVitalsInjected = true

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === 'START_WEB_VITALS') {
      runWebVitals().finally(() => sendResponse?.({ ok: true }))
      return true
    }
    return undefined
  })
}

ensureListener()
