import type { MetricsSectionProps } from './Metric.types'
import MetricCard from './MetricCard'

/**
 * 성능 지표, 보안 지표 섹션
 * @param title - 제목
 * @param titleIcon - 타이틀로 둘 아이콘 이미지 경로
 * @param metricDatas:MetricItem[] - 지표 카드 데이터 배열
 *
 * @returns
 */
export default function MetricSection({ title, titleIcon, metricDatas }: MetricsSectionProps) {
  return (
    <section>
      <header>
        <img src={titleIcon} alt="" />
        <h2>{title}</h2>
      </header>
      <div>
        {/* TODO : metricDatas로 바꿔줘야함 (임시 데이터) */}
        {metricDatas?.map((metricData) => (
          <MetricCard {...metricData} />
        ))}
      </div>
    </section>
  )
}
