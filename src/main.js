const routes = {
  web2: {
    title: 'Web2 Developer',
    desc: 'Focus on your application logic using Python or TypeScript. Ship production-ready blockchain features using familiar tools without needing to learn low-level crypto primitives.',
    stack: ['AlgoKit', 'SDKs', 'Node.js/Python', 'localnet'],
    primary: { text: 'AlgoKit Docs', href: 'https://developer.algorand.org/docs/get-started/algokit/' }
  },
  enterprise: {
    title: 'Business / Enterprise',
    desc: 'Integrate blockchain for loyalty, treasury, or compliance. Use Intermezzo APIs to handle key management and fee sponsorship so you can focus on the business value.',
    stack: ['Intermezzo', 'Rocca', 'REST APIs', 'custody'],
    primary: { text: 'Enterprise Guide', href: '/platform#enterprise' }
  },
  rwa: {
    title: 'TradFi / RWA Builder',
    desc: 'Tokenize real-world assets like debt or equity with compliance baked in. Leverage ACTUS standards and Algorand\'s institutional-grade infrastructure.',
    stack: ['RWA Focus', 'ACTUS Standards', 'ASAs', 'Smart Contracts'],
    primary: { text: 'Tokenization Stack', href: '/use-cases#rwa' }
  },
  payments: {
    title: 'NGO / Payments Builder',
    desc: 'Build global payment rails for aid distribution or remittances. Benefit from <3s finality, sub-cent fees, and first-class identity standards.',
    stack: ['Native Payments', 'ASAs (Stablecoins)', 'DID / VC', 'Intermezzo'],
    primary: { text: 'Payments Quickstart', href: '/use-cases#payments' }
  },
  ai: {
    title: 'AI / Agent Builder',
    desc: 'Give your AI agents the ability to transact autonomously. Use X402 for agentic commerce and AC2 for verifiable agent identity.',
    stack: ['x402 protocol', 'AC2 Identity', 'MCP Integration', 'AlgoKit: AI'],
    primary: { text: 'Agentic Stack Docs', href: '/focus#ai' }
  },
  wallet: {
    title: 'Wallet / App Builder',
    desc: 'Launch professional consumer wallets with Passkey (FIDO2) auth and native identity. Use the Rocca SDK to ship in weeks, not months.',
    stack: ['Rocca SDK', 'Liquid Auth', 'wallet-core', 'Passkey UX'],
    primary: { text: 'Rocca SDK Docs', href: '/platform#rocca' }
  }
};

const docSuggestions = [
  { q: "How to create a smart contract in Python?", persona: "web2" },
  { q: "What is an Algorand Standard Asset (ASA)?", persona: "payments" },
  { q: "Install AlgoKit CLI", persona: "web2" },
  { q: "RWA Tokenization Guide", persona: "rwa" },
  { q: "Agentic Commerce: X402 and AC2", persona: "ai" },
  { q: "Migrating from Ethereum / Solidity", persona: "web2" },
  { q: "Building compliant financial products", persona: "enterprise" },
  { q: "Whitelabel Wallet with Passkey Auth", persona: "wallet" }
];

window.initSearch = function() {
  const input = document.getElementById('search-input');
  const suggestions = document.getElementById('search-suggestions');
  const trending = document.getElementById('trending-tags');

  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    if (val.length < 2) {
      suggestions.classList.remove('active');
      return;
    }

    const matches = docSuggestions.filter(s => s.q.toLowerCase().includes(val));
    renderSuggestions(matches);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      if (suggestions) suggestions.classList.remove('active');
    }
  });

  // Trending tags
  if (trending) {
    trending.innerHTML = docSuggestions.slice(0, 4).map(s => `
      <button class="tag-btn" onclick="selectSuggestion('${s.q}', '${s.persona}')">${s.q.split(':')[0]}</button>
    `).join('');
  }
};

function renderSuggestions(matches) {
  const container = document.getElementById('search-suggestions');
  if (matches.length === 0) {
    container.classList.remove('active');
    return;
  }

  container.innerHTML = matches.map(m => `
    <div class="suggestion-item" onclick="selectSuggestion('${m.q}', '${m.persona}')">
      <span class="suggestion-icon">🔍</span>
      <span>${m.q}</span>
    </div>
  `).join('');
  container.classList.add('active');
}

