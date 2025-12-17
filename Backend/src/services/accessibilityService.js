const puppeteer = require("puppeteer");
const axeCore = require("axe-core");

/**
 * Analyzes the given URL for accessibility violations using Axe-core.
 * @param {string} url - The URL to analyze.
 * @returns {Promise<Object>} - Axe results object.
 */
async function runAxeAnalysis(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Inject axe-core
    await page.addScriptTag({ path: require.resolve("axe-core") });

    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa"],
        },
      });
    });

    return results;
  } catch (error) {
    console.error("Axe Analysis Error:", error);
    throw new Error("Failed to run accessibility analysis.");
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { runAxeAnalysis };
