const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'PUBLIC', 'supervisor.html');

let html = fs.readFileSync(targetFile, 'utf8');

// The new "Figma/Dribbble" CSS block
const newCss = `  <style>
    /* =========================================
       FIGMA / DRIBBBLE PREMIUM UI DESIGN SYSTEM
       ========================================= */
       
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    :root {
      /* Mobile viewport max width */
      --phone: 500px;
      
      /* Pure & Soft Backgrounds */
      --bg: #F4F7FE; /* Extremely soft pastel blue-grey */
      --bg-gradient: radial-gradient(circle at 15% 50%, rgba(200, 215, 255, 0.4), transparent 50%),
                     radial-gradient(circle at 85% 30%, rgba(255, 230, 240, 0.4), transparent 50%);
      
      --ink: #111827; /* Rich dark grey */
      --ink-light: #374151;
      --muted: #8F9BB3; /* Soft grey for labels */
      
      --card: #FFFFFF;
      --card-blur: blur(20px);
      
      /* Borders exist only for extreme subtlety */
      --line: rgba(0, 0, 0, 0.04); 
      --line-hover: rgba(0, 0, 0, 0.08);
      
      /* Primary Brand - Vibrant Indigo/Purple */
      --accent: #6366F1; /* Indigo */
      --accent-hover: #4F46E5;
      --accent-light: #EEF2FF;
      --accent-glow: rgba(99, 102, 241, 0.35); /* Colored shadow */
      
      --secondary: #8B5CF6; /* Purple gradient pair */
      
      /* Soft Status Colors (Dribbble style: light bg, strong text) */
      --ok: #059669; 
      --ok-bg: #D1FAE5;
      --err: #E11D48; 
      --err-bg: #FFE4E6;
      --warn: #D97706; 
      --warn-bg: #FEF3C7;
      
      /* Buttery Smooth Shadows */
      --shadow-sm: 0 4px 10px rgba(0, 0, 0, 0.03);
      --shadow-base: 0 10px 25px rgba(112, 144, 176, 0.12); /* Soft blue-grey shadow */
      --shadow-float: 0 20px 40px rgba(112, 144, 176, 0.18);
      
      /* Typography & Spacing */
      --fs-xs: 0.75rem; 
      --fs-sm: 0.875rem; 
      --fs-base: 1rem; 
      --fs-lg: 1.125rem; 
      --fs-xl: 1.5rem; 
      
      --tap: 52px; /* Super generous touch targets */
      
      /* Figma squircle border radii */
      --radius-sm: 12px;
      --radius: 18px;
      --radius-lg: 28px; /* Extremely rounded cards */
      --radius-pill: 999px;
    }

    * { box-sizing: border-box; }

    html, body {
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: fixed; 
    }

    body {
      margin: 0;
      background-color: var(--bg);
      background-image: var(--bg-gradient);
      background-size: cover;
      background-attachment: fixed;
      color: var(--ink);
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      font-size: var(--fs-base);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* Scrollable App Views */
    #view-login, #view-app {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 100px; 
    }
    
    ::-webkit-scrollbar { width: 0px; background: transparent; } /* Hidden scrollbar for cleaner look */

    /* Typography */
    a { color: var(--accent); text-decoration: none; font-weight: 600; }
    
    h1, h2, h3 { 
      margin: 0 0 0.5rem 0; 
      font-weight: 800; /* Extra bold */
      letter-spacing: -0.04em; 
      color: var(--ink);
    }
    h1 { font-size: 2.25rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.25rem; }

    .muted { color: var(--muted); font-weight: 500; }
    .ok { color: var(--ok); font-weight: 700; }
    .err { color: var(--err); font-weight: 700; }

    .hidden { display: none !important; }

    /* Layout Shell */
    .shell {
      width: min(100vw, var(--phone));
      margin: 0 auto;
      padding: 16px 24px 40px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* =========================================
       ULTRA-SMOOTH CARDS
       ========================================= */
    .card {
      background: var(--card);
      border: none; /* No borders! Rely on shadow and layout */
      border-radius: var(--radius-lg);
      padding: 28px;
      box-shadow: var(--shadow-base);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
      position: relative;
    }
    
    #login-card {
      margin-top: 15vh;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      box-shadow: var(--shadow-float);
    }

    /* Login Brand Area */
    .brand-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 36px;
      text-align: center;
    }
    .brand-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--accent), var(--secondary));
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 32px;
      box-shadow: 0 12px 24px var(--accent-glow);
    }

    /* =========================================
       SOFT PILLS & BADGES
       ========================================= */
    .pill {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 8px 18px;
      border-radius: var(--radius-pill);
      background: #FFFFFF;
      font-size: var(--fs-sm);
      color: var(--ink-light);
      font-weight: 700;
      box-shadow: var(--shadow-sm);
    }

    /* Deep saturated color tags */
    .color-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border: none;
    }
    .badge-red { background: var(--err-bg); color: var(--err); }
    .badge-blue { background: #E0E7FF; color: #4338CA; }
    .badge-green { background: var(--ok-bg); color: var(--ok); }
    .badge-yellow { background: var(--warn-bg); color: #B45309; }
    .badge-grey { background: #F3F4F6; color: #4B5563; }
    
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      background: #F4F7FE;
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--ink-light);
      cursor: pointer;
      transition: all 0.2s;
    }
    .chip:hover { background: var(--accent-light); color: var(--accent); transform: scale(1.02); }

    /* =========================================
       PLAYFUL, TACTILE BUTTONS
       ========================================= */
    button {
      cursor: pointer;
      border: none;
      background: var(--card);
      color: var(--ink);
      border-radius: var(--radius);
      padding: 0 24px;
      font-size: var(--fs-base);
      font-weight: 700;
      font-family: inherit;
      min-height: var(--tap);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy hover */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(112, 144, 176, 0.15);
    }

    button:active {
      transform: scale(0.95);
    }

    /* The Main Action Button */
    button.primary {
      background: linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%);
      color: #FFFFFF;
      box-shadow: 0 8px 24px var(--accent-glow);
    }

    button.primary:hover {
      box-shadow: 0 12px 32px var(--accent-glow);
      transform: translateY(-3px);
    }

    button.ghost {
      background: transparent;
      box-shadow: none;
      color: var(--muted);
    }
    button.ghost:hover { background: #F4F7FE; color: var(--ink); transform: none; }

    button.secondary {
      background: #F4F7FE;
      color: var(--ink-light);
      box-shadow: none;
    }
    button.secondary:hover { background: #E2E8F0; }

    button.small {
      min-height: 44px;
      padding: 0 20px;
      font-size: var(--fs-sm);
    }

    /* =========================================
       FIGMA-STYLE INPUTS (Floating / Soft)
       ========================================= */
    input, select, textarea {
      width: 100%;
      background: #F4F7FE; /* Filled input style */
      color: var(--ink);
      border: 2px solid transparent;
      border-radius: var(--radius);
      padding: 0 20px;
      font-size: 16px;
      font-weight: 500;
      min-height: 56px; /* Chunky inputs */
      transition: all 0.25s ease;
      font-family: inherit;
    }
    
    input::placeholder, textarea::placeholder {
      color: #A0AEC0;
      font-weight: 400;
    }
    
    input:hover, select:hover, textarea:hover {
      background: #EDF2F7;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      background: #FFFFFF;
      border-color: var(--accent);
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.12); /* Soft colored glow instead of hard ring */
    }

    /* Label Typography */
    label {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--ink-light);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .input-group { position: relative; margin-bottom: 28px; }

    /* =========================================
       TOP FLOATING NAV
       ========================================= */
    .topbar {
      position: sticky;
      top: 16px;
      z-index: 40;
      margin-bottom: 32px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(24px);
      border-radius: var(--radius-lg);
      padding: 18px 24px;
      box-shadow: var(--shadow-float);
    }

    .topbar .line {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
    }

    /* =========================================
       SEGMENTED CONTROL TABS (iOS Look)
       ========================================= */
    .tabs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
      margin-top: 24px;
      background: #F4F7FE;
      padding: 6px;
      border-radius: 20px;
    }

    .tabs button {
      background: transparent;
      box-shadow: none;
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--muted);
      min-height: 44px;
      border-radius: 14px;
    }

    .tabs button:hover { color: var(--ink-light); transform: none; }

    .tabs button.active {
      background: #FFFFFF;
      color: var(--ink);
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }

    /* =========================================
       JOB CARDS (Touchable, Interactive)
       ========================================= */
    .jobs { display: flex; flex-direction: column; gap: 20px; }

    .job {
      border: none;
      border-radius: var(--radius-lg);
      padding: 24px;
      background: #FFFFFF;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      cursor: pointer;
      position: relative;
    }
    
    .job:hover {
      box-shadow: var(--shadow-float);
      transform: translateY(-4px);
    }
    
    /* Soft glowing status indicators */
    .job::after {
      content: '';
      position: absolute;
      top: 24px; right: 24px;
      width: 12px; height: 12px;
      border-radius: 50%;
    }
    .job[data-status="RUNNING"]::after, .job[data-status="RUNNING_NO_DPR"]::after { background: var(--ok); box-shadow: 0 0 12px var(--ok); }
    .job[data-status="PENDING"]::after { background: var(--warn); box-shadow: 0 0 12px var(--warn); }

    /* Layout Helpers */
    .row { display: flex; flex-direction: column; gap: 24px; }
    .inline { display: flex; gap: 16px; align-items: center; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

    .hr { border: none; border-top: 2px dashed #E2E8F0; margin: 32px 0; }

    /* =========================================
       COLOR TABLE
       ========================================= */
    .color-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 12px;
    }

    .color-table th {
      text-align: left;
      font-weight: 800;
      color: var(--muted);
      font-size: 0.70rem;
      padding: 0 16px 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .color-table td {
      padding: 20px 16px;
      background: #FFFFFF;
      box-shadow: var(--shadow-sm);
    }
    
    .color-table td:first-child { border-radius: 20px 0 0 20px; }
    .color-table td:last-child { border-radius: 0 20px 20px 0; }

    .qty-pill {
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--ink);
    }

    /* =========================================
       MODALS (Slide up like sheets)
       ========================================= */
    .modal {
      position: fixed; inset: 0;
      background: rgba(17, 24, 39, 0.4); 
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex; align-items: flex-end; /* Sheets align to bottom on mobile */
      justify-content: center;
      padding: 16px;
      animation: fadeIn 0.3s ease;
    }
    
    @media (min-width: 600px) {
      .modal { align-items: center; } /* Center on larger screens */
    }

    .panel {
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow-y: auto;
      background: #FFFFFF;
      border-radius: 32px;
      padding: 32px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.2);
      animation: slideUpModal 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUpModal { 
      from { opacity: 0; transform: translateY(100px); } 
      to { opacity: 1; transform: translateY(0); } 
    }

    /* Loader */
    .loader-overlay {
      position: fixed; inset: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
    }
    .spinner {
      width: 56px; height: 56px;
      border: 4px solid #E2E8F0;
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    #boot {
      position: fixed; inset: 0;
      background: #FFFFFF;
      z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    #boot.done { opacity: 0; visibility: hidden; }
  </style>`;

const startIndex = html.indexOf('<style>');
const endIndex = html.indexOf('</style>') + '</style>'.length;

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + newCss + html.substring(endIndex);
    fs.writeFileSync(targetFile, html, 'utf8');
    console.log('Figma/Dribbble CSS inserted successfully.');
} else {
    console.error('Could not find existing <style> block.');
}
