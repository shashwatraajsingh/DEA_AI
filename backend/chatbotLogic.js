// const axios = require("axios");

// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function processChat(message) {
//   try {
//     await delay(1000); // delay rate limit ko prevent krne ke liye

//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
//       {
//         contents: [{ parts: [{ text: message }] }]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`
//         }
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Chatbot API Error:", error.response ? error.response.data : error.message);
//     return { error: "API request failed. Please try again later." };
//   }
// }

// module.exports = { processChat };

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
