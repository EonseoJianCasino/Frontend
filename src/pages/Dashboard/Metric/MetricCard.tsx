import img_error from '@/assets/icons/error.svg'
import img_ok from '@/assets/icons/ok.svg'
import img_warning from '@/assets/icons/warning.svg'
import type { MetricItem } from './Metric.types'

/**
 * 성능 지표, 보안 지표 카드
 * @returns
 */
export default function MetricCard({ metric, message, value, urgentStatus }: MetricItem) {
  return (
    <article className="box-border flex w-full min-w-[400px] flex-row items-center justify-between rounded-[10px] border-[1px] border-solid border-[#EBEEEE] bg-[#F8F9FA] p-3 px-6">
      <div>
        <h3 className="text-[16px] font-semibold text-[#4B4B4B]">{metric}</h3>
        <label className="text-[12px] font-semibold text-[#888888]">{message}</label>
      </div>
      <div className="box-border flex flex-row items-center gap-x-3">
        {value && <div>{value} </div>}
        <img
          src={
            urgentStatus === 'GOOD' ? img_ok : urgentStatus === 'WARNING' ? img_warning : img_error
          }
        ></img>
      </div>
    </article>
  )
}
