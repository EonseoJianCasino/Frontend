const BASE_URL = import.meta.env.VITE_API_BASE_URL
const AI_WAIT_INITIAL_TIMEOUT_SEC = 60
const AI_WAIT_RETRY_TIMEOUT_SEC = 90
const AI_WAIT_MAX_CYCLES = 3

type ErrorWithMessage = {
  message?: string
}

const parseErrorMessage = async (response: Response, fallback: string): Promise<string> => {
  try {
    const json = (await response.json()) as ErrorWithMessage
    if (typeof json?.message === 'string' && json.message.trim().length > 0) {
      return json.message
    }
    return fallback
  } catch {
    return fallback
  }
}

export async function waitForCoreReady(testId: string) {
  const url = `${BASE_URL}/api/tests/${testId}/wait?topic=CORE_READY&timeoutSec=30`
  console.log('[WAIT][CORE_READY][START]', { testId, timeoutSec: 30, url })

  const response = await fetch(url)

  if (!response.ok) {
    console.error('waitForCoreReady failed: ', response.status, response.statusText)
    throw new Error('waitForCoreReady 요청 실패')
  }
}

const waitForAiReady = async (testId: string, timeoutSec: number): Promise<Response> => {
  const url = `${BASE_URL}/api/tests/${testId}/wait?topic=AI_READY&timeoutSec=${timeoutSec}`
  console.log('[WAIT][AI_READY][REQUEST]', { testId, timeoutSec, url })
  return fetch(url)
}

const retryAiCall = async (testId: string): Promise<void> => {
  const retryUrl = `${BASE_URL}/api/tests/${testId}/ai/retry`
  console.warn('[WAIT][AI_READY][RETRY][REQUEST]', { testId, retryUrl })
  const retryResponse = await fetch(retryUrl, { method: 'POST' })

  if (retryResponse.ok || retryResponse.status === 202) {
    console.log('[WAIT][AI_READY][RETRY][OK]', { testId, status: retryResponse.status })
    return
  }

  const message = await parseErrorMessage(retryResponse, 'AI 재호출 요청 실패')
  console.error('[WAIT][AI_READY][RETRY][FAIL]', {
    testId,
    status: retryResponse.status,
    message,
  })
  throw new Error(`${message} (status=${retryResponse.status})`)
}

export async function waitForAiReadyWithRetry(testId: string): Promise<void> {
  console.log('[WAIT][AI_READY][START]', { testId, maxCycles: AI_WAIT_MAX_CYCLES })
  let timeoutSec = AI_WAIT_INITIAL_TIMEOUT_SEC

  for (let cycle = 0; cycle < AI_WAIT_MAX_CYCLES; cycle += 1) {
    const waitResponse = await waitForAiReady(testId, timeoutSec)
    console.log('[WAIT][AI_READY][RESPONSE]', {
      testId,
      cycle: cycle + 1,
      status: waitResponse.status,
    })

    if (waitResponse.ok) {
      console.log('[WAIT][AI_READY][DONE]', { testId, cycle: cycle + 1 })
      return
    }

    if (waitResponse.status === 204) {
      console.warn('[WAIT][AI_READY][TIMEOUT]', { testId, cycle: cycle + 1 })
      await retryAiCall(testId)

      const recommended = Number.parseInt(
        waitResponse.headers.get('X-Wait-Recommend-Timeout-Sec') ?? `${AI_WAIT_RETRY_TIMEOUT_SEC}`,
        10,
      )
      timeoutSec = Number.isFinite(recommended) ? recommended : AI_WAIT_RETRY_TIMEOUT_SEC
      console.log('[WAIT][AI_READY][NEXT_TIMEOUT]', { testId, timeoutSec })
      continue
    }

    console.warn('[WAIT][AI_READY][NON_204_RETRY]', {
      testId,
      cycle: cycle + 1,
      status: waitResponse.status,
    })
    await retryAiCall(testId)
    timeoutSec = AI_WAIT_RETRY_TIMEOUT_SEC
  }

  console.error('[WAIT][AI_READY][GIVE_UP]', { testId, maxCycles: AI_WAIT_MAX_CYCLES })
  throw new Error('AI_READY 대기 최대 횟수 초과')
}
