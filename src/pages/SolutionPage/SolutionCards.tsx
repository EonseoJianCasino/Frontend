import type { Solution } from '@/types/Solution.types'
import styles from './SolutionPage.module.scss'

// ! 개선방안 카드
interface SolutionProps {
  data: Solution[] | null
}

export const SolutionCards: React.FC<SolutionProps> = ({ data }) => {
  return data?.map((item) => (
    <section className={styles.sub_container}>
      <div className={`${styles.state} ${styles[item.status]}`}>{item.status}</div>
      <h3 className={styles.sub_title}>{item.name}</h3>
      <p className={styles.sub_summary}>{item.benefitSummary}</p>

      <section className={styles.sub_effect_container}>
        <article className={styles.inner_item}>
          <h4>예상 개선 효과</h4>
          <div className={styles.description}>성능 점수 +{item.expectedScoreGain}점</div>
        </article>
        <article className={styles.inner_item}>
          <h4>연관 지표</h4>
          <div className={styles.indicator_container}>
            {item.relatedMetrics?.map((metric) => (
              <div className={styles.item}>{metric}</div>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.detail_container}>
        <h4>상세 개선 방안</h4>
        <div className={styles.inner_item}>{item.benefitDetail}</div>
      </section>
      <div className={styles.btn_detail}>자세히 보기 {'>'}</div>
    </section>
  ))
}

export default SolutionCards
