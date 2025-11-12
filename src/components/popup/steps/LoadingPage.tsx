import { useEffect } from 'react'

type LoadingPageProps = {
  onDone: () => void
}

export default function LoadingPage({ onDone }: LoadingPageProps) {
  useEffect(() => {
    // 백엔드 응답 완료 시 즉시 로딩 종료 (이벤트 기반)
    const handle = () => onDone()
    window.addEventListener('webtest-loading-done', handle as EventListener)

    // 네트워크/예외 상황 대비 타임아웃(폴백)
    const id = setTimeout(() => onDone(), 15000)

    return () => {
      clearTimeout(id)
      window.removeEventListener('webtest-loading-done', handle as EventListener)
    }
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="popup_loading_spinner" />
      <div className="popup_loading_text">현재 페이지를 분석하고 있습니다</div>
    </div>
  )
}
