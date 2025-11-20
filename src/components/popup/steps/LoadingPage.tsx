import { useEffect } from 'react'
import { waitForCoreReady } from '@/apis/waitForCoreReady'

type LoadingPageProps = {
  onDone: () => void
}

export default function LoadingPage({ onDone }: LoadingPageProps) {
  useEffect(() => {
    let cancelled = false

    chrome.storage.local.get('curTest', (result) => {
      const curTest = result.curTest
      console.log('Loading curTest : ', curTest)

      if (!curTest || !curTest.testId) {
        console.error('testId null in curTest')
        return
      }

      waitForCoreReady(curTest.testId)
        .then(() => {
          if (cancelled) return
          console.log('CORE_READY 응답 도착')
          onDone()
        })
        .catch((e) => {
          if (cancelled) return
          console.error('waitForCoreReady error', e)
        })
    })

    return () => {
      cancelled = true
    }
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="popup_loading_spinner" />
      <div className="popup_loading_text">현재 페이지를 분석하고 있습니다</div>
    </div>
  )
}
