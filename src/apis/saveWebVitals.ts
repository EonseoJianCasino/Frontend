const BASE_URL = import.meta.env.VITE_API_BASE_URL

export type WebVitalsRequest = {
  LCP: number
  CLS: number
  INP: number
  TTFB: number
  FCP: number
}

export async function saveWebVitals(testId: string, body: WebVitalsRequest) {
  const url = `${BASE_URL}/api/tests/${testId}/web-vitals`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('saveWebVitals failed: ', res.status, res.statusText)
    throw new Error('Web Vitals 저장 실패')
  }
}
