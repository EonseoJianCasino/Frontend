import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

export type MetricName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB'

export type WebVitalsValues = Record<MetricName, number>

export function getWebVitals(
  timeoutMs = 10000,
  onMetric?: (name: MetricName, value: number) => void,
): Promise<WebVitalsValues> {
  const result: Partial<WebVitalsValues> = {}
  let resolved = false

  const resolveWithFallback = () => {
    if (resolved) return
    resolved = true
    clearTimeout(timeoutId)
    return {
      CLS: result.CLS ?? 0,
      FCP: result.FCP ?? 0,
      INP: result.INP ?? 0,
      LCP: result.LCP ?? 0,
      TTFB: result.TTFB ?? 0,
    }
  }

  const timeoutId = setTimeout(() => {
    const data = resolveWithFallback()
    if (data) {
      resolver(data)
    }
  }, timeoutMs)

  let resolver: (value: WebVitalsValues) => void
  const promise = new Promise<WebVitalsValues>((resolve) => {
    resolver = resolve
    const done = () => {
      if (
        result.CLS != null &&
        result.FCP != null &&
        result.INP != null &&
        result.LCP != null &&
        result.TTFB != null
      ) {
        const data = resolveWithFallback()
        if (data) resolver(data)
      }
    }
    const handleMetric = (name: MetricName, value: number) => {
      result[name] = value
      try {
        onMetric?.(name, value)
      } catch {
        // avoid breaking
      }
      done()
    }

    onCLS((metric) => handleMetric('CLS', metric.value))
    onFCP((metric) => handleMetric('FCP', metric.value))
    onINP((metric) => handleMetric('INP', metric.value), { reportAllChanges: true })
    onLCP((metric) => handleMetric('LCP', metric.value))
    onTTFB((metric) => handleMetric('TTFB', metric.value))
  })

  return promise
}
