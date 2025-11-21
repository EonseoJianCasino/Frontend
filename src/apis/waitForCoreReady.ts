const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function waitForCoreReady(testId: string) {
  const url = `${BASE_URL}/api/tests/${testId}/wait?topic=CORE_READY&timeoutSec=60`

  const response = await fetch(url)

  if (!response.ok) {
    console.error('waitForCoreReady failed: ', response.status, response.statusText)
    throw new Error('waitForCoreReady 요청 실패')
  }
}
