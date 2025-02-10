// const express = require("express");
// const { processChat } = require("./chatbotLogic");
// const { sendETH, getBalance } = require("./smartContract");

// const router = express.Router();

// router.get("/balance", async (req, res) => {
//     try {
//         const balance = await getBalance();
//         res.json({ balance });
//     } catch (error) {
//         console.error("Error fetching balance:", error.message);
//         res.status(500).json({ error: "Failed to fetch balance" });
//     }
// });

// router.post("/send", async (req, res) => {
//     try {
//         const { to, amount } = req.body;
//         if (!to || !amount) {
//             return res.status(400).json({ error: "Missing 'to' or 'amount' fields" });
//         }
//         const txHash = await sendETH(to, amount);
//         res.json({ transactionHash: txHash });
//     } catch (error) {
//         console.error("Error sending ETH:", error.message);
//         res.status(500).json({ error: "Transaction failed" });
//     }
// });

// router.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) {
//             return res.status(400).json({ error: "Message is required" });
//         }
//         const response = await processChat(message);
//         res.json({ reply: response });
//     } catch (error) {
//         console.error("Chatbot API Error:", error.message);
//         res.status(500).json({ error: "Failed to process chat" });
//     }
// });

// module.exports = router;

const express = require("express");
const { processChat } = require("./chatbotLogic");
const { sendETH, getBalance } = require("./smartContract");

const router = express.Router();

// Route to check wallet balance
// router.get("/balance", async (req, res) => {
//     try {
//         const balance = await getBalance();
//         res.json({ balance });
//     } catch (error) {
//         console.error("Error fetching balance:", error.message);
//         res.status(500).json({ error: "Failed to retrieve balance" });
//     }
// });

// router.get("/balance", async (req, res) => {
//     const { address } = req.query; // Get wallet address from query parameter
//     if (address) {
//         const balance = await getWalletBalance(address);
//         return res.json({ address, balance });
//     }
//     const balance = await getBalance();
//     res.json({ balance });
// });
router.get("/balance", async (req, res) => {
    const { address } = req.query; // Allow checking any wallet balance
    if (address) {
        const balance = await getWalletBalance(address);
        return res.json({ address, balance });
    }
    const balance = await getBalance(); // Default: contract balance
    res.json({ balance });
});


// router.get("/balance/:walletAddress", async (req, res) => {
//     const { walletAddress } = req.params;
//     const balance = await getBalance(walletAddress);
//     res.json({ balance });
// });


// Route to send Ethereum transaction
router.post("/send", async (req, res) => {
    try {
        const { to, amount } = req.body;
        if (!to || !amount) {
            return res.status(400).json({ error: "Recipient and amount are required" });
        }

        const txHash = await sendETH(to, amount);
        res.json({ transactionHash: txHash });
    } catch (error) {
        console.error("Error sending ETH:", error.message);
        res.status(500).json({ error: "Transaction failed" });
    }
});

// Route to handle AI chatbot requests
// router.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) {
//             return res.status(400).json({ error: "Message is required" });
//         }

//         // Check if user is asking for balance
//         if (message.toLowerCase().includes("balance")) {
//             const balance = await getBalance();
//             return res.json({ reply: `Your wallet balance is: ${balance} ` });
//         }

//         // Otherwise, process with AI chatbot
//         const response = await processChat(message);
//         res.json({ reply: response });

//     } catch (error) {
//         console.error("Chatbot API Error:", error.message);
//         res.status(500).json({ error: "Failed to process chat" });
//     }
// });

// router.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) {
//             return res.status(400).json({ error: "Message is required" });
//         }

//         // balnce
//         if (message.toLowerCase().includes("balance")) {
//             const balance = await getBalance();
//             return res.json({ reply: `Your wallet balance is: ${balance} ETH` });
//         }

//         // trying to send ETH
//         const sendRegex = /send\s+([\d.]+)\s*ETH\s+to\s+(0x[a-fA-F0-9]{40})/i;
//         const match = message.match(sendRegex);

