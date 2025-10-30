import ArrowRight from '../../assets/icons/arrowRight.svg'
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
      <section className="box-border flex w-full flex-col items-center">
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
      </section>
    </main>
  )
}
