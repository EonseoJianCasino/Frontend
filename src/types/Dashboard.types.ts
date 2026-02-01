// * 대시보드 / url, 도메인 네임
export interface DomainURL {
  url: string //https://youtube.com
  domainName: string // youtube.com
  createdAt: string // 2025-11-19T02:48:56.478110129Z
  testId: string // adadcce8-adc4-4aaa-9405-dddd65130a2a
}

export interface DomainURLResponse {
  success: {
    message: string
    data: DomainURL
    createdAt: string
  }
}
// ======================================

// * 성능지표 API 타입
export interface Vital {
  metric: string //LCP
  message: string // 가장 큰 텍스트 블록/이미지가 화면에 나타나는 시간
  urgentStatus: 'GOOD' | 'WARNING' | 'POOR'
  value?: string // 2.1초
}

export interface WebVitalItemResponse {
  success: {
    message: string
    data: {
      items: Vital[]
    }
    createdAt: string
  }
}

// =======================================

// * 보안 지표 (Vite 함께 사용)

export interface SecurityVitalsResponse {
  success: {
    message: string
    data: {
      items: Vital[]
    }
    createdAt: string
  }
}

// ==============================

// * 대시보드 total 점수
export interface ScoreTotal {
  totalScore: number
  securityTotalScore: number
  webTotalScore: number
}

export interface ScoreTotalResponse {
  success: {
    message: string
    data: ScoreTotal
    createdAt: string
  }
}

// =================================
// * (세부점수 조회) 차트 데이터 score 받아오기

export interface Score {
  name: string // lcp
  score: number // 100
  urgentStatus?: 'GOOD' | 'WARNING' | 'POOR' | null | undefined
}

export interface ScoreResponse {
  success: {
    message: string
    total: number // 총점
    data: {
      charData: Score[]
    }
    createdAt: string
  }
}
// =================================

// * 대시보드/우선 개선이 필요한 항목
export interface AiPriority {
  rank: number
  targetType: string
  targetName: string
  status: 'poor' | 'warning' | 'good' //'긴급' | '주의' | '양호'
  reason: string
}
// * 총 3개가 나온다.
export interface AiPriorityResponse {
  success: {
    message: string
    data: {
      topPriorities: AiPriority[]
    }
    createdAt: string
  }
}

// ====================================\\
