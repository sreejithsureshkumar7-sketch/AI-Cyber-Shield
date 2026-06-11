const API = 'http://localhost:5000/api';

function scrollToTools(){ document.getElementById('tools').scrollIntoView({behavior:'smooth'}); }

async function postData(path, data){
  try{
    const res = await fetch(API + path, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
    return await res.json();
  }catch(err){
    return {error:true, message:'Backend not running. Start backend using: npm start'};
  }
}

async function scanURL(){
  const url = document.getElementById('urlInput').value.trim();
  const out = document.getElementById('urlResult');
  if(!url) return out.innerHTML = 'Please enter URL';
  const data = await postData('/scan-url',{url});
  out.innerHTML = data.error ? data.message : `<b class="${data.risk>70?'danger':data.risk>40?'warning':'safe'}">${data.status}</b><br>Risk Score: ${data.risk}%<br>${data.reason}`;
}

async function checkPassword(){
  const password = document.getElementById('passwordInput').value;
  const out = document.getElementById('passwordResult');
  if(!password) return out.innerHTML = 'Please enter password';
  const data = await postData('/password',{password});
  out.innerHTML = data.error ? data.message : `<b class="${data.score>75?'safe':data.score>45?'warning':'danger'}">${data.level}</b><br>Strength Score: ${data.score}%<br>${data.tips.join('<br>')}`;
}

async function checkLoginRisk(){
  const device = document.getElementById('deviceInput').value.trim();
  const location = document.getElementById('locationInput').value.trim();
  const data = await postData('/login-risk',{device,location});
  document.getElementById('loginResult').innerHTML = data.error ? data.message : `<b class="${data.risk>60?'danger':'safe'}">${data.status}</b><br>Risk: ${data.risk}%<br>${data.reason}`;
}

async function scanQR(){
  const text = document.getElementById('qrInput').value.trim();
  const data = await postData('/scan-url',{url:text});
  document.getElementById('qrResult').innerHTML = data.error ? data.message : `<b>${data.status}</b><br>QR Risk: ${data.risk}%`;
}

function askAI(){
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if(!msg) return;
  const lower = msg.toLowerCase();
  let reply = 'Use strong passwords, avoid unknown links, enable 2FA, and never share OTP.';
  if(lower.includes('phishing')) reply = 'Phishing is a fake message or website that tries to steal login details. Check URL spelling and avoid urgent fake offers.';
  if(lower.includes('password')) reply = 'A strong password should include uppercase, lowercase, number, symbol, and at least 12 characters.';
  if(lower.includes('otp')) reply = 'Never share OTP with anyone. Real banks or companies will not ask OTP through calls or messages.';
  document.getElementById('chatMessages').innerHTML += `<p><b>You:</b> ${msg}</p><p><b>AI:</b> ${reply}</p>`;
  input.value='';
}

function downloadReport(){
  const text = `AI Cyber Shield Security Report\n\nSecurity Score: 86%\nThreat Alerts: 3\nLogin Attempts: 12\nRecommendation: Use strong password, enable 2FA, avoid unknown links.`;
  const blob = new Blob([text], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download='security-report.txt'; a.click();
}
