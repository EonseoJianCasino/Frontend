import { useEffect } from 'react'
import { waitForCoreReady } from '@/apis/waitForCoreReady'
import type { CurTest } from '@/types/Test.types'

type LoadingPageProps = {
  onDone: () => void
}

export default function LoadingPage({ onDone }: LoadingPageProps) {
  useEffect(() => {
    let cancelled = false
    const timeoutMs = 35000
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

    chrome.storage.local.get<{ curTest?: CurTest }>('curTest', (result) => {
      const curTest = result.curTest
      console.log('Loading curTest : ', curTest?.testId)

      if (!curTest) {
        console.error('testId null in curTest')
        return
      }

      waitForCoreReady(curTest.testId)
        .then(() => {
          if (cancelled) return
          console.log('CORE_READY 응답 도착 (웹바이탈 저장 대기)')
          // 로딩 상태 유지하되 타임스탬프 갱신해서 stale 초기화를 방지한다.
          chrome.storage.local.set({ curTestStatusUpdatedAt: Date.now() })
        })
        .catch((e) => {
          if (cancelled) return
          console.error('waitForCoreReady error', e)
        })
    })

    return () => {
      cancelled = true
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
