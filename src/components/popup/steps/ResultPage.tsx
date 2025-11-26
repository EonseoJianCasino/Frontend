import { getScore } from '@/apis/getScore'
import { useEffect, useState } from 'react'
import type { CurTest } from '@/types/Test.types'

type ResultPageProps = {
  onOpenDetail: () => void
  onPrev: () => void
}

type Scores = {
  totalScore: String
  securityTotalScore: String
  webTotalScore: String
}

export default function ResultPage({ onOpenDetail, onPrev }: ResultPageProps) {
  const [scores, setScores] = useState<Scores | null>(null)

  useEffect(() => {
    chrome.storage.local.get<{ curTest?: CurTest }>('curTest', (result) => {
      const testId = result.curTest?.testId
      if (!testId) {
        console.log('Get Score 시 testId 불러오기 실패')
        return
      }

      ;(async () => {
        try {
          const response = await getScore(testId)
          console.log('점수 조회 성공', response)
          setScores(response)
        } catch (e) {
          console.log('점수 조회 실패', e)
        }
      })()
    })
  }, [])

  const performance = scores?.webTotalScore
  const security = scores?.securityTotalScore

  return (
    <div className="flex flex-col gap-4">
      <div className="popup_metric_box">
        <div className="flex items-center">
          <div className="popup_metric_label">성능</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="popup_metric_value">{performance}</div>
            <span className="popup_status_bad">!</span>
          </div>
        </div>
        <div className="popup_progress mt-3">
          <div className="popup_progress_bar" style={{ width: `${performance}%` }} />
        </div>
      </div>
      <div className="popup_metric_box">
        <div className="flex items-center">
          <div className="popup_metric_label">보안</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="popup_metric_value">{security}</div>
            <span className="popup_status_good">✓</span>
          </div>
        </div>
        <div className="popup_progress mt-3">
          <div className="popup_progress_bar" style={{ width: `${security}%` }} />
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <button
          type="button"
          className="popup_btn_submit popup_btn_background"
          onClick={onOpenDetail}
        >
          자세히 보기
        </button>
        <button type="button" onClick={onPrev} className="popup_btn_secondary">
          다시 측정하기 ↻
        </button>
      </div>
    </div>
  )
}