window.selectSuggestion = function(q, personaKey) {
  const input = document.getElementById('search-input');
  if (input) input.value = q;
  document.getElementById('search-suggestions').classList.remove('active');
  
  showDiscoveryResult(personaKey);
};

function showDiscoveryResult(personaKey) {
  const r = routes[personaKey];
  const heroContent = document.getElementById('hero-main-content');
  
  heroContent.innerHTML = `
    <div class="result-card" style="max-width: 800px; margin: 40px auto; animation: slideUp 0.4s ease both; text-align: left;">
      <div class="result-label">// MATCH_FOUND → RECOMMENDED_PATH</div>
      <div class="result-title">${r.title}</div>
      <p class="result-desc">${r.desc}</p>
      <div class="result-stack">
        ${r.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
      </div>
      <div class="result-actions">
        <a href="${r.primary.href}" class="btn-primary" target="_blank">${r.primary.text} →</a>
        <button class="btn-secondary" onclick="location.reload()">← New Search</button>
      </div>
    </div>
  `;
}

window.filterUC = function(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.uc-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    } else {
      card.style.opacity = '0.15';
      card.style.pointerEvents = 'none';
    }
  });
};

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

const pathways = {
  web2: {
    title: 'Modern Web Application Developer',
    desc: 'You want to build high-scale applications using the tools you already know. Algorand removes the "crypto" friction, letting you focus on UX.',
    cta: 'Start Building with Python or TS',
    specs: [
      { label: 'Core SDK', value: 'AlgoKit CLI (Python / TS)' },
      { label: 'Environment', value: 'LocalNet (Instant 1s blocks)' },
      { label: 'Primary Use Case', value: 'High-throughput Social/Consumer apps' }
    ]
  },
  enterprise: {
    title: 'Enterprise & Institutional Builder',
    desc: 'You need robust APIs, fee sponsorship, and hardware-level security. We provide the infrastructure to link legacy systems to the chain.',
    cta: 'Explore Enterprise Solutions',
    specs: [
      { label: 'Data Layer', value: 'Conduit / Indexer' },
      { label: 'Security', value: 'Institutional Custody APIs' },
      { label: 'Primary Use Case', value: 'Supply Chain, Treasury, Compliance' }
    ]
  },
  rwa: {
    title: 'TradFi & RWA Architect',
    desc: 'Tokenize real-world assets with immutable proof and regulatory hooks. Algorand is built for institutional-grade financial assets.',
    cta: 'View Tokenization Toolkit',
    specs: [
      { label: 'Standards', value: 'ACTUS & ASA (L1 Assets)' },
      { label: 'Auditability', value: '100% Uptime & No-Forking' },
      { label: 'Primary Use Case', value: 'Real Estate, Debt, Commodities' }
    ]
  },
  payments: {
    title: 'Global Payments & Impact',
    desc: 'Build global payment rails with zero volatility risk. Leverage stablecoins and identity standards to deliver aid or value anywhere.',
    cta: 'Build Payment Rails',
    specs: [
      { label: 'Standard', value: 'L1 Asset (USDC/EURSi)' },
      { label: 'Identity', value: 'did:algo / Verifiable Credentials' },
      { label: 'Primary Use Case', value: 'Remittances, Aid, Direct Cash' }
    ]
  },
  ai: {
    title: 'AI & Agentic Commerce Specialist',
    desc: 'Empower autonomous agents with native wallets and verifiable identities. Let machines transact at the speed of business.',
    cta: 'Empower Your Agents',
    specs: [
      { label: 'Agent Protocol', value: 'X402 Payment Standard' },
      { label: 'Agent Identity', value: 'AC2 Proof of Intent' },
      { label: 'Primary Use Case', value: 'Machine-to-Machine micro-payments' }
    ]
  },
  wallet: {
    title: 'Web3 Native & Wallet Builder',
    desc: 'Ship the next generation of non-custodial apps. Native Passkey support eliminates seed phrase friction for good.',
    cta: 'Simplify Your Wallet UX',
    specs: [
      { label: 'Auth Stack', value: 'Rocca SDK (Passkeys / FIDO2)' },
      { label: 'Wallet Tech', value: 'Liquid Auth (Self-Custodial)' },
      { label: 'Primary Use Case', value: 'Consumer Wallets, DEXs, NFT Apps' }
    ]
  }
};

