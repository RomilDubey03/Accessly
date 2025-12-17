const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/env");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Enhances violations with AI-generated explanations and fixes.
 * @param {Array} violations - Array of violation objects.
 * @returns {Promise<Array>} - Enhanced violations.
 */
/**
 * Generates a concise fix suggestion for a single violation.
 * @param {Object} violation - The violation object.
 * @returns {Promise<string>} - The suggested fix.
 */
async function generateFixSuggestion(violation) {
  const prompt = `
    Provide a specific and very concise fix for this accessibility issue (max 2 sentences).
    Rule: ${violation.id} (${violation.help})
    Description: ${violation.description}
    HTML: ${violation.html || "N/A"}
    Failure: ${violation.failureSummary || "N/A"}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text ? text.trim() : "No suggestion available.";
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return "Error generating suggestion.";
  }
}

module.exports = { generateFixSuggestion };
