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
    const done = () => {
      if (result.CLS && result.FCP && result.INP && result.LCP && result.TTFB) {
        resolve(result as WebVitals)
      }
    }
    onCLS((metric) => {
      result.CLS = metric
      done()
    })
    onFCP((metric) => {
      result.FCP = metric
      done()
    })
    onINP((metric) => {
      result.INP = metric
      done()
    })
    onLCP((metric) => {
      result.LCP = metric
      done()
    })
    onTTFB((metric) => {
      result.TTFB = metric
      done()
    })
  })
  return promise
}
