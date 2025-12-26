const sendBtn = document.getElementById("sendBtn")
const statusEl = document.getElementById("status")

sendBtn.addEventListener("click", () => {
    statusEl.textContent = "Sending page to backend..."
    statusEl.className = "status";

    chrome.runtime.sendMessage(
        {type: "SEND_PAGE_HTML"},
        (response) => {
            if(!response){
                statusEl.textContent = "Something went wrong"
                statusEl.className = "status error"
                return;
            }

            statusEl.textContent = response.message;
            statusEl.className = response.success ? "status success" : "status error"
        }
    )
})