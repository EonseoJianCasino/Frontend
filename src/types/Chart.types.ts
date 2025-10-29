export interface ChartProps {
  data?: Array<Record<string, any>> //data는 객체 배열이지만 아이템의 형태는 유연하다
  color?: string
  dataKey?: string
  title?: string
  name?: string
  colors?: string[] // 색상배열
  yLabel?: string // y축 레이블
}

export interface MChartProps {
  data?: Array<Record<string, any>> //data는 객체 배열이지만 아이템의 형태는 유연하다
  color?: string[]
  dataKey?: string[]
  title?: string
  name?: string
  yLabel?: string // y축 레이블
  yAxiosDomain?: {
    //y축 최대/최소값 설정
    dataMin: number | 'auto'
    dataMax: number | 'auto' | 'double' // double : 2배, 'auto' : 기본, number : 직접 숫자로 설정
  }
}

export interface SimpleGagueChartProps {
  title?: string
  value: number
  unit?: string // 단위
  maxValue: number //최댓값
  minValue?: number //최소값
}

// 차트 타입을 선택할 수 있다.
/** 차트 타입을 선택하는 chartType이 추가되었다.
 *@param chartTpye: string -> bar, line,are,mLine 선택가능.
 */
export interface ChartsProps extends ChartProps {
  chartType: 'bar' | 'line' | 'area' | 'mLine' | 'cell'
}

// 차트 타입을 선택할 수 있다.
/** 차트 타입을 선택하는 chartType이 추가되었다.
 *@param chartTpye: string -> mLine 선택가능.
 */
export interface MChartsProps extends MChartProps {
  chartType: 'mLine' | 'mLineArea'
}
