export default function Popup() {
  const openDetail = () => {
    const baseUrl = chrome.runtime.getURL("index.html")
    const targetUrl = `${baseUrl}#/app/dashboard`

    chrome.tabs.query({}, (tabs) => {
      const existing = tabs.find((tab) => tab.url?.startsWith(`${baseUrl}#/app`))

      if (existing?.id != null) {
        const updateProps: chrome.tabs.UpdateProperties = { active: true }
        if (existing.url !== targetUrl) {
          updateProps.url = targetUrl
        }
        chrome.tabs.update(existing.id, updateProps)

        if (existing.windowId != null) {
          chrome.windows.update(existing.windowId, { focused: true })
        }
      } else {
        chrome.tabs.create({ url: targetUrl })
      }

      window.close()
    })
  }

  return (
    <main className="p-3">
      <button className="w-full" onClick={openDetail}>
        goDetail
      </button>
    </main>
  )
}
