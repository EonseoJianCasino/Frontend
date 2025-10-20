import React from "react";
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
} from "recharts";
import testData from "./testData.ts";
import styles from "./Charts.module.scss";

import type { ChartProps } from "../../types/Chart.types.ts";

// color : 컬러 입력 가능 (기본값)
/** color : 차트 색, dataKey : 차트  데이터 기준 // title : 바차트 이름  */
const SimpleBarChart: React.FC<ChartProps> = ({
  data = testData,
  color = "#59A5F5",
  dataKey = "pv",
  title = "ChartName",
  name = "name",
  yLabel = "yLabel",
}) => {
  return (
    // 반응형 컨테이너 만들기
    <div className={styles.screen}>
      <ResponsiveContainer className={styles.responsive_container}>
        {/* 바차트 컨테이너 */}
        <BarChart
          className={styles.chart_container}
          width={500}
          height={300}
          data={data}
        >
          {/* 네모네모 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#cccccc" />
          {/* x축  기준*/}
          <XAxis dataKey={name} stroke="#5C5C5C">
            <Label
              className={styles.chart_label_title}
              value={title || ""}
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{ value: { yLabel }, angle: -90, position: "insideLeft" }}
            stroke="#5C5C5C"
          />
          {/* 툴팁 */}
          <Tooltip />
          {/* pv 값으로 바 그리기 1 */}
          {/* 바 위에 마우스 커서 올렸을때 선, 내부 색 바꾸기 (activeBar) -> 툴팁이 있어야함*/}
          <Bar
            dataKey={dataKey as string}
            fill={color}
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
  );
};

export default SimpleBarChart;

// interface ChartProps {
//     data?: Array<Record<string, any>>; //data는 객체 배열이지만 아이템의 형태는 유연하다
//     color? : string;
//     dataKey: string;
//     title?: string;
//     name?: string
// }
