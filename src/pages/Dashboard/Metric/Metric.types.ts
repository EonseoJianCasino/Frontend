/**
 * 성능 지표, 보안 지표 카드 인터페이스
 */

import type { Vital } from '@/types/Dashboard.types'

// * 성능 지표 섹션 props
export interface MetricsSectionProps {
  title: string
  titleIcon: string
  metricDatas: Vital[] | null
}
