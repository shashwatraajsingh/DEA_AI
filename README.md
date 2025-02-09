# DEA-AI: Decentralized AI Chatbot

## 📌 Overview
DEA-AI is a decentralized AI chatbot designed for blockchain-based interactions. It can answer queries, assist with cryptocurrency transactions, and provide AI-driven insights. The bot is deployed on **Telegram** and **Discord**, and is hosted using **Railway/Vercel**.

## 🚀 Features
- ✅ **Custom AI Responses** (No mention of Gemini)
- ✅ **Wallet Balance Checking**
- ✅ **Basic Blockchain Transactions (ETH)**
- ✅ **Works on Telegram & Discord**
- ✅ **Serverless Deployment (Railway/Vercel)**

---

## 🛠️ Setup and Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/dea-ai-bot.git
cd dea-ai-bot
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Create a `.env` File**
```ini
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
DISCORD_BOT_TOKEN=your-discord-bot-token
PORT=5000
```

### **4️⃣ Start the Bot**
```sh
node bot.js
```

---

## 🎮 Setting Up Telegram Bot
1. Open Telegram and search for **BotFather**.
2. Type `/newbot` and follow the instructions.
3. Copy the **bot token** and add it to `.env`.

---

## 🎮 Setting Up Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a new bot, enable **message content intent**.
3. Copy the **bot token** and add it to `.env`.
4. Invite the bot to your server using OAuth2.

---

## 🌐 Deployment (Railway)
### **1️⃣ Install Railway CLI**
```sh
npm install -g @railway/cli
```
### **2️⃣ Deploy to Railway**
```sh
railway login
railway init
railway up
```

---

## 📜 Example Commands
| **User Input** | **Bot Response** |
|--------------|----------------|
| who are you? | i am dea-ai, a decentralized ai assistant designed for blockchain-based interactions. |
| who created you? | i was created by shashwat singh, an innovative developer passionate about web3 and ai. |
| check my wallet balance | your wallet balance is 0.0 eth. |

---

## 📂 Project Structure
```
├── bot.js           # Main bot logic for Telegram & Discord
├── .env            # Environment variables (tokens)
├── package.json    # Dependencies & scripts
├── README.md       # Project documentation
└── .gitignore      # Ignore sensitive files
```

---

## 💡 Future Improvements
- ✅ Integrate **Web3.js** for real Ethereum transactions
- ✅ Deploy on AWS Lambda for serverless scaling
- ✅ Add **WhatsApp Integration**

---

## 🤝 Contributions
Feel free to contribute! Open an issue or submit a PR. Let's build the future of **decentralized AI!** 🚀

---

## 📧 Contact
👤 **Shashwat Singh**  
📧 Email: shashwatrajsing@gmail.com
🔗 GitHub: [shashwatraajsingh](https://github.com/shashwatraajsingh)  
