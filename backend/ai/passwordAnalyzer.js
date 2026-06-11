function analyzePassword(password) {
  let score = 0;
  const tips = [];
  if (password.length >= 8) score += 20; else tips.push('Use minimum 8 characters');
  if (password.length >= 12) score += 15; else tips.push('12+ characters is better');
  if (/[A-Z]/.test(password)) score += 15; else tips.push('Add uppercase letter');
  if (/[a-z]/.test(password)) score += 15; else tips.push('Add lowercase letter');
  if (/[0-9]/.test(password)) score += 15; else tips.push('Add number');
  if (/[^A-Za-z0-9]/.test(password)) score += 20; else tips.push('Add symbol like @ # $');

  const level = score > 75 ? 'Strong Password' : score > 45 ? 'Medium Password' : 'Weak Password';
  if (!tips.length) tips.push('Excellent! Your password pattern is strong.');
  return { score, level, tips };
}
module.exports = { analyzePassword };
