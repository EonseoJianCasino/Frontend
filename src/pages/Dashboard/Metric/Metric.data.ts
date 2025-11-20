import type { MetricItem } from './Metric.types'

// 예시 더미 데이터 (성능 지표)
export const performanceMetrics: MetricItem[] = [
  {
    metric: 'LCP (Largest Contentful Paint)',
    message: '가장 큰 콘텐츠 로딩 시간',
    value: '2.1초',
    urgentStatus: 'GOOD',
  },
  {
    metric: 'INP (Interaction to Next Paint)',
    message: '상호작용 응답 시간',
    value: '180ms',
    urgentStatus: 'WARNING',
  },
  {
    metric: 'CLS (Cumulative Layout Shift)',
    message: '레이아웃 이동 정도',
    value: '0.25',
    urgentStatus: 'POOR',
  },
]

// 예시 더미 데이터 (보안 지표)
export const securityMetrics: MetricItem[] = [
  {
    metric: 'SSL',
    message: 'SSL 유효 (61일 남음)',
    urgentStatus: 'WARNING',
  },
  {
    metric: 'HSTS',
    message: 'HSTS 적용 (서브도메인 미포함)',
    urgentStatus: 'WARNING',
  },
  {
    metric: 'XCTO',
    message: 'nosniff 적용됨',
    urgentStatus: 'GOOD',
  },
  {
    metric: 'REFERRER-POLICY',
    message: 'Referrer-Policy 미설정',
    urgentStatus: 'POOR',
  },
  {
    metric: 'COOKIES',
    message: '쿠키 보안 속성 양호 (Secure+HttpOnly+SameSite=Lax)',
    urgentStatus: 'GOOD',
  },
  {
    metric: 'CSP',
    message: '안전한 CSP 적용',
    urgentStatus: 'GOOD',
  },
  {
    metric: 'FRAME-ANCESTORS/XFO',
    message: 'X-Frame-Options 적용 (SAMEORIGIN)',
    urgentStatus: 'GOOD',
  },
]
