// Cycle the hero scripts, one active at a time
const scriptSpans = document.querySelectorAll('.hero__scripts span');
let scriptIndex = 0;
function cycleScripts() {
  scriptSpans.forEach((el) => el.classList.remove('is-active'));
  scriptSpans[scriptIndex].classList.add('is-active');
  scriptIndex = (scriptIndex + 1) % scriptSpans.length;
}
if (scriptSpans.length) {
  cycleScripts();
  setInterval(cycleScripts, 1400);
}

// Demo input tabs
const tabs = document.querySelectorAll('.demo__tab');
const fields = document.querySelectorAll('.demo__field');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    const target = tab.dataset.input;
    fields.forEach((f) => {
      f.classList.toggle('is-hidden', f.dataset.field !== target);
    });
    document.getElementById('demoOutput').textContent = '';
  });
});

// Translate action — calls the Flask backend
const translateBtn = document.getElementById('translateBtn');
const demoOutput = document.getElementById('demoOutput');

function typeOut(text) {
  demoOutput.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    demoOutput.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      translateBtn.disabled = false;
    }
  }, 18);
}

translateBtn.addEventListener('click', async () => {
  const activeTab = document.querySelector('.demo__tab.is-active').dataset.input;
  const payload = { type: activeTab };
  if (activeTab === 'text') {
    payload.text = document.getElementById('demoText').value;
  }

  translateBtn.disabled = true;
  demoOutput.textContent = 'Translating…';

  try {
    const response = await fetch('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.error) {
      demoOutput.textContent = `Error: ${data.error}`;
      translateBtn.disabled = false;
    } else {
      typeOut(data.result);
    }
  } catch (err) {
    demoOutput.textContent = 'Could not reach the server. Is app.py running?';
    translateBtn.disabled = false;
  }
});
