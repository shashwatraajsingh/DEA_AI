

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function processChat(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    return result.response.text();  
  } catch (error) {
    console.error("Chatbot API Error:", error.message);
    return "Error: Unable to process your request.";
  }
}

module.exports = { processChat };
