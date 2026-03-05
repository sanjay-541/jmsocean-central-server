const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'PUBLIC', 'supervisor.html');

let html = fs.readFileSync(targetFile, 'utf8');

// The new "Hyper-Modern" CSS block (Inspired by Linear / Apple UI / Premium SaaS)
const newCss = `  <style>
    /* =========================================
       HYPER-MODERN UI - LINEAR / APPLE DESIGN SYSTEM
       ========================================= */
       
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    :root {
      /* Mobile viewport max width */
      --phone: 500px;
      
      /* Premium Light Theme */
      --bg: #FAFBFF; /* Ultra soft blue-tinted white */
      --bg-gradient: radial-gradient(circle at 50% -20%, #e2e8f0 0%, #FAFBFF 50%);
      
      --ink: #0F172A; /* Slate 900 */
      --muted: #64748B; /* Slate 500 */
      
      --card: #FFFFFF;
      --card-blur: blur(24px);
      
      --line: rgba(0, 0, 0, 0.06); /* Nearly invisible, crisp lines */
      --line-hover: rgba(0, 0, 0, 0.12);
      
      /* Vibrant Accents */
      --accent: #4F46E5; /* Indigo 600 */
      --accent-hover: #4338CA; /* Indigo 700 */
      --accent-glow: rgba(79, 70, 229, 0.25);
      
      --secondary: #3B82F6; /* Blue 500 */
      
      /* Status Colors (Rich & Vibrant) */
      --ok: #10B981; 
      --ok-bg: #D1FAE5;
      --err: #EF4444; 
      --err-bg: #FEE2E2;
      --warn: #F59E0B; 
      --warn-bg: #FEF3C7;
      
      /* Hyper-Modern Shadows */
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05);
      --shadow-hover: 0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04);
      --shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.02);
      
      /* Typography & Spacing */
      --fs-xs: 0.75rem; /* 12px */
      --fs-sm: 0.875rem; /* 14px */
      --fs-base: 0.95rem; /* ~15px */
      --fs-lg: 1.125rem; /* 18px */
      --fs-xl: 1.5rem; /* 24px */
      
      --tap: 50px; /* Generous touch targets */
      
      /* Border Radii - Squircle look */
      --radius-sm: 10px;
      --radius: 16px;
      --radius-lg: 24px;
      --radius-pill: 9999px;
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
      background: var(--bg);
      background-image: var(--bg-gradient);
      background-attachment: fixed;
      color: var(--ink);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: var(--fs-base);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    /* Scrollable App Views */
    #view-login, #view-app {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 80px; 
    }
    
    /* Elegant Scrollbar */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

    /* Highlights & Error States */
    .input-error {
      border-color: var(--err) !important;
      background-color: #FFF5F5 !important;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
      animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
      10%, 90% { transform: translateX(-2px); }
      20%, 80% { transform: translateX(2px); }
      30%, 50%, 70% { transform: translateX(-4px); }
      40%, 60% { transform: translateX(4px); }
    }

    /* Typography */
    a { color: var(--accent); text-decoration: none; font-weight: 500; transition: color 0.2s; }
    a:hover { color: var(--accent-hover); }

    h1, h2, h3 { 
      margin: 0 0 0.75rem 0; 
      font-weight: 700; 
      letter-spacing: -0.03em; 
      color: var(--ink);
    }
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; letter-spacing: -0.02em; }
    h3 { font-size: 1.125rem; }

    .muted { color: var(--muted); }
    .ok { color: var(--ok); font-weight: 600; }
    .err { color: var(--err); font-weight: 600; }
    .warn { color: var(--warn); font-weight: 600; }
    .hidden { display: none !important; }

    /* Layout Shell */
    .shell {
      width: min(100vw, var(--phone));
      margin: 0 auto;
      padding: 16px 20px 40px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* =========================================
       PREMIUM CARDS (Apple-like Surface)
       ========================================= */
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-base);
      transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card::after {
       /* Subtle inner highlight to make it pop like glass */
       content: '';
       position: absolute;
       inset: 0;
       border-radius: inherit;
       pointer-events: none;
       box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
    }
    
    /* Login Card Specific */
    #login-card {
      margin-top: 12vh;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(40px);
      box-shadow: var(--shadow-modal);
      border: 1px solid rgba(255,255,255,0.5);
    }
    
    /* JPSMS Logo/Brand area */
    .brand-area {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }
    .brand-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--accent), var(--secondary));
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      box-shadow: 0 8px 16px var(--accent-glow);
    }

    /* =========================================
       BADGES & PILLS
       ========================================= */
    .pill {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      padding: 6px 16px;
      border: 1px solid var(--line);
      border-radius: var(--radius-pill);
      background: #FFFFFF;
      font-size: var(--fs-sm);
      color: var(--ink);
      font-weight: 600;
      box-shadow: var(--shadow-sm);
    }

    .tag {
      display: inline-flex;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      background: #F8FAFC;
      border: 1px solid var(--line);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* Dynamic Color Badges (Soft Backgrounds, Bold Text) */
    .color-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    .badge-red { background: var(--err-bg); color: #B91C1C; }
    .badge-blue { background: #DBEAFE; color: #1D4ED8; }
    .badge-green { background: var(--ok-bg); color: #047857; }
    .badge-yellow { background: var(--warn-bg); color: #B45309; }
    .badge-grey { background: #F1F5F9; color: #475569; }
    
    /* Action chips */
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      background: #F8FAFC;
      border: 1px solid var(--line);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: var(--fs-sm);
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--ink);
      transition: all 0.2s;
    }
    .chip:hover { border-color: var(--accent); background: #EEF2FF; }

    /* =========================================
       HYPER-MODERN BUTTONS
       ========================================= */
    button {
      cursor: pointer;
      border: 1px solid var(--line);
      background: #FFFFFF;
      color: var(--ink);
      border-radius: var(--radius);
      padding: 0 24px;
      font-size: var(--fs-base);
      font-weight: 600;
      font-family: inherit;
      min-height: var(--tap);
      box-shadow: var(--shadow-sm);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      user-select: none;
      white-space: nowrap;
    }

    button:hover {
      background: #F8FAFC;
      box-shadow: var(--shadow-base);
    }

    button:active {
      transform: scale(0.97);
    }

    button.primary {
      background: linear-gradient(180deg, var(--accent) 0%, var(--accent-hover) 100%);
      color: #FFFFFF;
      border: 1px solid rgba(0,0,0,0.1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px var(--accent-glow);
    }

    button.primary:hover {
      background: linear-gradient(180deg, var(--accent-hover) 0%, #3730A3 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px var(--accent-glow);
      transform: translateY(-1px);
    }
    
    button.primary:active {
      transform: translateY(1px) scale(0.97);
    }

    button.ghost {
      background: transparent;
      border-color: transparent;
      color: var(--muted);
      box-shadow: none;
    }
    
    button.ghost:hover {
      background: rgba(0,0,0,0.04);
      color: var(--ink);
    }

    button.secondary {
      background: #F1F5F9;
      border-color: transparent;
      box-shadow: none;
    }
    button.secondary:hover { background: #E2E8F0; }

    button.small {
      padding: 0 16px;
      font-size: var(--fs-sm);
      min-height: 40px;
      border-radius: var(--radius-sm);
    }

    button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
      transform: none !important;
      box-shadow: none !important;
      background: #F1F5F9 !important;
      color: #94A3B8 !important;
      border-color: var(--line) !important;
    }

    /* =========================================
       INPUTS & FORMS (Focus Rings!)
       ========================================= */
    input, select, textarea {
      width: 100%;
      background: #F8FAFC;
      color: var(--ink);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: 0 16px;
      font-size: 16px; /* Prevents iOS auto-zoom */
      min-height: var(--tap);
      transition: all 0.25s ease;
      font-family: inherit;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
    }
    
    input:hover, select:hover, textarea:hover {
      background: #F1F5F9;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      background: #FFFFFF;
      border-color: var(--accent);
      box-shadow: inset 0 0 0 1px var(--accent), 0 0 0 4px var(--accent-glow);
    }

    textarea {
      padding-top: 12px;
      padding-bottom: 12px;
      resize: vertical;
      min-height: 100px;
    }

    input[type="number"], .short {
      font-variant-numeric: tabular-nums;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--ink);
    }

    /* Floating Labels for Login */
    .input-group {
      position: relative;
      margin-bottom: 24px;
    }
    .input-group label {
      margin-bottom: 0;
    }

    /* =========================================
       TOP FLOATING NAV (Sticky & Glossy)
       ========================================= */
    .topbar {
      position: sticky;
      top: 12px;
      z-index: 40;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-bottom-color: var(--line);
      border-radius: var(--radius-lg);
      padding: 16px 20px;
      box-shadow: var(--shadow-sm);
    }

    .topbar .line {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
    }

    /* =========================================
       SEGMENTED CONTROL TABS (iOS Pro Style)
       ========================================= */
    .tabs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-top: 20px;
      background: rgba(241, 245, 249, 0.8);
      backdrop-filter: blur(10px);
      padding: 6px;
      border-radius: var(--radius);
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
    }

    .tabs button {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 10px 4px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--muted);
      min-height: 38px;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tabs button:hover {
      color: var(--ink);
    }

    .tabs button.active {
      background: #FFFFFF;
      color: var(--ink);
      box-shadow: 0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
    }

    /* =========================================
       JOB CARDS (Actionable & Distinct)
       ========================================= */
    .jobs {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .job {
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 20px;
      background: #FFFFFF;
      box-shadow: var(--shadow-sm);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .job:hover {
      border-color: var(--line-hover);
      box-shadow: var(--shadow-hover);
      transform: translateY(-2px);
    }
    
    /* Vibrant Status Indicators */
    .job::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0; width: 6px;
      background: var(--line);
      transition: background 0.3s;
    }
    
    .job[data-status="RUNNING"]::before, 
    .job[data-status="RUNNING_NO_DPR"]::before { background: var(--ok); }
    
    .job[data-status="PENDING"]::before { background: var(--warn); }

    .no-jobs {
      padding: 40px 20px;
      border: 2px dashed var(--line);
      border-radius: var(--radius-lg);
      color: var(--muted);
      background: #F8FAFC;
      text-align: center;
      font-weight: 600;
      font-size: var(--fs-lg);
    }

    /* Layout Primitives */
    .row { display: flex; flex-direction: column; gap: 20px; }
    .inline { display: flex; gap: 12px; align-items: center; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

    @media (max-width:400px) {
      .grid-3 { grid-template-columns: 1fr; }
    }

    .hr {
      border: none;
      border-top: 1px solid var(--line);
      margin: 28px 0;
    }

    /* =========================================
       DPR FORM SETUP (Beautiful Grouping)
       ========================================= */
    .stdwrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .std-card {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 20px;
      background: #F8FAFC;
      transition: background 0.3s;
    }
    .std-card:hover {
      background: #F1F5F9;
    }

    .std-pair {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      align-items: end;
    }

    .std-pair > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    /* Standard Fields (Readonly visual) */
    .std-pair > div:nth-child(1) input {
      background: #E2E8F0;
      border-color: transparent;
      color: #475569;
      pointer-events: none;
      box-shadow: none;
    }

    .std-pair small {
      display: block;
      color: var(--muted);
      font-weight: 700;
      font-size: 0.70rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* =========================================
       COLOUR TABLE (Polished SaaS Grid)
       ========================================= */
    .color-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px;
    }

    .color-table th {
      text-align: left;
      font-weight: 700;
      color: var(--muted);
      font-size: 0.75rem;
      padding: 0 16px 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .color-table td {
      padding: 16px;
      background: #FFFFFF;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }
    
    .color-table td:first-child { border-left: 1px solid var(--line); border-radius: 16px 0 0 16px; }
    .color-table td:last-child { border-right: 1px solid var(--line); border-radius: 0 16px 16px 0; }

    .qty-pill {
      font-family: monospace;
      font-weight: 700;
      font-size: 1rem;
      background: #F8FAFC;
      padding: 4px 8px;
      border-radius: 6px;
      color: var(--ink);
    }

    /* =========================================
       MODALS & OVERLAYS (Floating Dialogs)
       ========================================= */
    .modal {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.4); /* Darker backdrop for focus */
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 100;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn 0.3s ease;
    }

    .panel {
      width: 100%;
      max-width: 440px;
      max-height: 90vh;
      overflow-y: auto;
      background: #FFFFFF;
      border-radius: 28px;
      padding: 32px;
      box-shadow: var(--shadow-modal);
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { 
      from { opacity: 0; transform: translateY(40px) scale(0.96); } 
      to { opacity: 1; transform: translateY(0) scale(1); } 
    }

    /* Loading Overlay (Minimalist Spinner) */
    .loader-overlay {
      position: fixed; inset: 0;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
    }
    .spinner {
      width: 48px; height: 48px;
      border: 4px solid var(--line);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Boot Splash (Sleek fade) */
    #boot {
      position: fixed; inset: 0;
      background: var(--bg);
      z-index: 10000;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    #boot.done { opacity: 0; visibility: hidden; }
  </style>`;

// Escape logic for literal replacement
const startIndex = html.indexOf('<style>');
const endIndex = html.indexOf('</style>') + '</style>'.length;

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + newCss + html.substring(endIndex);
    fs.writeFileSync(targetFile, html, 'utf8');
    console.log('Hyper-Modern CSS inserted successfully.');
} else {
    console.error('Could not find existing <style> block.');
}