let pathwayCycleInterval;
const pathwayKeys = Object.keys(pathways);
let currentPathIndex = 0;

window.switchPath = function(key, btn, isManual = false) {
  if (isManual) clearInterval(pathwayCycleInterval);

  // Update Tabs
  document.querySelectorAll('.path-nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const btnToActive = document.querySelectorAll('.path-nav-btn')[pathwayKeys.indexOf(key)];
    if (btnToActive) btnToActive.classList.add('active');
  }

  const p = pathways[key];
  const display = document.getElementById('pathway-display');
  if (!display) return;
  
  display.style.opacity = '0';
  display.style.transform = 'translateY(10px)';

  setTimeout(() => {
    display.innerHTML = `
      <div class="pathway-content">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="result-actions">
          <a href="#" class="btn-primary">${p.cta} →</a>
        </div>
      </div>
      <div class="toolkit-specs">
        ${p.specs.map(s => `
          <div class="spec-item">
            <div class="spec-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div class="spec-label">${s.label}</div>
              <div class="spec-value">${s.value}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    display.style.opacity = '1';
    display.style.transform = 'translateY(0)';
  }, 200);
};

window.startPathwayCycle = function() {
  pathwayCycleInterval = setInterval(() => {
    currentPathIndex = (currentPathIndex + 1) % pathwayKeys.length;
    switchPath(pathwayKeys[currentPathIndex], null, false);
  }, 5000);
};

const dashboardTemplates = [
  { 
    name: 'List Examples', 
    desc: 'algokit init example --list',
    code: `<span style="color: var(--green);">$ algokit init example --list</span>\n\nID                  TITLE                           TYPE           DESCRIPTION\n-------------------------------------------------------------------------------------------------------\nhello-world         Hello World                     smart-contract Simple Python starter contract\npersonal-bank       Personal Bank                   smart-contract Bank vault logic in Python\nbeaker-starter      Beaker Starter                  smart-contract A legacy Beaker-based contract\nreact-frontend      React Frontend                  frontend       Base React app with Algorand SDK\nfullstack-app       Fullstack Starter               fullstack      Python backend + React frontend\nintegration-sample  Identity Bridge                 integration    DID and VC integration pattern`
  },
  { 
    name: 'Init Hello World', 
    desc: 'algokit init example hello-world',
    code: `<span style="color: var(--green);">$ algokit init example hello-world</span>\n\n- Cloning example: hello-world...\n- Copying files to ./hello-world...\n- Initializing git repository...\n\n<span style="color: var(--green);">SUCCESS: Project 'hello-world' initialized.</span>\n\nNext steps:\n  cd hello-world\n  algokit bootstrap`
  },
  { 
    name: 'Init Full-Stack', 
    desc: 'algokit init example fullstack-app',
    code: `<span style="color: var(--green);">$ algokit init example fullstack-app</span>\n\n- Cloning example: fullstack-app...\n- Configuring React frontend...\n- Setting up Python backend...\n\n<span style="color: var(--green);">SUCCESS: Project 'fullstack-app' initialized.</span>\n\nRun 'algokit bootstrap' to install dependencies.`
  }
];

const ytTutorials = [
  { id: 'mL7-oU_44wc', title: 'Hello World with Algorand Python', desc: 'Write and deploy your first Python contract in 28 minutes.' },
  { id: '9SDI8LTY5nQ', title: 'Personal Bank in Python', desc: 'Build a functional banking app on-chain.' },
  { id: '6AKJiAQKswE', title: 'Vibe Coding with TypeScript', desc: 'The absolute latest in TS contract development.' }
];

let dashIndex = 0;
let ytIndex = 0;

window.initDashboard = function() {
  const sidebar = document.getElementById('dash-sidebar');
  const terminal = document.getElementById('dash-terminal');
  if (!sidebar || !terminal) return;

  renderDashboard();

  setInterval(() => {
    dashIndex = (dashIndex + 1) % dashboardTemplates.length;
    renderDashboard();
  }, 7000);
};

