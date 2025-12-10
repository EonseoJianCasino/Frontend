import type { PieChartProps } from '@/types/Chart.types'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

/**
 * 파이차트
 * @param value : number - 차트 기준 값
 * @param colors : string[2] - 기준 색상, 기본 색상 2개 넘겨줘야함.
 * @returns
 */
const SimplePieChart: React.FC<PieChartProps> = ({
  isValue = true,
  value = 80,
  colors = ['#e74c3c', '#f3f6f9'],
  innerRadius = 50,
  outerRadius = 60,
}) => {
  // 전체 데이터 구성: [진행된 값, 나머지 값]
  const data = [
    { name: 'Value', value: value },
    { name: 'Remaining', value: 100 - value },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%" // 중심 X 좌표
            cy="50%" // 중심 Y 좌표
            innerRadius={innerRadius} // 도넛의 안쪽 반지름 (이 값으로 두께 조절)
            outerRadius={outerRadius} // 도넛의 바깥쪽 반지름
            startAngle={90} // 12시 방향에서 시작 (Recharts는 3시가 0도)
            endAngle={-270} // 한 바퀴(360도) 돌리기
            dataKey="value"
            stroke="none" // 테두리 없애기
            cornerRadius="50%" // 코너 둥글게
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 중앙 텍스트 (CSS로 중앙 정렬) */}
      {isValue && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          {value}
        </div>
      )}
    </div>
  )
}

export default SimplePieChart
