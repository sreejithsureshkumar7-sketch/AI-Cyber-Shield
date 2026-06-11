function loginRisk(device, location) {
  let risk = 20;
  const reasons = [];
  const knownDevices = ['android', 'chrome', 'windows'];
  const knownLocations = ['chennai', 'india', 'madurai', 'coimbatore', 'hyderabad'];

  if (!knownDevices.some(d => device.toLowerCase().includes(d))) {
    risk += 30; reasons.push('New or unknown device');
  }
  if (!knownLocations.some(l => location.toLowerCase().includes(l))) {
    risk += 35; reasons.push('New or unusual location');
  }
  const hour = new Date().getHours();
  if (hour >= 0 && hour <= 5) { risk += 15; reasons.push('Unusual login time'); }

  risk = Math.min(risk, 95);
  return {
    status: risk > 60 ? 'Suspicious Login' : 'Normal Login',
    risk,
    reason: reasons.length ? reasons.join(', ') : 'Known device and location pattern'
  };
}
module.exports = { loginRisk };
