import ArrowRight from '../../assets/icons/arrowRight.svg'
import styles from './SolutionPage.module.scss'
export default function SolutionPage() {
  return (
    // TODO : 차트 동적으로 되게, 더 동글동글하게 ui 바꿔야함
    <main className="flex w-full max-w-[1700px] flex-col gap-y-6 bg-[#F5F9FA] px-6 py-6 lg:px-8">
      <header className="flex w-full items-center gap-x-8">
        <h1 className="text-[26px] font-bold text-[#007BA7]">개선 방안 & 효과</h1>
        <div className="bg-linear-to-r rounded-full bg-gradient-to-r from-[#007BA7] to-[#3E7484] px-3 text-[15px] font-semibold text-[#FFFFFF]">
          AI 분석
        </div>
      </header>

      {/* 상단 메인 카드 */}
      <section className="box-border flex w-full flex-col items-center gap-y-6">
        <article className="relative box-border flex h-[213px] w-full max-w-[550px] flex-row items-center justify-around rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-4 shadow-md">
          <section className="relative flex flex-col items-center gap-y-3">
            <h3 className="absolute -top-7 text-[14px] text-[#4B4B4B]">기존 점수</h3>
            {/* 도넛 */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#EDEBF0] border-t-[#FF3C3C]">
              <div className="text-[30px] font-semibold text-[#000000]">65</div>
            </div>
          </section>
          <img src={ArrowRight} alt="->" />

          <section className="relative flex flex-col items-center gap-y-3">
            <h3 className="absolute -top-7 text-[14px] text-[#4B4B4B]">개선 예상 점수</h3>
            {/* 도넛 */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#EDEBF0] border-t-[#3A7CA5]">
              <div className="text-[30px] font-semibold text-[#000000]">88</div>
            </div>
            <span className="absolute -bottom-8 text-[16px] font-semibold text-[#3A7CA5]">
              24점 +
            </span>
          </section>
        </article>

        {/* 단계별 개선 방안  */}
        <article className={styles.step_solution_container}>
          <h2 className={styles.title}>단계별 개선 방안</h2>

          <section className={styles.sub_container}>
            <div className={styles.state}>긴급</div>
            <h3 className={styles.sub_title}>CLS(레이아웃 이동) 최적화</h3>
            <p className={styles.sub_summary}>
              이미지와 광고 영역의 크기를 미리 지정하여 레이아웃 이동을 방지합니다. 현재 0.25에서
              0.08로 개선 가능합니다.
            </p>

            <section className={styles.sub_effect_container}>
              <article className={styles.inner_item}>
                <h4>예상 개선 효과</h4>
                <div className={styles.description}>성능 점수 +15점</div>
              </article>
              <article className={styles.inner_item}>
                <h4>연관 지표</h4>
                <div className={styles.indicator_container}>
                  <div className={styles.item}>LCP</div>
                  <div className={styles.item}>CLS</div>
                </div>
              </article>
            </section>

            <section className={styles.detail_container}>
              <h4>상세 개선 방안</h4>
              <div className={styles.inner_item}>
                설명설명.......설명설명.......설명설명.......설명설명.......설명설명.......설명설명.
              </div>
            </section>
            <div className={styles.btn_detail}>자세히 보기 {'>'}</div>
          </section>
        </article>
      </section>
    </main>
  )
}
