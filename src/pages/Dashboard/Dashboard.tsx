import img_error from '@/assets/icons/error.svg'
import img_ok from '@/assets/icons/ok.svg'
import img_warning from '@/assets/icons/warning.svg'
import img_fire from '@/assets/icons/fire.svg'
import img_sequrity from '@/assets/icons/sequrity.svg'

import CustomBarChart from './CustomBarChart'
import MetricSection from './Metric/MetricSection'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  fetchAiPriority,
  fetchScores,
  fetchScoreTotal,
  fetchSecurityVitals,
  fetchURLandDomain,
  fetchWebVitals,
} from '@/apis/dashboardApis'
import {
  type Score,
  type AiPriority,
  type DomainURL,
  type ScoreTotal,
  type Vital,
} from '@/types/Dashboard.types'
import type { CurTest } from '@/types/Test.types'
import SimplePieChart from '@/components/Charts/SimplePieChart'
import testData from './testData'

// "자세히 보기"에서 들어올 때 상단 여백을 가릴 정도로만 내려주는 오프셋
const SCROLL_OFFSET = 100

export default function PerformanceDashboardMain() {
  // ! 변수 ====
  const [testId, setTestId] = useState<string>('') // 테스트 ID

  const [priorityData, setPriorityData] = useState<AiPriority[] | null>(null) // 우선 개선이 필요한 항목 데이터
  const [webVitalData, setWebVitalData] = useState<Vital[] | null>(null) // 우선 개선이 필요한 항목 데이터
  const [securityVitalData, setSecurityVitalData] = useState<Vital[] | null>(null) // 우선 개선이 필요한 항목 데이터

  // 첫번째 차트 관련 블록
  const [urlAndDomainData, setUrlAndDomainData] = useState<DomainURL | null>(null) // 도메인, url
  const [scoreTotalData, setScoreTotalData] = useState<ScoreTotal | null>(null) // 도메인, url
  const [scoreData, setScoreData] = useState<Score[] | null>(null) // 차트데이터
  // ======
  const location = useLocation()
  const navigate = useNavigate()

  //* 첫 렌더링시 테스트 ID 받아오기
  useEffect(() => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) return
    chrome.storage.local.get<{ curTest?: CurTest }>('curTest', ({ curTest }) => {
      if (curTest?.testId) setTestId(curTest.testId)
    })
  }, [])

  // * testID 받아오면 우선 개선사항 받아오기
  useEffect(() => {
    // * 우선 개선사항 받아오기
    const getAiPriority = async () => {
      try {
        const response = await fetchAiPriority(testId) // 대시보드/우선개선이 필요한 항목
        setPriorityData(response.success.data.topPriorities) // 우선 개선 항목만 나타남
        console.log('우선개선사항', response)
      } catch (error) {
        console.error(error)
      }
    }
    // * 성능지표, 보안지표 받아오기
    const getWebVitals = async () => {
      try {
        const response = await fetchWebVitals(testId) // 대시보드/우선개선이 필요한 항목
        setWebVitalData(response.success.data.items) // 우선 개선 항목만 나타남
        console.log('성능지표', response)
      } catch (error) {
        console.error(error)
      }
    }

    const getSecurityVitals = async () => {
      try {
        const response = await fetchSecurityVitals(testId) // 대시보드/우선개선이 필요한 항목
        setSecurityVitalData(response.success.data.items) // 우선 개선 항목만 나타남
        console.log('보안지표', response)
      } catch (error) {
        console.error(error)
      }
    }

    // * 최상단
    // *대시보드 / URL 도메인 네임
    const getURLandDomain = async () => {
      try {
        const response = await fetchURLandDomain(testId) // 대시보드/우선개선이 필요한 항목
        setUrlAndDomainData(response?.success.data) // 우선 개선 항목만 나타남
        console.log('대시보드 URL, 도메인 데이터', response)
      } catch (error) {
        console.error(error)
      }
    }

    //* 대시보드 total 점수 받아오기
    const getScoreTotal = async () => {
      try {
        const response = await fetchScoreTotal(testId) // 대시보드/우선개선이 필요한 항목
        setScoreTotalData(response?.success?.data)
        console.log('총점 score total 데이터', response)
      } catch (error) {
        console.error(error)
      }
    }

    //* 대시보드 total 점수 받아오기
    const getScores = async () => {
      try {
        const response = await fetchScores(testId) // 대시보드/우선개선이 필요한 항목
        setScoreData(response?.success?.data?.charData)
        console.log('setScoresData', response)
      } catch (error) {
        console.error(error)
      }
    }

    // 병렬로 API 호출 처리
    Promise.all([
      getAiPriority(),
      getWebVitals(),
      getSecurityVitals(),
      getURLandDomain(),
      getScoreTotal(),
      getScores(),
    ])
  }, [testId])

  // 팝업 "자세히 보기"에서 넘어올 때 약간 아래 위치에서 시작하도록 처리
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const shouldScroll = params.get('scroll') === 'detail'
    if (!shouldScroll) return

    // 약간 아래로 스크롤 (헤더/여백 가리기용)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: SCROLL_OFFSET, behavior: 'smooth' })
    })

    // 파라미터 제거하여 새로고침 시 반복되지 않게 함
    params.delete('scroll')
    navigate(
      {
        pathname: location.pathname,
        search: params.toString() ? `?${params.toString()}` : '',
      },
      { replace: true },
    )
  }, [location.pathname, location.search, navigate])

  return (
    <main className="flex w-full max-w-[1700px] flex-col items-center justify-center gap-y-6 bg-[#F5F9FA] px-6 py-6 lg:px-8">
      {/* 상단 메인 카드 */}
      <article className="// TODO : max-w 추후 삭제 (비율 맞추기 ) relative box-border flex h-[394px] w-full max-w-[953px] flex-col rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-4 shadow-md">
        <header>
          {/* 아이템  */}
          <div className="absolute -top-7 left-4 flex flex-row justify-start gap-x-4 text-[14px] text-sm font-semibold text-[#5C5C5C]">
            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#357BFA]"></span>
              <span>GOOD</span>
            </div>

            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#FABF35]"></span>
              <span>WARNING</span>
            </div>

            <div className="flex flex-row items-center justify-start">
              <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#FF3C3C]"></span>
              <span>POOR</span>
            </div>
          </div>
          <span className="absolute right-4 top-5 text-sm text-gray-500">
            <strong className="font-semibold text-[#3A7CA5]">10s </strong>측정 결과
          </span>
          <h1 className="text-[30px] font-semibold">
            {urlAndDomainData?.domainName || 'youtube.com'}
          </h1>
          <a
            className="text-[12px] text-[#888888]"
            href={urlAndDomainData?.url || 'https://www.youtube.com'}
          >
            {urlAndDomainData?.url}
          </a>
        </header>

        {/* 차트 + 카드 */}
        <section className="flex h-full w-full flex-row justify-start gap-x-4">
          {/* 차트 섹션 */}
          <section className="max-h-[284px] max-w-[452px] flex-1">
            <CustomBarChart
              title=""
              yLabel=""
              // data={scoreData ?? undefined}
              data={testData}
              dataKey="score"
              name="name"
            />
          </section>
          {/* 카드섹션  */}
          <section className="flex flex-1 flex-col items-center gap-y-2">
            <section className="box-border flex min-h-[92px] w-[261px] flex-row items-center justify-around gap-x-4 rounded-[15px] bg-[#FFFFFF] shadow-md">
              {/* <div className="h-16 w-16 rounded-full border-8 border-[#E3F2FD] border-t-[#3A7CA5]"></div> */}
              <div className="h-16 w-16">
                <SimplePieChart
                  value={scoreTotalData?.totalScore}
                  colors={['#3A7CA5', '#EDEBF0']}
                  innerRadius={20}
                  outerRadius={30}
                  isValue={false}
                />
              </div>

              <div className="flex flex-col justify-start gap-x-4">
                <div className="text-[34px] font-semibold text-[#3B3D53]">
                  {scoreTotalData?.totalScore || '-'}점
                </div>
                <div className="text-[14px] text-[#4B4B4B]">Total Score</div>
              </div>
            </section>
            {/* 그리드 컴포넌트 2*3 */}
            <section className="grid h-full w-full grid-cols-3 grid-rows-2 gap-4">
              {/* 카드 6개 */}
              {scoreData?.map((item) => {
                return (
                  // TODO : 추후에 데이터 넣어서 변경
                  <div className="border-box relative flex h-full w-full flex-col items-center justify-center rounded-[15px] p-2 shadow-md">
                    <div className="border-box absolute top-2 flex w-full flex-row items-center px-2">
                      <div className="w-full text-[16px] text-[#83869A]">{item.name}</div>
                      {/* border-[#FABF35]  border-[#357BFA] */}
                      {item.urgentStatus && ( // 값에 따라 색상 다르게 하기
                        <span
                          className={`inline-block h-[10px] w-[10px] rounded-full ${
                            {
                              GOOD: 'bg-[#357BFA]',
                              WARNING: 'bg-[#FABF35]',
                              POOR: 'bg-[#FF3C3C]',
                            }[item.urgentStatus]
                          } `}
                        ></span>
                      )}
                    </div>
                    <div className="text-[34px] font-semibold text-[#3B3D53]">{item.score}</div>
                  </div>
                )
              })}
            </section>
          </section>
        </section>
      </article>

      {/* 우선 개선이 필요한 항목 */}
      <article className="// TODO : max-width 추후 삭제, 크기 맞춰야 relative box-border flex w-full max-w-[953px] flex-col gap-y-5 rounded-[15px] border-2 border-solid border-[#DEEBEF] bg-[#FFFFFF] p-4 shadow-md">
        <h2 className="text-[20px] font-semibold text-[#4B4B4B]">🚨 우선 개선이 필요한 항목</h2>
        {/* 
          // TODO : img, 상태에 따라 색상에 바뀌게 만들 것이다. (추후 수정된 데이터 받으면)
        */}

        {// border-[#FABF35]  border-[#357BFA]
        priorityData?.map((item) => (
          <ul className="flex flex-col gap-y-4">
            <li
              className={`box-border flex h-[58px] w-full flex-row items-center justify-center gap-x-4 rounded-[10px] border-l-4 ${
                {
                  양호: 'border-[#357BFA]',
                  주의: 'border-[#FABF35]',
                  긴급: 'border-[#FF3C3C]',
                }[item.status]
              } bg-[#F8F9FA] px-4`}
            >
              <img
                src={
                  {
                    양호: img_ok,
                    주의: img_warning,
                    긴급: img_error,
                  }[item.status]
                }
              />
              <div className="box-border flex h-full w-full flex-col justify-center">
                <div className="text-[16px] font-semibold text-[#4B4B4B]">{item.targetName}</div>
                <div className="text-[12px] font-semibold text-[#888888]">{item.reason}</div>
              </div>
            </li>
          </ul>
        ))}
      </article>

      {/* 성능 지표 & 보안 지표 */}
      <article className="box-border flex w-[956px] flex-row justify-between gap-x-4">
        <MetricSection title="성능 지표" titleIcon={img_fire} metricDatas={webVitalData} />
        <MetricSection title="보안 지표" titleIcon={img_sequrity} metricDatas={securityVitalData} />
      </article>
    </main>
  )
}
