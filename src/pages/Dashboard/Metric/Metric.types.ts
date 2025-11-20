/**
 * 성능 지표, 보안 지표 카드 인터페이스
 */
export interface MetricItem {
  metric: string // LCP
  message: string // 작은 메세지 (가장 긴 콘텐츠 로딩 시간)
  value?: string // 2.1초
  urgentStatus: 'GOOD' | 'WARNING' | 'POOR'
}

// * 성능 지표 섹션 props
export interface MetricsSectionProps {
  title: string
  titleIcon: string
  metricDatas: MetricItem[]
}
