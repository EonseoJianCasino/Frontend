import "@/styles/popup.css";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import Card from "@/components/popup/Card";
import CurrentPage from "@/components/popup/steps/CurrentPage";
import LoadingPage from "@/components/popup/steps/LoadingPage";
import ResultPage from "@/components/popup/steps/ResultPage";

export default function Popup() {
  const [step, setStep] = useState(0);
  const renderBody = () => {
    if (step === 0) return <CurrentPage />;
    else if (step === 1) return <LoadingPage onDone={() => setStep(2)} />;
    else return <ResultPage />;
  };

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("is-popup");
    return () => {
      html.classList.remove("is-popup");
    };
  }, []);

  const openDetail = () => {
    const baseUrl = chrome.runtime.getURL("index.html");
    const targetUrl = `${baseUrl}#/app/dashboard`;

    chrome.tabs.query({}, (tabs) => {
      const existing = tabs.find((tab) => tab.url?.startsWith(`${baseUrl}#/app`));

      if (existing?.id != null) {
        const updateProps: chrome.tabs.UpdateProperties = { active: true };
        if (existing.url !== targetUrl) {
          updateProps.url = targetUrl;
        }
        chrome.tabs.update(existing.id, updateProps);

        if (existing.windowId != null) {
          chrome.windows.update(existing.windowId, { focused: true });
        }
      } else {
        chrome.tabs.create({ url: targetUrl });
      }

      window.close();
    });
  };

  const titles = ["현재 페이지", "로딩 페이지", "결과 페이지"] as const;
  const next = () => setStep((s) => Math.min(s + 1, 2));
  const prev = () => setStep((s) => Math.max(s - 2, 0));

  return (
    <main className="popup_container">
      <header className="popup_header">
        <img src={logo} alt="logo" className="popup_logo" />
        <div className="popup_title">Performance Test</div>
      </header>
      <Card title={titles[step]}>
        <div className="p-4 space-y-4">
          {renderBody()}

          {step === 0 ? (
            <button type="button" onClick={next} className="bg-slate-500">
              {" "}
              다음
            </button>
          ) : null}

          {step === 2 ? (
            <>
              <button
                type="button"
                className="mt-2 px-3 py-2 rounded bg-emerald-500 text-white"
                onClick={openDetail}
              >
                Go Detail
              </button>
              <button type="button" onClick={prev} className="bg-slate-500">
                다시 시도하기
              </button>
            </>
          ) : null}
        </div>
      </Card>
    </main>
  );
}
