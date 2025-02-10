document.addEventListener("DOMContentLoaded", async () => {
    const connectButton = document.getElementById("connectWallet");
    const walletDisplay = document.getElementById("walletAddress");

    if (connectButton) {
        connectButton.addEventListener("click", async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                localStorage.setItem("walletAddress", accounts[0]);
                window.location.href = "chatbot.html";  // Redirect to chatbot page
            } else {
                alert("MetaMask is not installed!");
            }
        });
    }

    // Chatbot functionality
    if (window.location.pathname.includes("chatbot.html")) {
        const chatbox = document.getElementById("chatbox");
        const userInput = document.getElementById("userInput");

        async function sendMessage() {
            const userMessage = userInput.value;
            chatbox.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
            userInput.value = "";
        
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: "user123", message: userMessage }),
            });
        
            const data = await response.json();
            chatbox.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
        }
        

        window.sendMessage = sendMessage;
    }
});


