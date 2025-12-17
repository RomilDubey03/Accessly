const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/env");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Enhances violations with AI-generated explanations and fixes.
 * @param {Array} violations - Array of violation objects.
 * @returns {Promise<Array>} - Enhanced violations.
 */
async function enhanceViolationsWithAI(violations) {
  return Promise.all(
    violations.map(async (v) => {
      const prompt = `
Explain this accessibility issue in simple terms and suggest a fix:
Rule: ${v.id} (${v.help})
Description: ${v.description}
HTML: ${v.nodes[0]?.html || "N/A"}
Failure Summary: ${v.nodes[0]?.failureSummary || "N/A"}
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        v.gptExplanation = text ? text.trim() : "No explanation generated.";
      } catch (err) {
        console.error("Gemini API error:", err.message);
        v.gptExplanation = "Error generating Gemini explanation.";
      }

      return v;
    })
  );
}

module.exports = { enhanceViolationsWithAI };
