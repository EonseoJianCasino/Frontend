import type { ComponentType } from 'react'

declare module 'react-slick' {
  // 최소 타입 스텁: 광범위한 props 허용, any 회피
  type SliderProps = Record<string, unknown>
  const Slider: ComponentType<SliderProps>
  export default Slider
}
