const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const axeSource = require('axe-core').source;

const analyzeWithAxe = async (url) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Inject axe-core script
  await page.evaluate(axeSource);

  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  await browser.close();
  return results;
};

module.exports = { analyzeWithAxe };
