import copyIcon from '@/assets/icons/copy.svg'
import { useEffect, useState } from 'react'
import { createTest } from '@/apis/test'
import { getWebVitals } from '@/utils/getWebVitals'
import { saveWebVitals } from '@/apis/saveWebVitals'

type CurrentPageProps = {
  onNext: () => void
}

export default function CurrentPage({ onNext }: CurrentPageProps) {
  const Click = async () => {
    try {
      const res = await createTest(url)
      console.log('CreateTest : ', res)
      await chrome.storage.local.set({ curTest: res })
      onNext()
      //const webVitals = await getWebVitals()
      //console.log('WebVitals : ', webVitals)
      //console.log(res.testId)
      const body = {
        LCP: 1,
        CLS: 1,
        INP: 1,
        FCP: 1,
        TTFB: 1,
      }
      saveWebVitals(res.testId, body)
      //todo : web‑vitals 수집 로직을 팝업이 아닌 페이지/콘텐츠 스크립트로 옮기기
    } catch (e) {
      console.error('CreateTest error: ', e)
    }
  }

  const [url, setUrl] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {}
  }
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab?.url) {
        setUrl(activeTab.url)
      }
    })
  })

  return (
    <>
      <div className="popup_infoBox">
        <div className="popup_infoText">
          <div className="popup_infoLabel">CURRENT URL</div>
          <div className="popup_infoValue">{url}</div>
        </div>
        <button type="button" className="popup_copyBtn" title="Copy" onClick={copy}>
          <img src={copyIcon} alt="copy" width={18} />
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <button type="button" onClick={Click} className="popup_btn_submit popup_btn_background">
          성능 & 보안 분석 실행
        </button>
      </div>
    </>
  )
}
