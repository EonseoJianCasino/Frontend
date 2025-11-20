import type { MetricsSectionProps } from './Metric.types'
import MetricCard from './MetricCard'

/**
 * ! 성능 지표, 보안 지표 섹션
 * @param title - 제목
 * @param titleIcon - 타이틀로 둘 아이콘 이미지 경로
 * @param metricDatas:MetricItem[] - 지표 카드 데이터 배열
 *
 * @returns
 */
export default function MetricSection({ title, titleIcon, metricDatas }: MetricsSectionProps) {
  return (
    <section className="box-border flex w-full max-w-[953px] flex-1 flex-col gap-y-5 rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-7 shadow-md">
      <header className="flex items-center gap-x-2">
        <img src={titleIcon} alt="" />
        <h2 className="text-[20px] font-semibold text-[#4B4B4B]">{title}</h2>
      </header>
      <div className="flex w-full flex-1 flex-col gap-y-4">
        {/* TODO : metricDatas로 바꿔줘야함 (임시 데이터) */}
        {metricDatas?.map((metricData) => (
          <MetricCard {...metricData} />
        ))}
      </div>
    </section>
  )
}
