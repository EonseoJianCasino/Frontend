import { useEffect } from 'react'
import { waitForAiReadyWithRetry, waitForCoreReady } from '@/apis/waitForCoreReady'
import type { CurTest } from '@/types/Test.types'

type LoadingPageProps = {
  onDone: () => void
}

export default function LoadingPage({ onDone }: LoadingPageProps) {
  useEffect(() => {
    let cancelled = false
    const timeoutMs = 210000
    const heartbeatMs = 5000

    const heartbeatId = window.setInterval(() => {
      if (cancelled) return
      chrome.storage.local.set({ curTestStatusUpdatedAt: Date.now() })
    }, heartbeatMs)

    const timeoutId = window.setTimeout(() => {
      if (cancelled) return
      console.warn('Loading timeout, resetting state')
      chrome.storage.local.remove([
        'curTest',
        'curTestStatus',
        'curTestStatusUpdatedAt',
        'curTestStartedAt',
      ])
    }, timeoutMs)

    chrome.storage.local.get<{ curTest?: CurTest }>('curTest', async (result) => {
      const curTest = result.curTest
      console.log('Loading curTest : ', curTest?.testId)

      if (!curTest?.testId) {
        console.error('testId null in curTest')
        return
      }

      try {
        console.log('[POPUP][FLOW][START]', { testId: curTest.testId })
        await waitForCoreReady(curTest.testId)
        if (cancelled) return

        console.log('[POPUP][FLOW][CORE_READY][DONE]', { testId: curTest.testId })
        chrome.storage.local.set({ curTestStatusUpdatedAt: Date.now() })

        console.log('[POPUP][FLOW][AI_READY][START]', { testId: curTest.testId })
        await waitForAiReadyWithRetry(curTest.testId)
        if (cancelled) return

        await chrome.storage.local.set({
          curTestStatus: 'done',
          curTestStatusUpdatedAt: Date.now(),
        })
        console.log('[POPUP][FLOW][DONE]', { testId: curTest.testId })
        onDone()
      } catch (e) {
        if (cancelled) return
        console.error('[POPUP][FLOW][FAIL]', { testId: curTest.testId, error: e })
      } finally {
        if (!cancelled) {
          window.clearInterval(heartbeatId)
          window.clearTimeout(timeoutId)
        }
      }
    })

    return () => {
      cancelled = true
      clearInterval(heartbeatId)
      clearTimeout(timeoutId)
    }
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="popup_loading_spinner" />
      <div className="popup_loading_text">현재 페이지를 분석하고 있습니다</div>
    </div>
  )
}
