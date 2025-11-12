import copyIcon from '@/assets/icons/copy.svg'
type CurrentPageProps = {
  onNext: () => void
}

export default function CurrentPage({ onNext }: CurrentPageProps) {
  const url =
    'https://example.com/very/long/path/with/many/segments/and?query=param&another=long#hash-section'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {}
  }

  // 즉시 로딩 화면으로 전환 후, test 생성 API 호출 및 콘솔 출력
  const startTest = async () => {
    // 바로 로딩 UI(step=1)로 전환
    onNext()
    try {
      const res = await fetch('http://localhost:8080/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      // 응답 본문이 JSON이 아닐 가능성(인코딩 문제 등)도 고려해 파싱 시도
      const raw = await res.text()
      let parsed: unknown
      try {
        parsed = JSON.parse(raw)
      } catch {
        parsed = raw
      }

      console.log('[TestAPI] POST /api/tests', res.status, parsed)
      if (!res.ok) console.error('[TestAPI] create failed', parsed)

      // testId 추출 후 저장 및 더미 Web Vitals 전송
      let testId: string | null = null
      try {
        const successData: any = (parsed as any)?.success?.data ?? (parsed as any)?.data ?? null
        testId = successData?.testId ?? null
      } catch {}

      if (testId) {
        try {
          // 확장앱 스토리지에 보관
          // @ts-ignore: chrome 환경에서만 존재
          await chrome?.storage?.local?.set?.({ lastTestId: testId })
        } catch {}

        try {
          const metrics = { LCP: 3.2, CLS: 0.18, INP: 220, FCP: 1.4, TBT: 180, TTFB: 0.25 }
          const vitalsRes = await fetch(`http://localhost:8080/api/tests/${testId}/web-vitals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metrics),
          })
          const vitalsRaw = await vitalsRes.text()
          let vitalsParsed: unknown
          try {
            vitalsParsed = JSON.parse(vitalsRaw)
          } catch {
            vitalsParsed = vitalsRaw
          }
          console.log('[TestAPI] POST /api/tests/{id}/web-vitals', vitalsRes.status, vitalsParsed)

          // 저장된 Web Vitals를 즉시 GET으로 확인
          try {
            const getRes = await fetch(`http://localhost:8080/api/tests/${testId}/web-vitals`)
            const getRaw = await getRes.text()
            let getParsed: unknown
            try {
              getParsed = JSON.parse(getRaw)
            } catch {
              getParsed = getRaw
            }
            console.log('[TestAPI] GET /api/tests/{id}/web-vitals', getRes.status, getParsed)
          } catch (e) {
            console.error('[TestAPI] web-vitals get error', e)
          }
        } catch (e) {
          console.error('[TestAPI] web-vitals send error', e)
        }
      }

      // 응답 수신(및 후속 처리) 후 로딩 종료 이벤트 발송
      window.dispatchEvent(
        new CustomEvent('webtest-loading-done', {
          detail: { ok: res.ok, status: res.status, data: parsed, testId },
        }),
      )
    } catch (e) {
      console.error('[TestAPI] request error', e)
      // 오류 시에도 로딩 종료 이벤트 발송
      window.dispatchEvent(
        new CustomEvent('webtest-loading-done', {
          detail: { ok: false, error: String(e) },
        }),
      )
    }
  }

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
        <button type="button" onClick={startTest} className="popup_btn_submit popup_btn_background">
          성능 & 보안 분석 실행
        </button>
      </div>
    </>
  )
}