function renderDashboard() {
  const sidebar = document.getElementById('dash-sidebar');
  const terminal = document.getElementById('dash-terminal');
  
  sidebar.innerHTML = dashboardTemplates.map((t, i) => `
    <div class="bullet-item ${i === dashIndex ? 'active' : ''}" onclick="setDash(${i})">
      <div class="bullet-point"></div>
      <div class="bullet-text">
        <h4>${t.name}</h4>
        <p>${t.desc}</p>
      </div>
    </div>
  `).join('');

  terminal.innerHTML = dashboardTemplates[dashIndex].code;
}

window.setDash = function(i) {
  dashIndex = i;
  renderDashboard();
};

window.initYouTube = function() {
  const embed = document.getElementById('yt-embed');
  const info = document.getElementById('yt-info');
  if (!embed || !info) return;

  renderYouTube();

  setInterval(() => {
    ytIndex = (ytIndex + 1) % ytTutorials.length;
    renderYouTube();
  }, 10000);
};

function renderYouTube() {
  const embed = document.getElementById('yt-embed');
  const info = document.getElementById('yt-info');
  const v = ytTutorials[ytIndex];

  embed.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${v.id}?autoplay=0&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  
  info.innerHTML = `
    <span class="section-label" style="color: var(--green);">// WATCH_&_LEARN</span>
    <h3 class="section-title">${v.title}</h3>
    <p style="color: var(--muted); font-size: 18px; margin-bottom: 24px;">${v.desc}</p>
    <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" class="btn-primary">Watch on YouTube →</a>
  `;
}

const hubContent = {
  ai: {
    title: 'Agentic Commerce',
    subs: [
      { 
        title: 'Autonomous Payments', 
        desc: 'AI agents with native wallets executing machine-to-machine transactions.',
        link: 'https://developer.algorand.org/docs/get-details/transactions/',
        code: `// X402 Payment Request\nagent.pay({\n  to: "BOS...",\n  amount: 1000,\n  identifier: "compute_job_42"\n})`
      },
      { 
        title: 'Verifiable Intent', 
        desc: 'Cryptographic proof that an action was authorized by the human owner.',
        link: '/protocol#ac2',
        code: `// AC2 Proof of Intent\nconst proof = await ac2.sign({\n  action: "ACCESS_DATABASE",\n  validUntil: Date.now() + 3600\n})`
      }
    ]
  },
  finance: {
    title: 'Digital Finance',
    subs: [
      { 
        title: 'RWA Tokenization', 
        desc: 'Tokenizing real-world assets like debt or real estate with institutional grade standards.',
        link: 'https://developer.algorand.org/docs/get-details/asa/',
        code: `// ACTUS Asset Creation\nconst asset = await algokit.asset.create({\n  name: "TOKEN_DEBT_01",\n  unit: "TD01",\n  total: 1000000\n})`
      },
      { 
        title: 'Atomic Settlements', 
        desc: 'Instant, risk-free swaps between any number of parties without escrows.',
        link: 'https://developer.algorand.org/docs/get-details/atomic_transfers/',
        code: `// Atomic Transfer\nconst atc = new AtomicTransactionComposer()\natc.addTransaction({ ...payment })\natc.addTransaction({ ...assetTransfer })\nawait atc.execute(client)`
      }
    ]
  },
  impact: {
    title: 'Global Impact',
    subs: [
      { 
        title: 'Direct Cash Aid', 
        desc: 'Delivering value to recipients instantly with full on-chain transparency.',
        link: 'https://developer.algorand.org/solutions/social-impact/',
        code: `// Humanitarian Disbursement\nawait client.disburse({\n  recipient: "AID...",\n  amount: 50,\n  asset: USDC_ID\n})`
      },
      { 
        title: 'Verifiable Impact', 
        desc: 'Proving impact outcomes through immutable ledger entries.',
        link: 'https://developer.algorand.org/solutions/social-impact/',
        code: `// Log Impact Event\nawait algokit.log({\n  event: "WELL_DRILLED",\n  lat: 4.21,\n  lng: 23.45\n})`
      }
    ]
  }
};

