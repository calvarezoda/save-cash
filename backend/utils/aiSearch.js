// backend/utils/aiSearch.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function searchProduct(query) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(`Busca productos similares a: ${query}`);
  return result.response.text();
}

module.exports = { searchProduct };