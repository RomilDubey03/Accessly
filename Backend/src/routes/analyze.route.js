const express = require("express");
const router = express.Router();
const analyzeController = require("../controllers/analyze.controller");

router.post("/", analyzeController.analyze);
router.post("/suggest-fix", analyzeController.suggestFix);
router.post("/generate-pdf", analyzeController.generatePdf);

module.exports = router;