let activeRoot = 'ai';
let activeSubIndex = 0;
let rootCycleTimer;
let subCycleTimer;
const ROOT_CYCLE_TIME = 15000; // 15s per root category
const SUB_CYCLE_TIME = 5000;   // 5s per sub-category

window.switchHub = function(cat, btn) {
  if (rootCycleTimer) clearInterval(rootCycleTimer);
  if (subCycleTimer) clearInterval(subCycleTimer);

  activeRoot = cat;
  activeSubIndex = 0;

  document.querySelectorAll('.hub-root-item').forEach(el => {
    el.classList.remove('active');
    const pb = el.querySelector('.root-progress-bar');
    if (pb) pb.style.width = '0%';
  });
  
  if (btn) btn.classList.add('active');
  
  renderHub();
  startTimers();
};

function renderHub() {
  const display = document.getElementById('hub-display');
  if (!display) return;

  const content = hubContent[activeRoot];
  const subs = content.subs;
  const currentSub = subs[activeSubIndex];

  display.innerHTML = `
    <div class="sub-cycle-nav">
      ${subs.map((s, i) => `
        <div class="sub-item ${i === activeSubIndex ? 'active' : ''}" onclick="setSub(${i})">
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      `).join('')}
    </div>
    <div class="demo-preview">
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--green); margin-bottom: 24px; opacity: 0.6;">// SOLUTION_DEMO</div>
      <h3 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">${currentSub.title}</h3>
      <p style="color: var(--muted); margin-bottom: 32px; font-size: 15px;">Explore how developers are implementing ${currentSub.title.toLowerCase()} on Algorand.</p>
      <div class="code-snippet-small">${currentSub.code}</div>
      <div style="margin-top: 32px;">
        <a href="${currentSub.link}" class="btn-primary" style="padding: 12px 24px; font-size: 14px;">Build this solution →</a>
      </div>
    </div>
  `;
}


window.setSub = function(i) {
  activeSubIndex = i;
  renderHub();
};

function startTimers() {
  let startTime = Date.now();
  const progressBar = document.querySelector('.hub-root-item.active .root-progress-bar');

  rootCycleTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = (elapsed / ROOT_CYCLE_TIME) * 100;
    
    if (progressBar) progressBar.style.width = progress + '%';

    if (elapsed >= ROOT_CYCLE_TIME) {
      clearInterval(rootCycleTimer);
      const keys = Object.keys(hubContent);
      const nextIndex = (keys.indexOf(activeRoot) + 1) % keys.length;
      switchHub(keys[nextIndex], document.querySelectorAll('.hub-root-item')[nextIndex]);
    }
  }, 100);

  subCycleTimer = setInterval(() => {
    activeSubIndex = (activeSubIndex + 1) % hubContent[activeRoot].subs.length;
    renderHub();
  }, SUB_CYCLE_TIME);
}

// =========================================================
// CONTENT HUBS – tabbed panel renderer
// =========================================================

