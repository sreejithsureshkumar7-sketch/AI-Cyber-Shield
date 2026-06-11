function detectPhishing(url) {
  const lower = url.toLowerCase();
  let risk = 10;
  const reasons = [];

  const dangerWords = ['login', 'verify', 'free', 'gift', 'urgent', 'bank', 'otp', 'password', 'security', 'update', 'win'];
  const badDomains = ['.xyz', '.top', '.tk', '.ml', '.gq'];

  if (!lower.startsWith('https://')) { risk += 20; reasons.push('HTTPS missing'); }
  if (lower.includes('@')) { risk += 25; reasons.push('URL contains @ symbol'); }
  if ((lower.match(/-/g) || []).length >= 2) { risk += 15; reasons.push('Too many hyphens'); }
  if (badDomains.some(d => lower.includes(d))) { risk += 25; reasons.push('Suspicious domain extension'); }
  dangerWords.forEach(w => { if (lower.includes(w)) { risk += 5; reasons.push(`Suspicious keyword: ${w}`); } });
  if (lower.length > 80) { risk += 10; reasons.push('URL is too long'); }

  risk = Math.min(risk, 98);
  return {
    status: risk > 70 ? 'Dangerous Website' : risk > 40 ? 'Suspicious Website' : 'Safe Website',
    risk,
    reason: reasons.length ? reasons.join(', ') : 'No major suspicious pattern found'
  };
}
module.exports = { detectPhishing };
