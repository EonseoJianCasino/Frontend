import { useState } from 'react'
import type { Solution } from '@/types/Solution.types'
import styles from './SolutionPage.module.scss'

// ! 개선방안 카드 나타내는 코드
interface SolutionProps {
  data: Solution[] | null
}

// * 1. 개별 아이템을 담당할 컴포넌트 분리
const SolutionItem: React.FC<{ item: Solution }> = ({ item }) => {
  // 2. 각 카드별로 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false)

  const toggleDetail = () => {
    setIsOpen((prev) => !prev)
  }

  return (
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
            {item.relatedMetrics?.map((metric, index) => (
              <div key={index} className={styles.item}>
                {metric}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 3. isOpen 상태에 따라 상세 내용 조건부 렌더링 */}
      {isOpen && (
        <section className={styles.detail_container}>
          <h4>상세 개선 방안</h4>
          <div className={styles.inner_item}>{item.benefitDetail}</div>
        </section>
      )}

      {/* 4. 클릭 시 상태 토글 및 텍스트/아이콘 변경 */}
      <div
        className={styles.btn_detail}
        onClick={toggleDetail}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        {isOpen ? '접기 >' : '자세히 보기 >'}
      </div>
    </section>
  )
}

// *메인 컴포넌트
export const SolutionCards: React.FC<SolutionProps> = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        // 각 아이템에 고유 key 부여 (name이 고유하다면 item.name 사용 권장)
        <SolutionItem key={item.name || index} item={item} />
      ))}
    </>
  )
}

export default SolutionCards