const contentHubData = {
  start: {
    eyebrow: 'GETTING_STARTED',
    title: 'From zero to deployed.',
    desc: 'Install AlgoKit, scaffold a project, and ship your first smart contract to TestNet in under 30 minutes. No prior blockchain experience required.',
    links: [
      { label: 'QuickStart Guide', desc: 'Full walkthrough from install to first deployed contract.', tag: 'BEGINNER', url: 'https://developer.algorand.org/docs/get-started/basics/what_is_algorand/' },
      { label: 'Install AlgoKit', desc: 'One-command Algorand dev environment setup.', tag: 'CLI', url: 'https://developer.algorand.org/docs/get-started/algokit/' },
      { label: 'Use the TestNet Dispenser', desc: 'Fund a wallet on TestNet and make your first transaction.', tag: 'TESTNET', url: 'https://bank.testnet.algorand.network/' },
      { label: 'Your First Smart Contract', desc: 'Write, compile, and deploy using Python or TypeScript.', tag: 'TUTORIAL', url: 'https://developer.algorand.org/docs/get-started/dapps/' },
      { label: 'Explore the Explained Videos', desc: 'Short video series on Algorand fundamentals for devs.', tag: 'VIDEO', url: 'https://www.youtube.com/@AlgorandDevs' },
      { label: 'Join the Dev Discord', desc: 'Ask questions and build with the community.', tag: 'COMMUNITY', url: 'https://discord.gg/algorand' },
    ],
    cta: { label: 'Start building →', url: 'https://developer.algorand.org/docs/get-started/basics/what_is_algorand/' },
    note: 'Estimated time to first deployment: ~25 minutes'
  },
  concepts: {
    eyebrow: 'CORE_CONCEPTS',
    title: 'Understand the protocol.',
    desc: 'Algorand is built on provably pure Proof-of-Stake. Learn the primitives that make it fast, final, and fork-free — so you can reason about your applications with confidence.',
    links: [
      { label: 'Accounts & Keys', desc: 'Multisig, rekeying, and how Algorand accounts work.', tag: 'FUNDAMENTALS', url: 'https://developer.algorand.org/docs/get-details/accounts/' },
      { label: 'Transactions', desc: 'Pay, AssetTransfer, AppCall, and atomic groups.', tag: 'FUNDAMENTALS', url: 'https://developer.algorand.org/docs/get-details/transactions/' },
      { label: 'Smart Contracts (AVM)', desc: 'How the Algorand Virtual Machine executes logic.', tag: 'AVM', url: 'https://developer.algorand.org/docs/get-details/dapps/smart-contracts/' },
      { label: 'Algorand Standard Assets', desc: 'Fungible and non-fungible tokens at layer 1.', tag: 'ASSETS', url: 'https://developer.algorand.org/docs/get-details/asa/' },
      { label: 'State & Storage', desc: 'Global, local, and box storage in smart contracts.', tag: 'STATE', url: 'https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/state/' },
      { label: 'Atomic Transfers', desc: 'Bundle up to 16 transactions that succeed or fail together.', tag: 'ADVANCED', url: 'https://developer.algorand.org/docs/get-details/atomic_transfers/' },
    ],
    cta: { label: 'Read the protocol docs →', url: 'https://developer.algorand.org/docs/get-details/' },
    note: 'No whitepaper required — clear engineering docs throughout'
  },
  algokit: {
    eyebrow: 'BUILD_WITH_ALGOKIT',
    title: 'The Algorand dev toolkit.',
    desc: 'AlgoKit is the official, opinionated toolchain for building on Algorand. It abstracts the boilerplate so you can focus on contract logic, not config.',
    links: [
      { label: 'AlgoKit CLI', desc: 'Scaffold, test, and deploy from your terminal.', tag: 'CLI', url: 'https://developer.algorand.org/docs/get-started/algokit/' },
      { label: 'Python Smart Contracts (Puya)', desc: 'Write ARC4 contracts in idiomatic Python.', tag: 'PYTHON', url: 'https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/puya/' },
      { label: 'TypeScript Client SDK', desc: 'AlgoKit Utils for seamless dApp integration.', tag: 'TYPESCRIPT', url: 'https://developer.algorand.org/docs/sdks/javascript/' },
      { label: 'AlgoKit LocalNet', desc: 'One-command private Algorand network for local dev.', tag: 'DEVENV', url: 'https://developer.algorand.org/docs/get-started/algokit/#localnet' },
      { label: 'Smart Contract Templates', desc: 'Production-ready contract scaffolds for common patterns.', tag: 'TEMPLATES', url: 'https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/init.md' },
      { label: 'Testing with AlgoKit', desc: 'Unit and integration tests for your smart contracts.', tag: 'TESTING', url: 'https://developer.algorand.org/docs/get-details/dapps/smart-contracts/debugging/' },
    ],
    cta: { label: 'Explore AlgoKit →', url: 'https://developer.algorand.org/algokit/' },
    note: 'pip install algokit  ·  algokit init  ·  ship it'
  },
  nodes: {
    eyebrow: 'RUN_A_NODE',
    title: 'Participate in consensus.',
    desc: 'Run an Algorand node to validate transactions, contribute to decentralization, and earn staking rewards through the Algorand consensus protocol.',
    links: [
      { label: 'Node Types Overview', desc: 'Relay, participation, and archival — pick your role.', tag: 'OVERVIEW', url: 'https://developer.algorand.org/docs/run-a-node/setup/types/' },
      { label: 'Install a Node', desc: 'Step-by-step guide to getting a node running on Linux/Mac.', tag: 'SETUP', url: 'https://developer.algorand.org/docs/run-a-node/setup/install/' },
      { label: 'Participation Keys', desc: 'Register online and start participating in consensus.', tag: 'CONSENSUS', url: 'https://developer.algorand.org/docs/run-a-node/participate/' },
      { label: 'Algorand Node UI', desc: 'The official dashboard for monitoring your node health.', tag: 'MONITORING', url: 'https://developer.algorand.org/docs/run-a-node/setup/node-ui/' },
      { label: 'Fast Catchup', desc: 'Sync a new node with the chain in minutes, not days.', tag: 'TIP', url: 'https://developer.algorand.org/docs/run-a-node/setup/install/#sync-node-network-using-fast-catchup' },
      { label: 'Algorand Governance', desc: 'Earn rewards by voting on protocol changes.', tag: 'GOVERNANCE', url: 'https://governance.algorand.foundation/' },
    ],
    cta: { label: 'Set up your node →', url: 'https://developer.algorand.org/docs/run-a-node/setup/install/' },
    note: 'Minimum hardware: 8GB RAM · 100GB SSD · broadband'
  },
  reference: {
    eyebrow: 'REFERENCE_AND_APIS',
    title: 'Every API. Every spec.',
    desc: 'Full SDK reference docs, REST API specs, and ARC standards for building interoperable, production-grade applications on Algorand.',
    links: [
      { label: 'Python SDK Reference', desc: 'py-algorand-sdk full API documentation.', tag: 'PYTHON', url: 'https://py-algorand-sdk.readthedocs.io/' },
      { label: 'JavaScript SDK Reference', desc: 'algosdk-js full API + integrations.', tag: 'JS/TS', url: 'https://algorand.github.io/js-algorand-sdk/' },
      { label: 'Algod REST API', desc: 'Node API for transactions, accounts, and blocks.', tag: 'REST', url: 'https://developer.algorand.org/docs/rest-apis/algod/' },
      { label: 'Indexer REST API', desc: 'Query historical on-chain data at scale.', tag: 'REST', url: 'https://developer.algorand.org/docs/rest-apis/indexer/' },
      { label: 'ARC Standards', desc: 'Algorand Request for Comments — the token and app standards.', tag: 'STANDARDS', url: 'https://arc.algorand.foundation/' },
      { label: 'AVM Opcodes Reference', desc: 'Every AVM opcode with cost, stack effect, and examples.', tag: 'AVM', url: 'https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/' },
    ],
    cta: { label: 'Browse all reference docs →', url: 'https://developer.algorand.org/docs/' },
    note: 'Go SDK, Java SDK, and .NET SDK also available'
  }
};

