const { runAxeAnalysis } = require("../services/accessibilityService");
const { generateFixSuggestion } = require("../services/aiService");
const { createPdfReport } = require("../services/pdfService");

/**
 * Handles the analysis request.
 */
async function analyze(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const results = await runAxeAnalysis(url);
    // violations are returned raw, without AI enhancement
    res.json({ violations: results.violations });
  } catch (error) {
    console.error("Analysis Controller Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to analyze accessibility" });
  }
}

/**
 * Handles the AI fix suggestion request.
 */
async function suggestFix(req, res) {
  const { violation } = req.body;
  if (!violation) {
    return res.status(400).json({ error: "Violation data is required" });
  }

  try {
    const suggestion = await generateFixSuggestion(violation);
    res.json({ suggestion });
  } catch (error) {
    console.error("Suggestion Controller Error:", error);
    res.status(500).json({ error: "Failed to generate suggestion" });
  }
}

/**
 * Handles the PDF generation request.
 */
async function generatePdf(req, res) {
  const { violations, url } = req.body;
  if (!violations || !url) {
    return res.status(400).json({ error: "Violations and URL are required" });
  }

  try {
    const pdfBuffer = await createPdfReport(violations, url);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=accessibility-report-${new URL(url).hostname}.pdf`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Controller Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate PDF report" });
  }
}

module.exports = { analyze, generatePdf, suggestFix };
