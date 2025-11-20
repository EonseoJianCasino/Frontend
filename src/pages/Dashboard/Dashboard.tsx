import img_error from '@/assets/icons/error.svg'
import img_ok from '@/assets/icons/ok.svg'
import img_warning from '@/assets/icons/warning.svg'
import img_fire from '@/assets/icons/fire.svg'
import img_sequrity from '@/assets/icons/sequrity.svg'

import CustomBarChart from './CustomBarChart'
import MetricSection from './Metric/MetricSection'
import { performanceMetrics } from './Metric/Metric.data'

export default function PerformanceDashboardMain() {
  return (
    <main className="flex w-full max-w-[1700px] flex-col items-center justify-center gap-y-6 bg-[#F5F9FA] px-6 py-6 lg:px-8">
      {/* 상단 메인 카드 */}
      <article className="// TODO : max-w 추후 삭제 (비율 맞추기 ) relative box-border flex h-[394px] w-full max-w-[953px] flex-col rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-4 shadow-md">
        <header>
          {/* 아이템  */}
          <div className="absolute -top-7 left-4 flex flex-row justify-start gap-x-4 text-[14px] text-sm font-semibold text-[#5C5C5C] text-gray-500">
            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#CCCCCC]"></span>
              <span>OFF</span>
            </div>

            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#9EEDA7]"></span>
              <span>ON</span>
            </div>

            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#ED9E9F]"></span>
              <span>OFF</span>
            </div>

            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#FFE990]"></span>
              <span>OFF</span>
            </div>
          </div>
          <span className="absolute right-4 top-5 text-sm text-gray-500">
            <strong className="font-semibold text-[#3A7CA5]">10s </strong>측정 결과
          </span>
          <h1 className="text-[30px] font-semibold">youtube.com</h1>
          <a className="text-[12px] text-[#888888]" href="https://www.youtube.com">
            https://www.youtube.com
          </a>
        </header>

        {/* 차트 + 카드 */}
        <section className="flex h-full w-full flex-row justify-start gap-x-4">
          {/* 차트 섹션 */}
          <section className="max-h-[284px] max-w-[452px] flex-1">
            <CustomBarChart title="" yLabel="" />
          </section>
          {/* 카드섹션  */}
          <section className="flex flex-1 flex-col items-center gap-y-2">
            <section className="box-border flex min-h-[92px] w-[261px] flex-row items-center justify-around gap-x-4 rounded-[15px] bg-[#FFFFFF] shadow-md">
              <div className="h-16 w-16 rounded-full border-8 border-[#E3F2FD] border-t-[#3A7CA5]"></div>
              <div className="flex flex-col justify-start gap-x-4">
                <div className="text-[34px] font-semibold text-[#3B3D53]">65점</div>
                <div className="text-[14px] text-[#4B4B4B]">Total Score</div>
              </div>
            </section>
            {/* 그리드 컴포넌트 2*3 */}
            <section className="grid h-full w-full grid-cols-3 grid-rows-2 gap-3 gap-4">
              {/* 카드 6개 */}
              {[1, 2, 3, 4, 5, 6].map(() => {
                return (
                  // TODO : 추후에 데이터 넣어서 변경
                  <div className="border-box relative flex h-full w-full flex-col items-center justify-center rounded-[15px] p-2 shadow-md">
                    <div className="border-box absolute top-2 flex w-full flex-row items-center px-2">
                      <div className="w-full text-[16px] text-[#83869A]">LCP</div>
                      <span className="inline-block h-[10px] w-[10px] rounded-full bg-[#ED9E9F]"></span>
                    </div>
                    <div className="text-[34px] font-semibold text-[#3B3D53]">45</div>
                  </div>
                )
              })}
            </section>
          </section>
        </section>
      </article>

      {/* 우선 개선이 필요한 항목 */}
      <article className="// TODO : max-width 추후 삭제, 크기 맞춰야 relative box-border flex w-full max-w-[953px] flex-col gap-y-5 rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-4 shadow-md">
        <h2 className="text-[12px] text-[20px] font-semibold text-[#4B4B4B]">
          🚨 우선 개선이 필요한 항목
        </h2>
        {/* 
          // TODO : 상태에 따라 색상에 바뀌게 만들 것이다. (soft하게 만들기)
        */}
        <ul className="flex flex-col gap-y-4">
          <li className="box-border flex h-[58px] w-full flex-row items-center justify-center gap-x-4 rounded-[10px] border-l-4 border-[#FF3C3C] bg-[#F8F9FA] px-4">
            <img src={img_error} />
            <div className="box-border flex h-full w-full flex-col justify-center">
              <div className="text-[16px] font-semibold text-[#4B4B4B]">CSL 점수 개선이 필요</div>
              <div className="text-[12px] font-semibold text-[#888888]">
                레이아웃 이동으로 인한 사용자 경험 저하
              </div>
            </div>
          </li>
        </ul>

        <ul className="flex flex-col gap-y-4">
          <li className="box-border flex h-[58px] w-full flex-row items-center justify-center gap-x-4 rounded-[10px] border-l-4 border-[#FABF35] bg-[#F8F9FA] px-4">
            <img src={img_warning} />
            <div className="box-border flex h-full w-full flex-col justify-center">
              <div className="text-[16px] font-semibold text-[#4B4B4B]">보안 헤더 누락</div>
              <div className="text-[12px] font-semibold text-[#888888]">
                CSP, HTTPS 헤더가 설정되지 않음
              </div>
            </div>
          </li>
        </ul>

        <ul className="flex flex-col gap-y-4">
          <li className="box-border flex h-[58px] w-full flex-row items-center justify-center gap-x-4 rounded-[10px] border-l-4 border-[#357BFA] bg-[#F8F9FA] px-4">
            <img src={img_ok} />
            <div className="box-border flex h-full w-full flex-col justify-center">
              <div className="text-[16px] font-semibold text-[#4B4B4B]">SSL 인증서 만료 임박</div>
              <div className="text-[12px] font-semibold text-[#888888]">
                29일 후 만료 예정 - 갱신 준비 필요
              </div>
            </div>
          </li>
        </ul>
      </article>

      {/* 성능 지표 & 보안 지표 */}
      <article>
        <MetricSection title="성능 지표" titleIcon={img_fire} metricDatas={performanceMetrics} />
        <MetricSection
          title="보안 지표"
          titleIcon={img_sequrity}
          metricDatas={performanceMetrics}
        />
      </article>
    </main>
  )
}
