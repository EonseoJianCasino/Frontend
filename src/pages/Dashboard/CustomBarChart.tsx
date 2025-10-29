import React from 'react'
import {
  Label,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import testData from './testData.ts'
import styles from './Charts.module.scss'

import type { ChartProps } from '../../types/Chart.types.ts'

// import type { BarRectangleItem } from "recharts/types/cartesian/Bar"; // 또는 @types 경로 맞춰 조정

// // * 커스텀 차트 모양
// interface TriangleBarProps extends Partial<BarRectangleItem> {
//   fill?: string;
// }

// const getTrianglePath = (
//   x: number,
//   y: number,
//   width: number,
//   height: number
// ): string => {
//   return `M${x},${y + height}
//     C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
//     ${x + width / 2},${y}
//     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
//     Z`;
// };

// export const TriangleBar: React.FC<TriangleBarProps> = ({
//   x = 0,
//   y = 0,
//   width = 0,
//   height = 0,
//   fill = "#007EA7",
// }) => {
//   return <path d={getTrianglePath(x, y, width, height)} fill={fill} stroke="none" />;
// };

// * 커스텀 바 차트

// 예시 데이터
const data = [
  { name: 'LCP', value: 35 },
  { name: 'CLS', value: 50 },
  { name: 'INP', value: 70 },
  { name: 'TBT', value: 40 },
]

// 🎨 막대 끝 원 + 숫자 커스텀 shape
const CustomBar = (props: any) => {
  const { x, y, width, height, fill, value } = props
  const circleRadius = 14
  const circleY = y // 막대 상단 좌표
  const circleX = x + width / 2

  return (
    <g>
      {/* 세로 막대 */}
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={5} />

      {/* 막대 위 원 */}
      <circle
        cx={circleX}
        cy={circleY}
        r={circleRadius}
        fill="#fff"
        stroke="#007BA7"
        strokeWidth={3}
      />

      {/* 원 안 숫자 */}
      <text
        x={circleX}
        y={circleY + 4}
        textAnchor="middle"
        fill="#007BA7"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    </g>
  )
}

// color : 컬러 입력 가능 (기본값)
/** color : 차트 색, dataKey : 차트  데이터 기준 // title : 바차트 이름  */
const CustomBarChart: React.FC<ChartProps> = ({
  data = testData,
  color = '#007BA7',
  dataKey = 'pv',
  title = 'ChartName',
  name = 'name',
  yLabel = 'yLabel',
}) => {
  return (
    // 반응형 컨테이너 만들기
    <div className={styles.screen}>
      <ResponsiveContainer className={styles.responsive_container}>
        {/* 바차트 컨테이너 */}
        <BarChart className={styles.chart_container} width={500} height={300} data={data}>
          {/* 네모네모 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#cccccc" />
          {/* x축  기준*/}
          {}
          <XAxis dataKey={name} stroke="#5C5C5C">
            {title && (
              <Label
                className={styles.chart_label_title}
                value={title || ''}
                offset={0}
                position="insideBottom"
              />
            )}
          </XAxis>
          <YAxis
            label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft' } : undefined}
            stroke="#5C5C5C"
          />

          {/* 툴팁 */}
          <Tooltip />
          {/* pv 값으로 바 그리기 1 */}
          {/* 바 위에 마우스 커서 올렸을때 선, 내부 색 바꾸기 (activeBar) -> 툴팁이 있어야함*/}
          <Bar
            // 회색 배경 남기기
            background={{ fill: '#D9D9D9', radius: 10 }} // ✅ 회색 배경
            barSize={12}
            dataKey={dataKey as string}
            fill={color}
            shape={<CustomBar />}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
      {/* {title?.length > 0 ? ( // 차트 제목 길이가 0이상이면, 타이틀 출력!
        <h3 className={styles.chart_title}> {title} </h3>
      ) : (
        <></>
      )} */}
    </div>
  )
}

export default CustomBarChart

// interface ChartProps {
//     data?: Array<Record<string, any>>; //data는 객체 배열이지만 아이템의 형태는 유연하다
//     color? : string;
//     dataKey: string;
//     title?: string;
//     name?: string
// }
