import copyIcon from '@/assets/icons/copy.svg'
import { useEffect, useState } from 'react'
import { createTest } from '@/apis/test'

type CurrentPageProps = {
  onNext: () => void
}

export default function CurrentPage({ onNext }: CurrentPageProps) {
  const [submitting, setSubmitting] = useState(false)
  const Click = async () => {
    if (submitting) return
    setSubmitting(true)
    try {
      const startedAt = Date.now()

      // 최신 활성 탭을 조회하여 http/https인 경우에만 진행
      const resolvedTab = await new Promise<chrome.tabs.Tab | null>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (chrome.runtime.lastError) {
            resolve(null)
            return
          }
          resolve(tabs[0] ?? null)
        })
      })
      const isHttpUrl = (u?: string) => !!u && (u.startsWith('http://') || u.startsWith('https://'))
      if (!resolvedTab?.id || !isHttpUrl(resolvedTab.url)) {
        alert(
          '분석할 http/https 탭을 찾지 못했습니다. 대상 페이지를 활성화한 뒤 다시 실행해주세요.',
        )
        return
      }

      const res = await createTest(url)
      console.log('CreateTest : ', res)
      await chrome.storage.local.set({
        curTest: res,
        curTestStatus: 'loading',
        curTestStatusUpdatedAt: startedAt,
        curTestStartedAt: startedAt,
      })
      chrome.runtime.sendMessage({ type: 'RUN_WEB_VITALS', tabId: resolvedTab.id })
      onNext()
    } catch (e) {
      console.error('CreateTest error: ', e)
    } finally {
      setSubmitting(false)
    }
  }

  const [url, setUrl] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {
      console.error('URL Copy failed', err)
    }
  }
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab?.url) {
        setUrl(activeTab.url)
      }
    })
  }, [])

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
        <button
          type="button"
          onClick={Click}
          className="popup_btn_submit popup_btn_background"
          disabled={submitting}
        >
          {submitting ? '실행 중...' : '성능 & 보안 분석 실행'}
        </button>
      </div>
    </>
  )
}
