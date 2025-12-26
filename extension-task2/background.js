chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SEND_PAGE_HTML") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0]

      if (
        !tab.url.includes("linkedin.com") &&
        !tab.url.includes("instagram.com")
      ) {
        sendResponse({ 
          message: "Unsupported page",
          success: false
        });
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["contentScript.js"]
        },
        () => {
          chrome.tabs.sendMessage(tab.id, { type: "CAPTURE_HTML" }, async res => {
            
            if (chrome.runtime.lastError || !res) {
              sendResponse({
                message: "Failed to capture page HTML",
                success: false
              });
              return;
            }

            try{
              const response = await fetch("http://localhost:4000/scrape-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(res)
              });

              const data = await response.json()
              
              sendResponse({ 
                message: data.message,  
                success: data.success
              })
            } catch(error){
              sendResponse({
                message: "Backend server not reachable",
                success: false
              })
            }
          })
        }
      )
    })

    return true
  }
})
