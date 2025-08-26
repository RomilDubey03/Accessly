const express = require('express');
const router = express.Router();
const { analyzeAccessibility } = require('../controllers/analyzeController');

router.post('/', analyzeAccessibility);

module.exports = router;
