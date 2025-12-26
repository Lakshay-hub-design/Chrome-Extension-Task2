chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CAPTURE_HTML") {
    try {
      sendResponse({
        url: window.location.href,
        html: document.documentElement.outerHTML
      });
    } catch (err) {
      sendResponse(null);
    }
  }
})