window.switchContentHub = function(key, btn) {
  document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const panel = document.getElementById('hub-content-panel');
  if (!panel) return;

  const data = contentHubData[key];
  if (!data) return;

  panel.innerHTML = `
    <div class="hub-panel-header">
      <div>
        <div class="hub-panel-eyebrow">// ${data.eyebrow}</div>
        <div class="hub-panel-title">${data.title}</div>
        <div class="hub-panel-desc">${data.desc}</div>
      </div>
    </div>
    <div class="hub-link-grid">
      ${data.links.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener" class="hub-link-card">
          <div class="hub-link-card-label">${link.label}</div>
          <div class="hub-link-card-desc">${link.desc}</div>
          <span class="hub-link-card-tag">${link.tag}</span>
        </a>
      `).join('')}
    </div>
    <div class="hub-cta-row">
      <span class="hub-cta-note">${data.note}</span>
      <a href="${data.cta.url}" target="_blank" rel="noopener" class="btn-primary" style="padding: 14px 28px; font-size: 14px; white-space: nowrap;">${data.cta.label}</a>
    </div>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  window.initSearch();
  window.initDashboard();
  window.initYouTube();
  window.switchPath('web2', document.querySelector('.path-nav-btn'));
  window.startPathwayCycle();
  window.switchHub('ai', document.querySelector('.hub-root-item'));
  window.switchContentHub('start', document.getElementById('tab-start'));

  document.querySelectorAll('.persona-card, .uc-card, .proto-item, .auth-highlight, .pathway-display, .bullet-item, .hub-root-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(el);
  });
});




