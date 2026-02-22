import type { SolutionResponse } from '@/types/Solution.types'
import defaultAxios from './defaultAxios'

// * 개선방안 & 효과 API 패칭
export const fetchSolutions = async (testId: string): Promise<SolutionResponse> => {
  if (!testId) {
    throw new Error('testId is required')
  }

  const url = `/api/tests/${testId}/ai/recommendations`
  const response = await defaultAxios.get(url)
  return response.data
}
