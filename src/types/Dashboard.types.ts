// * 대시보드 / url, 도메인 네임
export interface DomainURLItem {
  url: string //https://youtube.com
  domainName: string // youtube.com
  createdAt: string // 2025-11-19T02:48:56.478110129Z
  testId: string // adadcce8-adc4-4aaa-9405-dddd65130a2a
}

export interface DomainURLResponse {
  success: {
    message: string
    data: {
      items: DomainURLItem[]
    }
    createdAt: string
  }
}
// ======================================

// * 성능지표 API 타입
export interface WebVitalItem {
  metric: string //LCP
  message: string // 가장 큰 텍스트 블록/이미지가 화면에 나타나는 시간
  urgentStatus: 'GOOD' | 'WARNING' | 'POOR'
}

export interface WebVitalItemResponse {
  success: {
    message: string
    data: {
      items: WebVitalItem[]
    }
    createdAt: string
  }
}

// =======================================

// * 보안 지표
export interface SecurityVital {
  metric: string //LCP
  message: string // 가장 큰 텍스트 블록/이미지가 화면에 나타나는 시간
  urgentStatus: 'GOOD' | 'WARNING' | 'POOR'
}

export interface SecurityVitalsResponse {
  success: {
    message: string
    data: {
      items: SecurityVital[]
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
    data: {
      items: ScoreTotal[]
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
  expectedGain: number
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
