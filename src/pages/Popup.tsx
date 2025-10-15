import "@/styles/popup.css";
import { useEffect } from "react";
export default function Popup() {
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

  return (
    <main className="popup_container">
      <button className="w-full" onClick={openDetail}>
        goDetail
      </button>
    </main>
  );
}
