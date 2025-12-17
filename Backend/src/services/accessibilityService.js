const chromium = require("@sparticuz/chromium");
const puppeteerCore = require("puppeteer-core");
// Conditionally require puppeteer for local development to avoid Vercel errors
let puppeteer;
try {
  puppeteer = require("puppeteer");
} catch (e) {
  // Puppeteer not available (production environment)
}

const axeCore = require("axe-core");

/**
 * Analyzes the given URL for accessibility violations using Axe-core.
 * @param {string} url - The URL to analyze.
 * @returns {Promise<Object>} - Axe results object.
 */
async function runAxeAnalysis(url) {
  let browser;
  try {
    let launchOptions = {};

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      // Production (Vercel) config
      const executablePath = await chromium.executablePath();
      launchOptions = {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath,
        headless: chromium.headless,
      };
      browser = await puppeteerCore.launch(launchOptions);
    } else {
      // Local development config
      if (!puppeteer) {
         throw new Error("Puppeteer dependency not found for local development.");
      }
      launchOptions = {
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      };
      browser = await puppeteer.launch(launchOptions);
    }

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
