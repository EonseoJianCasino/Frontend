import ArrowRight from '../../assets/icons/arrowRight.svg'
import styles from './SolutionPage.module.scss'

import { useEffect, useState } from 'react'
import { fetchSolutions } from '@/apis/solutionApis'
import type { MajorImprovement, Solution, SolutionResponse } from '@/types/Solution.types'
import type { CurTest } from '@/types/Test.types'
import SolutionSlider from './SolutionSlider'
import SolutionCards from './SolutionCards'
import SimplePieChart from '@/components/Charts/SimplePieChart'

export default function SolutionPage() {
  // const testId: string = 'ab8f4ba8-bfa7-4b6a-bf05-7efc7b9723b8'

  const [testId, setTestId] = useState<string>('1ca4c78e-649d-47d9-85a4-6df51918bb7d') // 테스트 ID

  // ! 변수 ===
  // 기존 점수
  const [beforeScore, setBeforeScore] = useState<number>(0)
  // 개선 예상 점수
  const [afterScore, setAfterScore] = useState<number>(0)
  // 개선 예상 점수 +
  const [afterScoreDetail, setAfterScoreDetail] = useState<number>(0)

  // 개선 방안 - web바이탈
  const [solutionWebVitalData, setSolutionWebVitalData] = useState<Solution[] | null>(null)
  // 개선방안 - 보안
  const [solutionSecurityData, setSolutionSecurityData] = useState<Solution[] | null>(null)
  // 기대 효과
  const [majorImprovementData, setMajorImprovementData] = useState<MajorImprovement[] | null>(null)

  // * 테스트 ID 받아오면 API 호출
  useEffect(() => {
    // * 우선 개선사항 받아오기
    const getSolutions = async () => {
      try {
        const response: SolutionResponse = await fetchSolutions(testId) // 대시보드/우선개선이 필요한 항목
        setBeforeScore(response.success.data.overallTotalBefore) // 기존 점수
        setAfterScore(response.success.data.overallTotalAfter) // 개선 예상 점수
        setAfterScoreDetail(response.success.data.overallExpectedImprovement) // 개선 예상 점수 디테일
        setSolutionWebVitalData(response.success.data.webElements) // 웹바이탈 개선방안
        setSolutionSecurityData(response.success.data.securityMetrics) // 보안 개선방안
        setMajorImprovementData(response.success.data.majorImprovements) // 기대 효과
      } catch (error) {
        console.error(error)
      }
    }

    getSolutions()
  }, [testId])

  //* 첫 렌더링시 테스트 ID 받아오기
  useEffect(() => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) return
    chrome.storage.local.get<{ curTest?: CurTest }>('curTest', ({ curTest }) => {
      if (curTest?.testId) setTestId(curTest.testId)
    })
  }, [])

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
      {/* 
      // TODO : 추후 기존점수, 개선예상점수 원 도넛이 점수에 따라 유동적으로 채워지게 바꿔야함 
       */}
      <section className="box-border flex w-full flex-col items-center gap-y-6">
        <article className="relative box-border flex h-[213px] w-full max-w-[550px] flex-row items-center justify-around rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-4 shadow-md">
          <section className="relative flex flex-col items-center gap-y-3">
            <h3 className="absolute -top-7 text-[14px] text-[#4B4B4B]">기존 점수</h3>
            {/* 도넛 */}
            <div className="relative h-28 w-28">
              <SimplePieChart
                innerRadius={45}
                outerRadius={55}
                value={beforeScore}
                colors={['#FF3C3C', '#EDEBF0']}
              />
            </div>
            {/* <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#EDEBF0] border-t-[#FF3C3C]">
              <div className="text-[30px] font-semibold text-[#000000]">{beforeScore}</div>
            </div> */}
          </section>
          <img src={ArrowRight} alt="->" />

          <section className="relative flex flex-col items-center gap-y-3">
            <h3 className="absolute -top-7 text-[14px] text-[#4B4B4B]">개선 예상 점수</h3>
            {/* 도넛 */}
            <div className="relative h-28 w-28">
              <SimplePieChart
                innerRadius={45}
                outerRadius={55}
                value={afterScore}
                colors={['#3A7CA5', '#EDEBF0']}
              />
            </div>
            {/* <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#EDEBF0] border-t-[#3A7CA5]">
              <div className="text-[30px] font-semibold text-[#000000]">{afterScore}</div>
            </div> */}
            <span className="absolute -bottom-8 text-[16px] font-semibold text-[#3A7CA5]">
              {afterScoreDetail}점
            </span>
            <span className="absolute -bottom-8 right-7 text-[16px] font-semibold text-[#3A7CA5]">
              {' '}
              +
            </span>
          </section>
        </article>

        {/* 단계별 개선 방안  */}
        <article className={styles.step_solution_container}>
          <h2 className={styles.title}>단계별 개선 방안</h2>
          <SolutionCards data={solutionWebVitalData} />
          <SolutionCards data={solutionSecurityData} />
        </article>

        {/* 개선 기대효과 */}
        <article className={styles.solution_container}>
          <h2 className={styles.title}>개선 기대효과</h2>
          <SolutionSlider data={majorImprovementData} />
        </article>
      </section>
    </main>
  )
}
