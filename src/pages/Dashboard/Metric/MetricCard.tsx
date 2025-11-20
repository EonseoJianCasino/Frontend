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
    <article>
      <div>
        <div>{metric}</div>
        <div>{message}</div>
      </div>
      <div>
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
