const BASE_URL = import.meta.env.VITE_API_BASE_URL

type GetScoreResults = {
  success: {
    message: string
    data: {
      totalScore: string
      securityTotalScore: string
      webTotalScore: string
    }
  }
}

export async function getScore(testId: string) {
  const url = `${BASE_URL}/api/tests/${testId}/scores/total`

  const response = await fetch(url)

  if (!response.ok) {
    console.log('get Score failed', response.status, response.statusText)
    throw new Error('get Score 요청 실패')
  }

  const json = (await response.json()) as GetScoreResults
  const data = json?.success?.data

  if (!data) {
    throw new Error('get Score 파싱 실패')
  }

  return {
    totalScore: data.totalScore,
    securityTotalScore: data.securityTotalScore,
    webTotalScore: data.webTotalScore,
  }
}
