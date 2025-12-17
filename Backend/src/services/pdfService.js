const chromium = require("@sparticuz/chromium");
const puppeteerCore = require("puppeteer-core");
let puppeteer;
try {
  puppeteer = require("puppeteer");
} catch (e) {
  // Puppeteer not available (production)
}

/**
 * Generates a PDF buffer from a list of violations.
 * @param {Array} violations - List of violations.
 * @param {string} url - The analyzed URL.
 * @returns {Promise<Buffer>} - PDF buffer.
 */
async function createPdfReport(violations, url) {
  const htmlContent = generateHtmlForPdf(violations, url);
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
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "40px",
        bottom: "40px",
        left: "40px",
        right: "40px",
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw new Error("Failed to generate PDF.");
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Helper to generate HTML string for the PDF.
 */
function generateHtmlForPdf(violations, url) {
  const escapeHTML = (str) => {
    if (typeof str !== "string") return "";
    return str.replace(/[&<>"']/g, (match) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return map[match];
    });
  };

  const violationsHtml = violations
    .map(
      (v, index) => `
    <div class="report-card">
      <div class="card-header">
        <h3>${index + 1}. ${escapeHTML(v.help)}</h3>
        <span class="impact ${v.impact}">${v.impact}</span>
      </div>
      <div class="card-body">
        <p><strong>ID:</strong> ${escapeHTML(v.id)}</p>
        <p><strong>Description:</strong> ${escapeHTML(v.description)}</p>
        <p><strong>HTML:</strong> <code>${escapeHTML(v.nodes?.[0]?.html)}</code></p>
        <p><strong>Failure Summary:</strong> ${escapeHTML(v.nodes?.[0]?.failureSummary)}</p>
        <div class="gpt-box">
          <h4>🧠 GEMINI-Suggestion:</h4>
          <p>${escapeHTML(v.gptExplanation).replace(/\n/g, "<br />")}</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  const cssStyles = `
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; background: #f9f9f9; color: #333; }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
    h2 { color: #34495e; }
    h3 { margin: 0; }
    p { margin-top: 0; margin-bottom: 1em; }
    code { background: #eee; padding: 2px 4px; border-radius: 4px; font-family: "Courier New", Courier, monospace; }
    .report-container { max-width: 900px; margin: auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .report-card { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1.5rem; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden; }
    .card-header { display: flex; justify-content: space-between; align-items: center; background: #f3f3f3; padding: 1rem; }
    .card-body { padding: 1rem; }
    .impact { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; color: white; text-transform: capitalize; }
    .impact.minor { background-color: green; }
    .impact.moderate { background-color: orange; }
    .impact.serious { background-color: orangered; }
    .impact.critical { background-color: red; }
    .gpt-box { background-color: #f4f8ff; border-left: 4px solid #8781f9; padding: 15px 20px; margin-top: 15px; border-radius: 6px; color: #0e0404; white-space: pre-wrap; }
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Accessibility Report</title>
      <style>${cssStyles}</style>
    </head>
    <body>
      <div class="report-container">
        <h1>Accessibility Report</h1>
        <p><strong>URL Analyzed:</strong> <a href="${url}">${url}</a></p>
        <p>Found ${violations.length} violations.</p>
        <hr>
        ${violationsHtml}
      </div>
    </body>
    </html>
  `;
}

module.exports = { createPdfReport };
