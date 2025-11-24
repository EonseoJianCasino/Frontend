chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'WEB_VITALS') {
    console.log('[Background] WEB_VITALS', { data: message.data, tabId: sender.tab?.id })
    sendResponse({ ok: true })
  }
})
