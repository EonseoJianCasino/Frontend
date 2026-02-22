import '@/styles/popup.css'
import { useEffect, useRef, useState } from 'react'
import logo from '@/assets/logo.svg'
import Card from '@/components/popup/Card'
import CurrentPage from '@/components/popup/steps/CurrentPage'
import LoadingPage from '@/components/popup/steps/LoadingPage'
import ResultPage from '@/components/popup/steps/ResultPage'

export default function Popup() {
  const [step, setStep] = useState(0)
  const delayedDoneTimer = useRef<number | undefined>(undefined)
  const MIN_LOADING_MS = 10000
  const STALE_LOADING_MS = 300000

  const next = () => setStep((s) => Math.min(s + 1, 2))
  const prev = () => {
    chrome.storage.local.remove([
      'curTest',
      'curTestStatus',
      'curTestStatusUpdatedAt',
      'curTestStartedAt',
    ])
    setStep(0)
  }

  const resolveStepFromStatus = (status?: string, updatedAt?: number) => {
    if (status === 'loading') {
      const stale = updatedAt && Date.now() - updatedAt > STALE_LOADING_MS
      return stale ? 0 : 1
    }
    if (status === 'done') return 2
    return 0
  }

  useEffect(() => {
    const scheduleDelayedDone = (startedAt: number) => {
      const now = Date.now()
      const remaining = startedAt + MIN_LOADING_MS - now
      if (remaining <= 0) {
        setStep(2)
        return
      }
      if (delayedDoneTimer.current) {
        clearTimeout(delayedDoneTimer.current)
      }
      delayedDoneTimer.current = window.setTimeout(() => {
        chrome.storage.local.get<{
          curTestStatus?: string
          curTestStartedAt?: number
          curTestStatusUpdatedAt?: number
        }>(['curTestStatus', 'curTestStartedAt', 'curTestStatusUpdatedAt'], (res) => {
          if (res.curTestStatus === 'done' && res.curTestStartedAt === startedAt) {
            setStep(2)
          }
        })
      }, remaining)
    }

    const applyStepFromStatus = (status?: string, updatedAt?: number, startedAt?: number) => {
      const nextStep = resolveStepFromStatus(status, updatedAt)
      if (nextStep === 2 && startedAt) {
        // 최소 로딩 시간 보장
        const now = Date.now()
        if (now < startedAt + MIN_LOADING_MS) {
          setStep(1)
          scheduleDelayedDone(startedAt)
          return
        }
      }
      setStep(nextStep)
    }

    const loadStatus = () => {
      chrome.storage.local.get<{
        curTest?: { targetURL?: string }
        curTestStatus?: string
        curTestStatusUpdatedAt?: number
        curTestStartedAt?: number
      }>(['curTest', 'curTestStatus', 'curTestStatusUpdatedAt', 'curTestStartedAt'], (res) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeUrl = tabs[0]?.url
          if (activeUrl && res.curTest?.targetURL && res.curTest.targetURL !== activeUrl) {
            chrome.storage.local.remove([
              'curTest',
              'curTestStatus',
              'curTestStatusUpdatedAt',
              'curTestStartedAt',
            ])
            setStep(0)
            return
          }
          applyStepFromStatus(res.curTestStatus, res.curTestStatusUpdatedAt, res.curTestStartedAt)
        })
      })
    }
    loadStatus()
    const listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (
      changes,
      area,
    ) => {
      if (area !== 'local') return
      if (changes.curTestStatus || changes.curTestStatusUpdatedAt || changes.curTestStartedAt) {
        chrome.storage.local.get<{
          curTestStatus?: string
          curTestStatusUpdatedAt?: number
          curTestStartedAt?: number
        }>(['curTestStatus', 'curTestStatusUpdatedAt', 'curTestStartedAt'], (res) => {
          applyStepFromStatus(res.curTestStatus, res.curTestStatusUpdatedAt, res.curTestStartedAt)
        })
      }
    }
    chrome.storage.onChanged.addListener(listener)
    return () => {
      if (delayedDoneTimer.current) {
        clearTimeout(delayedDoneTimer.current)
      }
      chrome.storage.onChanged.removeListener(listener)
    }
  }, [])

  const renderBody = () => {
    if (step === 0) return <CurrentPage onNext={next} />
    else if (step === 1) return <LoadingPage onDone={() => setStep(2)} />
    else return <ResultPage onOpenDetail={openDetail} onPrev={prev} />
  }

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('is-popup')
    return () => {
      html.classList.remove('is-popup')
    }
  }, [])

  const openDetail = () => {
    const baseUrl = chrome.runtime.getURL('index.html')
    // 대시보드 진입 시 약간 아래로 스크롤하기 위한 힌트 파라미터
    const targetUrl = `${baseUrl}#/app/dashboard?scroll=detail`

    chrome.tabs.query({}, (tabs) => {
      const existing = tabs.find((tab) => tab.url?.startsWith(`${baseUrl}#/app`))

      if (existing?.id != null) {
        const updateProps: chrome.tabs.UpdateProperties = { active: true }
        if (existing.url !== targetUrl) {
          updateProps.url = targetUrl
        }
        chrome.tabs.update(existing.id, updateProps)

        if (existing.windowId != null) {
          chrome.windows.update(existing.windowId, { focused: true })
        }
      } else {
        chrome.tabs.create({ url: targetUrl })
      }

      window.close()
    })
  }

  const titles = ['현재 페이지', '분석 실행중', '성능 / 보안 분석결과'] as const

  return (
    <main className="popup_container">
      <header className="popup_header">
        <img src={logo} alt="logo" className="popup_logo" />
        <div className="popup_title">Performance Test</div>
      </header>
      <Card title={titles[step]}>
        <div className="p-4">{renderBody()}</div>
      </Card>
    </main>
  )
}
