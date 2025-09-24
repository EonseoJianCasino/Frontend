export default function Dashboard() {
  return (
    <section className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <section className="mb-8">
        <section className="flex items-start justify-between gap-6 bg-white p-6 rounded-2xl shadow border border-slate-200 mb-6">
          <div className="text-sm text-slate-500 mb-4">10s 측정 결과</div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              youtube.com
            </h2>
            <div className="text-slate-500">https://youtube.com</div>
          </div>
          <div className="text-slate-400">recharts 컴포넌트</div>
        </section>

        {/* 그리드 컴포넌트 */}
        <section className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow border border-slate-200">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-24 h-24 rounded-full bg-slate-200 grid place-content-center text-slate-600">
              도넛차트
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-800">점수</div>
              <div className="text-xs text-slate-500">Total Score</div>
            </div>
          </div>

          {/* 2행 3열 그리드  */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              컴포넌트 (LCP) 45
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              컴포넌트 (LCP) 45
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              컴포넌트 (LCP) 45
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              컴포넌트 (LCP) 45
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              컴포넌트 (LCP) 45
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              컴포넌트 (LCP) 45
            </div>
          </div>
        </section>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          🚨 우선 개선이 필요한 항목
        </h2>
        {/*flex로 아래로 쌓는다 */}
        <div className="flex items-start gap-3 p-3 rounded-xl border border-red-200 bg-red-50 mb-3">
          <div>
            <img src="" alt="느낌표!" className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-red-700">
              CLS 점수 개선이 필요
            </div>
            <div className="text-sm text-slate-600">
              레이아웃 이동으로 인한 사용자 경험 저하
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50 mb-3">
          <div>
            <img src="" alt="느낌표!" className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-amber-700">보안 헤더 누락</div>
            <div className="text-sm text-slate-600">
              CSP, HTTPS 헤더가 설정되지 않음
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl border border-blue-200 bg-blue-50 mb-3">
          <div>
            <img src="" alt="느낌표!" className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-blue-700">
              SSL 인증서 만료 임박
            </div>
            <div className="text-sm text-slate-600">
              29일 후 만료 예정 - 갱신 준비 필요
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
