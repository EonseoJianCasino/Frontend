import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

export type WebVitals = {
  CLS: Metric
  FCP: Metric
  INP: Metric
  LCP: Metric
  TTFB: Metric
}

export function getWebVitals(): Promise<WebVitals> {
  const result: Partial<WebVitals> = {}

  const promise = new Promise<WebVitals>((resolve) => {
    const Done = () => {
      if (result.CLS && result.FCP && result.INP && result.LCP && result.TTFB) {
        resolve(result as WebVitals)
      }
    }
    onCLS((metric) => {
      result.CLS = metric
      Done()
    })
    onFCP((metric) => {
      result.FCP = metric
      Done()
    })
    onINP((metric) => {
      result.INP = metric
      Done()
    })
    onLCP((metric) => {
      result.LCP = metric
      Done()
    })
    onTTFB((metric) => {
      result.TTFB = metric
      Done()
    })
  })
  return promise
}
