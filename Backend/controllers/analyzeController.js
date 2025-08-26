const puppeteer = require('puppeteer');
const axeCore = require('axe-core');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeAccessibility(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Inject axe-core
    await page.addScriptTag({ path: require.resolve('axe-core') });

    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      });
    });
    console.log("AXE RESULTS RAW:", results);

    await browser.close();

    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

    const enhancedViolations = await Promise.all(
      results.violations.map(async (v) => {
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
          v.gptExplanation = response.text().trim();
        } catch (err) {
          console.error('Gemini API error:', err.message);
          v.gptExplanation = "Error generating Gemini explanation.";
        }

        return v;
      })
    );

    res.json({ violations: enhancedViolations });
    console.log("Returning violations to frontend:", enhancedViolations.length);


  } catch (err) {
    console.error("Error analyzing accessibility:", err.message);
    res.status(500).json({ error: "Failed to analyze accessibility" });
  }
}

module.exports = { analyzeAccessibility };
