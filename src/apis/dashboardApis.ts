import type {
  AiPriorityResponse,
  DomainURLResponse,
  ScoreTotalResponse,
  SecurityVitalsResponse,
  WebVitalItemResponse,
} from '@/types/Dashboard.types'
import defaultAxios from './defaultAxios'

// const BASE_URL = import.meta.env.VITE_API_BASE_URL
// const BASE_URL = '33a74007-2d72-4684-b882-67cc42b27f36'
// ! 대시보드 API 요청 관련 로직
// TODO : 차트 fetch 만들어야한다.

//* 대시보드 / URL, 도메인 네임
export const fetchURLandDomain = async (testId: string): Promise<DomainURLResponse> => {
  try {
    const url = `/api/tests/${testId}`
    const response = await defaultAxios.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch cell sum data', error)
    throw error
  }
}

// * 성능 지표
export const fetchWebVitals = async (testId: string): Promise<WebVitalItemResponse> => {
  try {
    const url = `/api/tests/${testId}/web-vitals`
    const response = await defaultAxios.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch cell sum data', error)
    throw error
  }
}

// * 보안 지표
export const fetchSecurityVitals = async (testId: string): Promise<SecurityVitalsResponse> => {
  try {
    const url = `/api/tests/${testId}/security-vitals`
    const response = await defaultAxios.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch cell sum data', error)
    throw error
  }
}

// * 대시보드 total 점수
export const fetchScoreTotal = async (testId: string): Promise<ScoreTotalResponse> => {
  try {
    const url = `/api/tests/${testId}/scores/total`
    const response = await defaultAxios.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch cell sum data', error)
    throw error
  }
}

// * 대시보드/ 우선 개선이 필요한항목
export const fetchAiPriority = async (testId: string): Promise<AiPriorityResponse> => {
  try {
    const url = `/api/tests/${testId}/ai/priorities`
    const response = await defaultAxios.get(url)
    return response?.data
  } catch (error) {
    console.error('Failed to fetch cell sum data', error)
    throw error
  }
}
