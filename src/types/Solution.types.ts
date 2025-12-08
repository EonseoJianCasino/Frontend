// * 개선 방안 & 효과 전체

// * 개선 방안 - 성능, 보안 (2개 형태 동일 )
export interface Solution {
  name: string // 제목
  status: string
  benefitSummary: string // 간단 설명
  expectedScoreGain: number // 예산 개선 효과
  relatedMetrics: string[] // 연관 지표 리스트 (CLS...)
  benefitDetail: string // 상세 추가 설명
}

// * 개선방안 - 보안
// export interface MajorImprovement {
//   // 개선 방안 - 보안
//   name: string
//   status: string
//   benefitSummary: string
//   expectedScoreGain: number
//   relatedMetrics: string[] // 연관 지표들 (CSL,,,..)
//   benefitDetail: string //
// }

// *기대효과
export interface MajorImprovement {
  metric: string // 태그 지표 종륲
  title: string // 제목
  description: string // 설명
}

//* 전체 기대효과 & 개선방안 페이지
export interface SolutionResponse {
  success: {
    message: string
    overallExpectedImprovement: number // 개선 예상점수 오른부분
    overallTotalAfter: number // 개선 예상 점수
    overallTotalBefore: number // 기존 점수

    webElements: Solution[] // 개선 방안 ( 웹바이탈)
    securityMetrics: Solution[] // 개선 방안 (보안)

    majorImprovements: MajorImprovement[] // 기대효과 리스트
  }
}
