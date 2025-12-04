const BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateTestRequest = {
  url: string
}

type CreateTestResponse = {
  success: {
    message: string
    data: {
      url: string
      testId: string
      domainName: string
    }
  }
}

export async function createTest(url: string) {
  console.log('createTest called with url:', url, 'BASE_URL:', BASE_URL)
  const getURL: CreateTestRequest = { url }

  const response = await fetch(`${BASE_URL}/api/tests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getURL),
  })

  if (!response.ok) {
    console.error('createTest failed:', response.status, response.statusText)
    throw new Error('create 요청 실패')
  }

  const json = (await response.json()) as CreateTestResponse

  const { message } = json.success
  const { testId, url: targetURL, domainName } = json.success.data

  return { message, testId, targetURL, domainName }
}
