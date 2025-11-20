import type { MetricItem } from './Metric.types'

// 예시 더미 데이터
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
