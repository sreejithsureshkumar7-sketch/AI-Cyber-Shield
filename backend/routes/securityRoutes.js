const express = require('express');
const { detectPhishing } = require('../ai/phishingDetector');
const { analyzePassword } = require('../ai/passwordAnalyzer');
const { loginRisk } = require('../ai/loginRiskAI');

const router = express.Router();

router.post('/scan-url', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: true, message: 'URL required' });
  res.json(detectPhishing(url));
});

router.post('/password', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: true, message: 'Password required' });
  res.json(analyzePassword(password));
});

router.post('/login-risk', (req, res) => {
  const { device, location } = req.body;
  res.json(loginRisk(device || '', location || ''));
});

module.exports = router;
