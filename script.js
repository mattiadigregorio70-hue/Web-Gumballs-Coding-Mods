const MODEL_GROUPS = [
  {
    name: 'AI Video Models',
    items: [
      'Gumballideo 1.0', 'Gumballideo 1.0 Pro', 'Gumballideo 1.0 Fast', 'Gumballideo 1.0 Max', 'Gumballideo 1.0 Ultra',
      'Gumballideo 1.1', 'Gumballideo 1.1 Pro', 'Gumballideo 1.1 Fast', 'Dreamina Seedance 1.0', 'Dreamina Seedance 1.0 Pro',
      'Dreamina Seedance 1.0 Pro Fast', 'Dreamina Seedance 1.5 Pro', 'Dreamina Seedance 1.5 Lite', 'Dreamina Seedance 2.0',
      'Dreamina Seedance 2.0 Pro', 'Dreamina Seedance 2.0 Fast', 'Dreamina Seedance 2.0 Mini', 'Dreamina Seedance 2.0 (Tiktok AI Cast Version)',
      'Dreamina Seedance 2.1', 'Dreamina Seedance 2.5', 'Capcut AI', 'Jimeng 3.0', 'Jimeng 3.0 Pro', 'DreamActor M2.0',
      'OmniHuman 1.5', 'Kling 1.6', 'Kling 2.0', 'Kling 2.5', 'Kling 2.6', 'Kling 3.0', 'Kling 3.0 Omni', 'Kling O1',
      'Grok Original', 'Grok 1.0', 'Grok 2.0', 'Grok 3.0', 'Minimax Hailuo 1.0', 'Minimax Hailuo 2.0', 'Minimax Hailuo 2.0 Free',
      'Minimax Hailuo 2.3', 'Minimax Hailuo 3.0', 'Minimax Hailuo 3.0 Free', 'Veo 2', 'Veo 3', 'Veo 3.1', 'Sora 1', 'Sora 2',
      'Sora 2 Pro', 'Sora 2 Storyboard Pro', 'Sora 2 Storyboard Free', 'Sora 2.1', 'Sora 2.1 Pro', 'Sora 2.2', 'Gemini Omni Flash',
      'Gemini Omni 1.1 Flash', 'Gemini Omni 1.2 Flash', 'MindVideo Free', 'MindVideo 2.0', 'MindVideo 3.0', 'Shutterstock AI',
      'Collart 2.0', 'Wan 2.0', 'Wan 2.1', 'Wan 2.2', 'Wan 2.3', 'Wan 2.5', 'Wan 2.6', 'Wan 2.7', 'Wan 3.0', 'PixVerse V3',
      'PixVerse V4', 'PixVerse V5', 'Pixverse V5.6', 'PixVerse V6', 'Luma Dream Machine', 'Runway Gen 3', 'Runway Gen 4', 'Qwen 3.7',
      'Qwen 3.8', 'LTX-2.0', 'LTX-2.0 Pro', 'LTX-2.3', 'LTX-2.3 Pro', 'LTX-2.3 Free', 'LTX-2.5', 'LTX-2.5 Pro'
    ]
  },
  {
    name: 'AI Image Models',
    items: [
      'GumballArt 1.0', 'GPT-Image 2', 'GPT-Image 2.5', 'Nano Banana', 'Nano Banana Pro', 'Nano Banana 2', 'Nano Banana 2 Pro',
      'Imagen 4', 'Imagen 4 Utra', 'Minimax Hailuo AI', 'Kling AI', 'Seedream XLL', 'Seedream 4.0', 'Seedream 4.5', 'Seedream 5.0',
      'Seedream 5.0 Pro', 'Grok AI', 'Seawanx'
    ]
  },
  {
    name: 'AI Music, Sounds & Avatar Models',
    items: [
      'GumballMachine 1.0', 'Suno V3', 'Suno V3.5', 'Suno V4', 'Suno V5', 'Suno V6', 'Suno V6 Mini', 'Eleven V3', 'Doubao',
      'Gemini AI', 'Creatina AI', 'Jimeng AI', 'Dreamina AI'
    ]
  }
];

const promptInput = document.querySelector('#prompt');
const charCount = document.querySelector('#char-count');
const generateButton = document.querySelector('#generate');
const result = document.querySelector('#result');
const codeOutput = document.querySelector('#code-output');
const preview = document.querySelector('#preview');
const subtitle = document.querySelector('#result-subtitle');
const modelList = document.querySelector('#model-list');
const modelCount = document.querySelector('#model-count');
const tabs = document.querySelectorAll('.tab');
const vibeButtons = document.querySelectorAll('.vibe-option');
const chips = document.querySelectorAll('.chip');

let selectedVibe = 'playful';
let activeTab = 'html';
let generatedFiles = {};

function renderModels() {
  const groupedHtml = MODEL_GROUPS.map((group) => `
    <div class="model-section">
      <h3>${group.name}</h3>
      <div class="items">
        ${group.items.map((model) => `
          <div class="model-item">
            <span class="model-name">${model}</span>
            <span class="model-tag">AI</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  modelList.innerHTML = groupedHtml;
  modelCount.textContent = `${MODEL_GROUPS.reduce((sum, group) => sum + group.items.length, 0)} models`;
}

promptInput.addEventListener('input', () => {
  charCount.textContent = `${promptInput.value.length} / 500`;
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    promptInput.value = chip.dataset.prompt;
    promptInput.dispatchEvent(new Event('input'));
    promptInput.focus();
  });
});

vibeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    vibeButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    selectedVibe = button.dataset.vibe;
  });
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    activeTab = tab.dataset.tab;
    codeOutput.textContent = generatedFiles[activeTab] || '';
  });
});

document.querySelector('#copy-code').addEventListener('click', async () => {
  const source = generatedFiles[activeTab] || '';
  if (!source) return;

  await navigator.clipboard.writeText(source);
  const button = document.querySelector('#copy-code');
  const original = button.textContent;
  button.textContent = 'Copied';
  setTimeout(() => {
    button.textContent = original;
  }, 1200);
});

document.querySelector('#download').addEventListener('click', () => {
  const blob = new Blob([generatedFiles.html || ''], { type: 'text/html' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = 'gumball-ai-generator-web.html';
  link.click();
  URL.revokeObjectURL(url);
});

generateButton.addEventListener('click', generateProject);
promptInput.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    generateProject();
  }
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function generateProject() {
  const idea = promptInput.value.trim() || 'A tiny magical landing page for a dreamy idea';
  generateButton.disabled = true;
  generateButton.style.opacity = '0.8';

  setTimeout(() => {
    generatedFiles = buildProject(idea, selectedVibe);
    activeTab = 'html';
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === 'html'));
    codeOutput.textContent = generatedFiles.html;
    preview.srcdoc = generatedFiles.html;
    subtitle.textContent = `Built in a ${selectedVibe} mood from: “${idea.slice(0, 72)}${idea.length > 72 ? '…' : ''}” • Recommended model mix: ${pickModels(idea).join(', ')}`;
    result.classList.remove('hidden');
    generateButton.disabled = false;
    generateButton.style.opacity = '1';
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 500);
}

function pickModels(idea) {
  const lowered = idea.toLowerCase();
  const picks = [];

  if (lowered.includes('game') || lowered.includes('arcade')) picks.push('Gumballideo 1.1 Pro');
  if (lowered.includes('music') || lowered.includes('song')) picks.push('Dreamina Seedance 2.0 Fast');
  if (lowered.includes('weather') || lowered.includes('nature')) picks.push('Dreamina Seedance 1.5 Pro');
  if (lowered.includes('cyber') || lowered.includes('neon')) picks.push('Kling 1.6');
  if (lowered.includes('portrait') || lowered.includes('face')) picks.push('OmniHuman 1.5');

  return picks.length ? picks.slice(0, 2) : ['Gumballideo 1.0', 'Dreamina Seedance 2.0'];
}

function buildProject(idea, vibe) {
  const safeIdea = escapeHtml(idea);
  const palette = {
    playful: ['#fff0b8', '#ff7aa2', '#5f4df7'],
    neon: ['#0b1023', '#47f1ff', '#ff47d2'],
    calm: ['#dff5ee', '#56b9a2', '#214d68']
  }[vibe] || ['#fff0b8', '#ff7aa2', '#5f4df7'];

  const css = `
    :root {
      --bg: ${palette[0]};
      --accent: ${palette[1]};
      --ink: ${palette[2]};
      --card: rgba(255,255,255,0.8);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: var(--bg);
      color: var(--ink);
      font-family: Arial, sans-serif;
      padding: 28px;
    }
    .card {
      width: min(680px, 100%);
      background: var(--card);
      border: 3px solid var(--ink);
      border-radius: 32px;
      padding: 42px 32px;
      box-shadow: 12px 12px 0 var(--accent);
      text-align: center;
    }
    .star {
      font-size: 2.6rem;
      margin-bottom: 10px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: clamp(2.2rem, 8vw, 4.5rem);
      line-height: 0.95;
    }
    p {
      margin: 0;
      font-size: 1.04rem;
      line-height: 1.7;
    }
    .cta {
      display: inline-block;
      margin-top: 22px;
      padding: 14px 24px;
      border: 0;
      border-radius: 999px;
      background: var(--ink);
      color: white;
      font-weight: 700;
      cursor: pointer;
    }
    .cta:hover {
      transform: rotate(-2deg) scale(1.04);
    }
  `;

  const js = `
    document.querySelector('.cta').addEventListener('click', () => {
      const button = document.querySelector('.cta');
      button.textContent = 'You made magic ✨';
      button.style.background = '#fff';
      button.style.color = '#222';
      document.querySelector('.card').animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
        { duration: 350 }
      );
    });
  `;

  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Extra Web</title>
      <style>${css}</style>
    </head>
    <body>
      <main class="card">
        <div class="star">✦</div>
        <h1>${safeIdea}</h1>
        <p>A tiny delight for the internet, built from a dream and a little sparkle.</p>
        <button class="cta">Make it glow</button>
      </main>
      <script>${js}<\/script>
    </body>
  </html>`;

  return {
    html,
    css,
    js
  };
}

renderModels();
charCount.textContent = '0 / 500';
