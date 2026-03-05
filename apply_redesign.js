const fs = require('fs');
const path = require('path');

const file = path.join('c:', 'JMS', 'BACKEND', 'PUBLIC', 'supervisor.html');
let html = fs.readFileSync(file, 'utf8');

const newCSS = `  <style>
    :root {
      /* Mobile viewport max width */
      --phone: 480px;
      
      /* Premium Slate & Electric Blue Theme */
      --bg: #f8fafc; /* Slate 50 */
      --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      --ink: #0f172a; /* Slate 900 */
      --muted: #64748b; /* Slate 500 */
      
      --card: rgba(255, 255, 255, 0.95);
      --card-blur: blur(12px);
      
      --line: #e2e8f0; /* Slate 200 */
      
      /* Primary Brand Colors */
      --accent: #3b82f6; /* Blue 500 */
      --accent-hover: #2563eb; /* Blue 600 */
      --accent-ink: #1e3a8a; /* Blue 900 */
      --pill: #eff6ff; /* Blue 50 */
      
      /* Status Colors */
      --ok: #10b981; /* Emerald 500 */
      --ok-bg: #ecfdf5; /* Emerald 50 */
      --err: #ef4444; /* Red 500 */
      --err-bg: #fef2f2; /* Red 50 */
      --warn: #f59e0b; /* Amber 500 */
      --warn-bg: #fffbeb; /* Amber 50 */
      
      /* Elevated Shadows */
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.025);
      --shadow-float: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      
      /* Typography & Spacing */
      --fs-xs: 12px;
      --fs-sm: 14px;
      --fs-base: 15px;
      --fs-lg: 18px;
      --tap: 48px; /* Minimum Apple Human Interface touch target size */
      
      /* Border Radii for "Bubble/App" look */
      --radius-sm: 8px;
      --radius: 16px;
      --radius-lg: 24px;
    }

    * { box-sizing: border-box; }

    html, body {
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: fixed; /* Lock viewport */
    }

    body {
      margin: 0;
      background: var(--bg-gradient);
      color: var(--ink);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: var(--fs-base);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    /* Scrollable App Views */
    #view-login, #view-app {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 60px; /* Safe area padding */
    }
    
    /* Scrollbar Polish */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

    /* Highlights & Error States */
    .input-error {
      border: 2px solid var(--err) !important;
      background: var(--err-bg) !important;
      animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    /* Typography Overrides */
    a { color: var(--accent); text-decoration: none; transition: color 0.2s; }
    a:hover { color: var(--accent-hover); }

    h1, h2, h3 { margin: 6px 0 16px; font-weight: 700; letter-spacing: -0.02em; }
    h2 { font-size: 20px; color: var(--ink); }
    h3 { font-size: 16px; color: var(--ink); }

    .muted { color: var(--muted); }
    .ok { color: var(--ok); font-weight: 600; }
    .err { color: var(--err); font-weight: 600; }
    .warn { color: var(--warn); font-weight: 600; }
    .hidden { display: none !important; }

    /* Layout Shell */
    .shell {
      width: min(100vw, var(--phone));
      margin: 0 auto;
      padding: 16px 16px 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* =========================================
       GLASSMORPHIC CARDS
       ========================================= */
    .card {
      background: var(--card);
      backdrop-filter: var(--card-blur);
      -webkit-backdrop-filter: var(--card-blur);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: var(--shadow);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    /* Login specific styling */
    #login-card {
      margin-top: 10vh;
      box-shadow: var(--shadow-float);
    }

    /* =========================================
       PILLS & BADGES
       ========================================= */
    .pill {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 6px 14px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #ffffff;
      font-size: var(--fs-sm);
      color: var(--ink);
      font-weight: 600;
      box-shadow: var(--shadow-sm);
    }

    .tag {
      display: inline-flex;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--pill);
      border: 1px solid #dbeafe;
      font-size: 12px;
      font-weight: 600;
      color: var(--accent-ink);
    }

    /* =========================================
       PREMIUM BUTTONS
       ========================================= */
    button {
      cursor: pointer;
      border: 1px solid var(--line);
      background: #ffffff;
      color: var(--ink);
      border-radius: var(--radius);
      padding: 12px 20px;
      font-size: 16px;
      font-weight: 600;
      min-height: var(--tap);
      box-shadow: var(--shadow-sm);
      touch-action: manipulation;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    button:active {
      transform: scale(0.96);
    }

    button.primary {
      background: var(--accent);
      color: #fff;
      border: none;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    button.primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
      transform: translateY(-1px);
    }
    
    button.primary:active {
      transform: scale(0.96);
    }

    button.ghost {
      background: #f1f5f9;
      border-color: transparent;
      color: #334155;
      box-shadow: none;
    }
    
    button.ghost:hover {
      background: #e2e8f0;
    }

    button.small {
      padding: 8px 14px;
      font-size: 14px;
      min-height: 40px;
      border-radius: var(--radius-sm);
    }

    button[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
      transform: none !important;
      box-shadow: none !important;
    }

    /* =========================================
       INPUTS & FORMS
       ========================================= */
    input, select, textarea {
      width: 100%;
      background: #ffffff;
      color: var(--ink);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: 14px 16px;
      font-size: 16px; /* Prevents iOS auto-zoom */
      min-height: var(--tap);
      transition: all 0.2s;
      font-family: inherit;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    input[type="number"], .short {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-main);
    }

    /* =========================================
       TOP FLOATING NAV (Sticky)
       ========================================= */
    .topbar {
      position: sticky;
      top: 0;
      z-index: 40;
      margin-bottom: 8px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-bottom-color: var(--line);
      border-radius: var(--radius-lg);
      padding: 16px;
      box-shadow: var(--shadow);
    }

    .topbar .line {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
    }

    /* =========================================
       SEGMENTED CONTROL TABS (iOS Style)
       ========================================= */
    .tabs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
      margin-top: 16px;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 12px;
    }

    .tabs button {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 8px 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--muted);
      min-height: 36px;
      border-radius: 8px;
    }

    .tabs button.active {
      background: #ffffff;
      color: var(--ink);
      box-shadow: var(--shadow-sm);
    }

    /* =========================================
       JOB CARDS (Queue)
       ========================================= */
    .jobs {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .job {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 16px;
      background: #ffffff;
      box-shadow: var(--shadow-sm);
      position: relative;
      overflow: hidden;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    
    .job:hover {
      border-color: #cbd5e1;
      box-shadow: var(--shadow);
    }
    
    /* Subtle accent line for "active" feeling */
    .job::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0; width: 4px;
      background: var(--line);
      border-radius: 4px 0 0 4px;
    }
    
    .job[data-status="RUNNING"]::before, .job[data-status="RUNNING_NO_DPR"]::before { background: var(--ok); }
    .job[data-status="PENDING"]::before { background: var(--warn); }

    .no-jobs {
      padding: 24px 16px;
      border: 2px dashed var(--line);
      border-radius: var(--radius);
      color: var(--muted);
      background: transparent;
      text-align: center;
      font-weight: 500;
    }

    /* Layout Primitives */
    .row { display: flex; flex-direction: column; gap: 16px; }
    .inline { display: flex; gap: 12px; align-items: center; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }

    @media (max-width:380px) {
      .grid-3 { grid-template-columns: 1fr; }
    }

    .hr {
      border: none;
      border-top: 1px solid var(--line);
      margin: 20px 0;
    }

    /* =========================================
       DPR ONE-TIME SETUP SPECIFIC UI
       ========================================= */
    .stdwrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .std-card {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 16px;
      background: #fafaf9;
    }

    .std-pair {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      align-items: end;
    }

    .std-pair > div {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    /* Left is Disabled (STD) */
    .std-pair > div:nth-child(1) input {
      background: #e2e8f0;
      border-color: #cbd5e1;
      color: #64748b;
    }

    .std-pair small {
      display: block;
      color: var(--muted);
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* =========================================
       COLOUR TABLE (Redesigned)
       ========================================= */
    .color-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 8px;
    }

    .color-table th {
      text-align: left;
      font-weight: 600;
      color: var(--muted);
      font-size: 13px;
      padding: 0 12px 4px;
      text-transform: uppercase;
    }

    .color-table td {
      padding: 14px 12px;
      background: #ffffff;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }
    
    .color-table td:first-child { border-left: 1px solid var(--line); border-radius: 12px 0 0 12px; }
    .color-table td:last-child { border-right: 1px solid var(--line); border-radius: 0 12px 12px 0; }

    .color-row {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .color-row:active {
      transform: scale(0.98);
    }

    .color-row.selected td {
      background-color: var(--pill);
      border-color: #bfdbfe;
    }
    
    .color-badge {
      display: inline-block;
      min-width: 16px;
      padding: 4px 12px;
      border-radius: 999px;
      background: #ffffff;
      border: 1px solid var(--line);
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    }

    /* =========================================
       DYNAMIC BADGE SYSTEM (Polished)
       ========================================= */
    .badge-red { background: #fee2e2; color: #991b1b; border-color: #fca5a5; }
    .badge-blue { background: #dbeafe; color: #1e40af; border-color: #93c5fd; }
    .badge-green { background: #dcfce7; color: #166534; border-color: #86efac; }
    .badge-yellow { background: #fef9c3; color: #854d0e; border-color: #fde047; }
    .badge-black { background: #1e293b; color: #f8fafc; border-color: #0f172a; }
    .badge-white { background: #ffffff; color: #334155; border-color: #cbd5e1; }
    .badge-grey { background: #f1f5f9; color: #475569; border-color: #cbd5e1; }
    .badge-orange { background: #ffedd5; color: #9a3412; border-color: #fdba74; }
    .badge-purple { background: #f3e8ff; color: #6b21a8; border-color: #d8b4fe; }

    /* =========================================
       GLOBAL OVERLAYS & MODALS
       ========================================= */
    .modal {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.4);
      z-index: 100;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      padding: 16px;
      animation: fadeIn 0.15s ease-out;
    }
    
    /* Standard Panel Base Class (For any scrollable overlay window) */
    .panel {
      width: 100%;
      max-width: var(--phone);
      max-height: 90vh;
      overflow-y: auto;
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-float);
      animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes modalSlideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* =========================================
       BOOT & LOADING OVERLAY
       ========================================= */
    #boot {
      position: fixed; inset: 0;
      display: flex; align-items: center; justify-content: center;
      background: var(--bg-gradient);
      z-index: 999;
      transition: opacity 0.3s ease;
    }

    #boot.done { opacity: 0; pointer-events: none; }

    #loading-overlay {
      position: fixed; inset: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      z-index: 900;
      animation: fadeIn 0.1s;
    }

    .loading-box {
      background: rgba(255,255,255,0.9);
      border-radius: var(--radius);
      padding: 24px 32px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--line);
      min-width: 240px;
      text-align: center;
    }

    .loading-label {
      font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 16px;
    }

    .loading-bar {
      width: 100%; height: 6px; border-radius: 999px; background: #e2e8f0; overflow: hidden; position: relative;
    }

    .loading-bar-inner {
      position: absolute; top: 0; left: 0; height: 100%; width: 40%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent), #60a5fa);
      animation: loadingSlide 1.2s infinite ease-in-out;
    }

    @keyframes loadingSlide {
      0% { left: -40%; }
      50% { left: 40%; width: 60%; }
      100% { left: 100%; width: 10%; }
    }
  </style>`;

// Replace existing style block
const regex = /<style>[\s\S]*?<\/style>/i;
const updatedHtml = html.replace(regex, newCSS);

// Make sure that topbar gets updated with new HTML semantics if needed, but we keep the logic intact.

fs.writeFileSync(file, updatedHtml, 'utf8');
console.log("CSS Overhauled successfully.");
