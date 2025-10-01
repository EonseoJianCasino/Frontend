import React from "react";
import SimpleBarChart from "./SimpleBarChart";
import testData from "./testData";
import img_error from "./imgs/error.svg";
import img_ok from "./imgs/ok.svg";
import img_warning from "./imgs/warning.svg";

type MetricKey = "LCP" | "CLS" | "INP" | "FCP" | "TBT" | "TTFB";

interface Metric {
  key: MetricKey;
  label: string;
  value: number; // 0~100 스코어 범위 가정
  trend?: "up" | "down" | "flat";
}

const METRICS: Metric[] = [
  { key: "LCP", label: "LCP", value: 45 },
  { key: "CLS", label: "CLS", value: 15 },
  { key: "INP", label: "INP", value: 80 },
  { key: "FCP", label: "FCP", value: 20 },
  { key: "TBT", label: "TBT", value: 80 },
  { key: "TTFB", label: "TTFB", value: 20 },
];

/** 도넛(원형 진행) 스타일 유틸: 점수(0~100)를 conic-gradient로 표현 */
function donutStyle(score: number): React.CSSProperties {
  const deg = Math.min(360, Math.max(0, (score / 100) * 360));
  return {
    background: `conic-gradient(currentColor ${deg}deg, #E5E7EB ${deg}deg 360deg)`,
  };
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function SmallMetricCard({
  label,
  value,
  accentDot = true,
}: {
  label: string;
  value: number;
  accentDot?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-gray-500">{label}</span>
        {accentDot && <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />}
      </div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

export default function PerformanceDashboardMain() {
  const totalScore = 65;

  return (
    <main className="w-full max-w-[1120px] px-6 py-6 lg:px-8">
      {/* 상단 상태 레전드 */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <LegendItem color="bg-gray-400" label="OFF" />
        <LegendItem color="bg-emerald-400" label="ON" />
        <LegendItem color="bg-rose-400" label="ERROR" />
        <LegendItem color="bg-amber-400" label="WARNING" />
        <span className="ml-auto text-sm text-gray-500">10s 측정 결과</span>
      </div>

      {/* 상단 메인 카드 */}
      <SectionCard className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 좌측: 타이틀 + 막대 그래프 */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              youtube.com
            </h1>
            <p className="mt-1 text-sm text-gray-500">https://youtube.com</p>
            <div className="w-[80%] h-[80%]">
              <SimpleBarChart data={testData} />
            </div>
          </div>

          {/* 우측: 총점(도넛) + 소지표 카드 */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-4">
              {/* 도넛 카드 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="text-sky-600">
                    <div
                      className="grid h-16 w-16 place-items-center rounded-full text-sky-600"
                      style={donutStyle(totalScore)}
                    >
                      <div className="h-12 w-12 rounded-full bg-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold leading-tight text-gray-900">
                      {totalScore}점
                    </div>
                    <div className="text-xs text-gray-500">Total Score</div>
                  </div>
                </div>
              </div>

              {/* 지표 카드들 */}
              <div className="grid grid-cols-3 gap-3">
                {METRICS.map((m) => (
                  <SmallMetricCard
                    key={m.key}
                    label={m.label}
                    value={m.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 우선 개선이 필요한 항목 */}
      <SectionCard className="mt-6">
        <header className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
          {/* <span className="text-rose-500">
            <AlertCircle className="h-5 w-5" />
          </span> */}
          <h2 className="text-base font-semibold text-gray-900">
            🚨 우선 개선이 필요한 항목
          </h2>
        </header>

        <div className="divide-y divide-gray-100">
          {/* 항목 1 */}
          <div className="flex items-start gap-4 px-6 py-5">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full">
              <img src={img_error} className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                CLS 점수 개선이 필요
              </div>
              <p className="mt-1 text-sm text-gray-500">
                레이아웃 이동으로 인한 사용자 경험 저하
              </p>
            </div>
          </div>

          {/* 항목 2 */}
          <div className="flex items-start gap-4 px-6 py-5">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full">
              <img src={img_warning} className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">보안 헤더 누락</div>
              <p className="mt-1 text-sm text-gray-500">
                CSP, HTTPS 헤더가 설정되지 않음
              </p>
            </div>
          </div>

          {/* 항목 3 */}
          <div className="flex items-start gap-4 px-6 py-5">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full">
              <img src={img_ok} className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                SSL 인증서 만료 임박
              </div>
              <p className="mt-1 text-sm text-gray-500">
                29일 후 만료 예정 · 갱신 준비 필요
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
