// import defaultAxios from './defaultAxios'
import type { SolutionResponse } from '@/types/Solution.types'
import defaultAxios from './defaultAxios'

// TODO 기대효과? API 받아오는거 다시 해야함
// * 개선방안 & 효과 API 패칭
/**
 * 개선방안 & 효과 API 패칭
 * @param testId
 * @returns
 */
export const fetchSolutions = async (testId: string): Promise<SolutionResponse> => {
  try {
    const url = `/api/tests/${testId}/ai/recommendations`
    const response = await defaultAxios.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Solutions data', error)
    throw error
  }
}