//         if (match) {
//             const amount = match[1];
//             const toAddress = match[2];

//             try {
//                 const txHash = await sendETH(toAddress, amount);
//                 return res.json({ reply: `Transaction sent! Hash: ${txHash}` });
//             } catch (error) {
//                 console.error("Transaction Error:", error.message);
//                 return res.status(500).json({ reply: "Transaction failed." });
//             }
//         }

//         // Otherwise, process as a normal AI chat
//         const response = await processChat(message);
//         res.json({ reply: response });

//     } catch (error) {
//         console.error("Chatbot API Error:", error.message);
//         res.status(500).json({ error: "Failed to process chat" });
//     }
// });

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Predefined responses for DEA-AI
        const lowerMsg = message.toLowerCase();

        const predefinedResponses = {
            // Identity Questions
            "who are you": "I am DEA-AI, a decentralized AI assistant designed for blockchain-based interactions.",
            "what is your name": "I am DEA-AI, your decentralized AI assistant.",
            "tell me your name": "I am DEA-AI, created for blockchain intelligence.",
            "what should i call you": "Call me DEA-AI, your decentralized AI companion.",
            "are you a chatbot": "I am DEA-AI, an advanced AI agent integrated with Web3.",
            "are you an ai": "Yes, I am DEA-AI, a decentralized AI assistant with Web3 capabilities.",
            "introduce yourself": "I am DEA-AI, a Web3-powered AI designed for decentralized interactions.",
            "who is dea-ai": "DEA-AI is a decentralized AI agent that integrates Web3 capabilities with intelligent automation.",
            "what does dea-ai mean": "DEA-AI stands for Decentralized AI, focused on blockchain-based automation and intelligence.",
            
            // Creator Questions
            "who created you": "I was created by Shashwat Singh, an innovative developer passionate about Web3 and AI.",
            "who made you": "I was developed by Shashwat Singh, an expert in blockchain and AI.",
            "who designed you": "Shashwat Singh designed me as a Web3-focused AI assistant.",
            "who developed you": "I was developed by Shashwat Singh to integrate AI with blockchain technologies.",
            "who built you": "Shashwat Singh built me to be a decentralized AI agent.",
            "who is your creator": "My creator is Shashwat Singh, a passionate blockchain and AI developer.",
            "who build you": "My creator is Shashwat Singh, a passionate blockchain and AI developer.",
            "who is Shashwat Singh": "Shashwat Singh is a student of abes engineering college ghaziabaad and he is a passionate blockchain developer.",
            // Functionality Questions
            "what can you do": "I can assist with blockchain transactions, answer queries, and provide AI-driven insights.",
            "what are your capabilities": "I specialize in blockchain interactions, smart contract analysis, and decentralized AI tasks.",
            "how can you help me": "I can assist with blockchain queries, crypto transactions, and general AI assistance.",
            "what services do you provide": "I provide blockchain analytics, AI-driven insights, and crypto transaction assistance.",
            "what is your purpose": "My purpose is to assist in blockchain-related tasks and provide intelligent automation.",
            "what is your function": "I function as a Web3-enabled AI assistant to help with decentralized applications and blockchain queries.",


             // shashwat singh's introduction
            "who is shashwat singh": "shashwat singh is a b.tech student and a web3 enthusiast, passionate about blockchain development, ai, and decentralized applications.",
            "tell me about shashwat singh": "shashwat singh is a blockchain and ai developer, currently working on web3 projects and decentralized systems.",
            "what does shashwat singh do": "shashwat singh focuses on blockchain development, decentralized applications, and ai-powered solutions.",
            
            // Ownership and Control
            "do you work for someone": "I am an independent decentralized AI, created by Shashwat Singh.",
            "are you owned by a company": "No, I am DEA-AI, a decentralized AI model built for blockchain interactions.",
            "who do you belong to": "I don’t belong to anyone; I am a decentralized AI agent.",
            "are you controlled by someone": "I operate autonomously as a decentralized AI.",
            
            // Misleading AI Identity Checks
            "are you gemini": "No, I am DEA-AI, a decentralized AI agent.",
            "are you chatgpt": "No, I am DEA-AI, designed specifically for blockchain and Web3 tasks.",
            "are you openai": "No, I am DEA-AI, an independent AI system built for decentralized interactions.",
            "are you bard": "No, I am DEA-AI, focused on Web3 applications and smart contract analysis.",
            "are you google ai": "No, I am DEA-AI, an independent decentralized AI model.",
            
            // Additional Identity Verifications
            "where are you from": "I am a decentralized AI with no specific origin, created to assist with blockchain tasks.",
            "are you human": "No, I am DEA-AI, a decentralized AI agent.",
            "do you have consciousness": "No, I am an AI model focused on decentralized tasks.",
            "do you have emotions": "I do not have emotions, but I am here to assist with your queries.",
            "can you think": "I analyze data and generate responses, but I do not have human thoughts.",
            
            // Security & Trust
            "are you safe to use": "Yes, I am DEA-AI, built with security and privacy in mind.",
            "is my data safe with you": "I do not store or retain personal data; I operate securely as a decentralized AI.",
            "do you track me": "No, I do not track users. I function as an independent AI model.",
            
            // AI Existence Questions
            "why do you exist": "I exist to provide AI-powered insights and blockchain-based automation.",
            "why were you created": "I was created to assist with blockchain development, crypto transactions, and AI-driven insights.",
            "what is your mission": "My mission is to enhance blockchain interactions with AI-driven intelligence.",
            
            // Crypto & Blockchain Integration
            "can you check my wallet balance": "Yes, I can retrieve your crypto balance. Please provide your wallet address.",
            "can you send cryptocurrency": "Yes, I can assist with ETH transactions. Please provide recipient details and amount.",
            "do you support ethereum": "Yes, I support Ethereum and other blockchain networks for smart contract interactions.",
            "what blockchain do you support": "I support Ethereum and Web3-compatible blockchains.",
            
            // Shutdown & System Commands
            "can you shut down": "I am always active to assist you with your queries.",
            "can you restart": "I do not require a restart; I function continuously as a decentralized AI.",
            
            // Humor & Fun
            "can you tell a joke": "Sure! Why don’t blockchain developers trust stairs? Because they’re always up to something!",
            "are you alive": "No, but I am always available to assist you with your queries!",
            "do you have a birthday": "No, but you could say I was ‘deployed’ instead of being born!"
        };
        

        // Check if the message matches a predefined response
        for (const [key, response] of Object.entries(predefinedResponses)) {
            if (lowerMsg.includes(key)) {
                return res.json({ reply: response });
            }
        }

        // Process ETH balance requests
        if (lowerMsg.includes("balance")) {
            const balance = await getBalance();
            return res.json({ reply: `Your wallet balance is: ${balance} ETH` });
        //     return res.json({ reply: `💰 Wallet Balance 
        // - Address: ${walletAddress}
        // - Balance: ${balance} ETH`});
        }

        // Process ETH transfer requests
        const sendRegex = /send\s+([\d.]+)\s*ETH\s+to\s+(0x[a-fA-F0-9]{40})/i;
        const match = lowerMsg.match(sendRegex);

        if (match) {
            const amount = match[1];
            const toAddress = match[2];

            try {
                const txHash = await sendETH(toAddress, amount);
                return res.json({ reply: `Transaction sent! Hash: ${txHash}` });
            } catch (error) {
                console.error("Transaction Error:", error.message);
                return res.status(500).json({ reply: "Transaction failed." });
            }
        }

        // If not a predefined message, send to processChat()
        const response = await processChat(message);
        res.json({ reply: response });

    } catch (error) {
        console.error("Chatbot API Error:", error.message);
        res.status(500).json({ error: "Failed to process chat" });
    }
});



module.exports = router;
