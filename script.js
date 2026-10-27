/**
 * Shivam Gupta - Professional Portfolio JavaScript Engine
 * Senior MIS & Operations Analyst | JavaScript, Apps Script & Automation Specialist
 * Features:
 * - Theme Toggle (Dark/Light)
 * - Navigation & Mobile Drawer
 * - Filterable Skills Directory (including Automation & Scripting)
 * - Enterprise Workflow Automation Runners & Code Viewers (GAS, VBA, JS, Python)
 * - Interactive Power BI MIS Dashboard Suite with Real-time Search & Client-Side CSV/JSON Exporters
 * - PostgreSQL Parameter Data Manager: Dynamic threshold persistence, SQL simulation & audit triggers
 * - Embedded AI MIS Intelligence Assistant with Live Operational Audits & Prompts
 * - Contact Form via EmailJS & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initActiveNavHighlight();
  initSkillsFilter();
  initAutomationSection();
  initMISShowcaseWidget();
  initPostgresParameterManager();
  initContactForm();
  initResumeModal();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlDoc = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlDoc.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlDoc.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlDoc.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme`);
    });
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. ACTIVE NAV LINK HIGHLIGHT VIA INTERSECTION OBSERVER
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. SKILLS FILTER DIRECTORY
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. WORKFLOW AUTOMATION & SCRIPTING PROJECTS ENGINE
   ========================================================================== */
function initAutomationSection() {
  // Tab Switching inside project cards
  const tabBtns = document.querySelectorAll('.auto-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentCard = btn.closest('.automation-card');
      if (!parentCard) return;

      const cardTabBtns = parentCard.querySelectorAll('.auto-tab-btn');
      cardTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      const cardPanes = parentCard.querySelectorAll('.auto-tab-pane');
      cardPanes.forEach(pane => pane.classList.remove('active'));

      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Source Code Copy Buttons
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const codeEl = document.getElementById(targetId);
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.innerText).then(() => {
          showToast('Source code copied to clipboard!');
          const origHtml = btn.innerHTML;
          btn.innerHTML = `<svg style="width:13px;height:13px;"><use href="#icon-check"></use></svg> Copied!`;
          setTimeout(() => {
            btn.innerHTML = origHtml;
          }, 2000);
        }).catch(() => {
          showToast('Code copied to clipboard!');
        });
      }
    });
  });

  // 1. Google Apps Script Trigger Simulator
  const runGasBtn = document.getElementById('runGasTriggerBtn');
  const gasTerminal = document.getElementById('gasTerminalOutput');
  if (runGasBtn && gasTerminal) {
    runGasBtn.addEventListener('click', () => {
      runGasBtn.disabled = true;
      gasTerminal.innerHTML = '<div class="term-line cmd">[TRIGGER FIRED] Invoking onDailyConsolidate() via Cloud Time-Driven Scheduler...</div>';

      const logs = [
        { text: "[07:00:01] Authenticating Google Drive Service Account... [STATUS: 200 OK]", cls: "info", delay: 400 },
        { text: "[07:00:02] Querying target folder '1aBcD_BRANCH_SHEETS_FOLDER_ID' for MimeType.GOOGLE_SHEETS...", cls: "info", delay: 900 },
        { text: "[07:00:03] Discovered 12 Branch Spreadsheets (Mumbai, Delhi, Bangalore, Pune, Chennai, Kolkata...)", cls: "success", delay: 1400 },
        { text: "[07:00:04] Ingesting & validating 8,420 rows across all branch sheets... Normalizing columns.", cls: "cmd", delay: 2000 },
        { text: "[07:00:05] Appending verified dataset into Master MIS Sheet 'Consolidated_Master' (Row offset: 42,910)...", cls: "info", delay: 2600 },
        { text: "[07:00:06] Compiling Executive PDF Report with embedded attendance charts (842 KB Blob created)...", cls: "cmd", delay: 3200 },
        { text: "[07:00:07] GmailApp.sendEmail() -> Dispatched to management@company.com & ops-head@company.com", cls: "success", delay: 3800 },
        { text: "[07:00:08] [SUCCESS] Job completed in 8.24s with 0 errors. All 12 branches synchronized.", cls: "success", delay: 4300 }
      ];

      logs.forEach(log => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = `term-line ${log.cls}`;
          line.textContent = log.text;
          gasTerminal.appendChild(line);
          gasTerminal.scrollTop = gasTerminal.scrollHeight;
        }, log.delay);
      });

      setTimeout(() => {
        runGasBtn.disabled = false;
        showToast("Apps Script simulation: 12 branch sheets merged & PDF emailed!");
      }, 4500);
    });
  }

  // 2. High-Speed VBA Macro Simulator
  const runVbaBtn = document.getElementById('runVbaMacroBtn');
  const vbaRowsProcessed = document.getElementById('vbaRowsProcessed');
  const vbaTimerDisplay = document.getElementById('vbaTimerDisplay');
  const vbaProgressFill = document.getElementById('vbaProgressFill');
  const vbaMatchedCount = document.getElementById('vbaMatchedCount');
  const vbaExceptionsCount = document.getElementById('vbaExceptionsCount');
  const vbaSpeedVal = document.getElementById('vbaSpeedVal');
  const vbaAuditBadge = document.getElementById('vbaAuditBadge');
  const vbaSimStatus = document.getElementById('vbaSimStatus');

  if (runVbaBtn) {
    runVbaBtn.addEventListener('click', () => {
      runVbaBtn.disabled = true;
      if (vbaSimStatus) vbaSimStatus.textContent = "Status: Executing in-memory hash reconciliation...";
      if (vbaAuditBadge) {
        vbaAuditBadge.textContent = "PROCESSING";
        vbaAuditBadge.className = "val yellow";
      }

      let currentRows = 0;
      const targetRows = 52480;
      const durationMs = 2000;
      const startTime = performance.now();

      const interval = setInterval(() => {
        const elapsedMs = performance.now() - startTime;
        const progress = Math.min(1, elapsedMs / durationMs);

        currentRows = Math.floor(progress * targetRows);
        const elapsedSec = (progress * 11.24).toFixed(2);

        if (vbaRowsProcessed) vbaRowsProcessed.textContent = currentRows.toLocaleString();
        if (vbaTimerDisplay) vbaTimerDisplay.textContent = `${elapsedSec}s`;
        if (vbaProgressFill) vbaProgressFill.style.width = `${progress * 100}%`;

        if (progress >= 1) {
          clearInterval(interval);
          if (vbaRowsProcessed) vbaRowsProcessed.textContent = "52,480";
          if (vbaTimerDisplay) vbaTimerDisplay.textContent = "11.24s";
          if (vbaMatchedCount) vbaMatchedCount.textContent = "52,392 (99.8%)";
          if (vbaExceptionsCount) vbaExceptionsCount.textContent = "88 Rows";
          if (vbaSpeedVal) vbaSpeedVal.textContent = "4,670 rows/s";
          if (vbaAuditBadge) {
            vbaAuditBadge.textContent = "PASSED AUDIT";
            vbaAuditBadge.className = "val green";
          }
          if (vbaSimStatus) vbaSimStatus.textContent = "Status: Reconciliation Complete (Discrepancy Journal Ready)";
          runVbaBtn.disabled = false;
          showToast("VBA Macro complete: 52,480 rows reconciled in 11.24s!");
        }
      }, 35);
    });
  }

  // 3. JavaScript Web Macro Simulator
  const runJsBtn = document.getElementById('runJsMacroBtn');
  const jsTerminal = document.getElementById('jsTerminalOutput');
  if (runJsBtn && jsTerminal) {
    runJsBtn.addEventListener('click', () => {
      runJsBtn.disabled = true;
      jsTerminal.innerHTML = '<div class="term-line cmd">[MACRO INJECTED] Tampermonkey Userscript active on carrier-portal.internal/*</div>';

      const logs = [
        { text: "[00:00:01] Initializing MutationObserver on document.body... Watching for dynamic table renders.", cls: "info", delay: 400 },
        { text: "[00:00:02] Target table.dispatch-grid detected! Extracting consignment tracking rows...", cls: "cmd", delay: 850 },
        { text: "[00:00:03] Harvested 48 consignment rows: 34 DELIVERED, 12 IN-TRANSIT, 2 REATTEMPT.", cls: "success", delay: 1400 },
        { text: "[00:00:04] Auto-filling 5 pending dispatch confirmation slips with timestamp signatures...", cls: "info", delay: 2000 },
        { text: "[00:00:05] POST https://api.shivam-mis.internal/v1/sync-dispatch (Payload: 48 items, 14.2 KB)...", cls: "cmd", delay: 2600 },
        { text: "[00:00:06] HTTP 200 OK — PostgreSQL dispatch_log table updated with 0 manual intervention.", cls: "success", delay: 3200 }
      ];

      logs.forEach(log => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = `term-line ${log.cls}`;
          line.textContent = log.text;
          jsTerminal.appendChild(line);
          jsTerminal.scrollTop = jsTerminal.scrollHeight;
        }, log.delay);
      });

      setTimeout(() => {
        runJsBtn.disabled = false;
        showToast("Web Macro executed: DOM harvested & database synchronized!");
      }, 3500);
    });
  }

  // 4. Python ETL & AI Pipeline Simulator
  const runPyBtn = document.getElementById('runPyEtlBtn');
  const pyTerminal = document.getElementById('pyTerminalOutput');
  if (runPyBtn && pyTerminal) {
    runPyBtn.addEventListener('click', () => {
      runPyBtn.disabled = true;
      pyTerminal.innerHTML = '<div class="term-line cmd">$ python3 run_mis_pipeline.py --mode=audit --ai-summary=true</div>';

      const logs = [
        { text: "[10:00:01] Ingesting CSV datasets: hr_daily.csv (1,240 rows), sales_daily.csv (4,810 rows), store_inv.csv...", cls: "info", delay: 400 },
        { text: "[10:00:02] Pandas vectorized cleaning: Imputing nulls, parsing ISO dates, calculating ratios (0.19s)...", cls: "cmd", delay: 900 },
        { text: "[10:00:03] Computing statistical Z-scores across employee attendance and store inventory scrap rates...", cls: "info", delay: 1400 },
        { text: "[10:00:04] [ALERT] 2 Statistical Outliers flagged (Z > 2.0): Factory Line Delta Wastage & Ramesh Attendance.", cls: "warn", delay: 2000 },
        { text: "[10:00:05] Calling Google Gemini Generative AI API (gemini-1.5-flash) for executive narrative...", cls: "cmd", delay: 2600 },
        { text: "[10:00:06] [AI EXECUTIVE BRIEFING] Workforce attendance solid at 96.4%. Sales conversion exceeding quota at 40.4%. Immediate reorder recommended for 35 store inventory units.", cls: "success", delay: 3200 },
        { text: "[10:00:07] Process completed in 2.31s. Excel summary report exported with audit trail.", cls: "success", delay: 3700 }
      ];

      logs.forEach(log => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = `term-line ${log.cls}`;
          line.textContent = log.text;
          pyTerminal.appendChild(line);
          pyTerminal.scrollTop = pyTerminal.scrollHeight;
        }, log.delay);
      });

      setTimeout(() => {
        runPyBtn.disabled = false;
        showToast("Python ETL & AI Anomaly Pipeline finished in 2.31s!");
      }, 4000);
    });
  }
}

/* ==========================================================================
   6. POWER BI MIS DASHBOARD SUITE & AI ASSISTANT
   ========================================================================== */
function initMISShowcaseWidget() {
  const deptSelect = document.getElementById('pbiDeptSelect');
  const deptTabs = document.querySelectorAll('.pbi-dept-tab');
  const timeBtns = document.querySelectorAll('.time-btn');
  const kpiRow = document.getElementById('pbiKpiRow');
  const chartTitle = document.getElementById('pbiChartTitle');
  const barChartGrid = document.getElementById('barChartGrid');
  const tableTitle = document.getElementById('pbiTableTitle');
  const tableHead = document.getElementById('pbiTableHead');
  const tableBody = document.getElementById('pbiTableBody');
  const tableSearchInput = document.getElementById('tableSearchInput');
  const searchMatchCount = document.getElementById('searchMatchCount');
  const tableRowCount = document.getElementById('tableRowCount');
  const exportCsvBtn = document.getElementById('pbiExportCsvBtn');
  const exportJsonBtn = document.getElementById('pbiExportJsonBtn');
  const runAiAuditBtn = document.getElementById('runAiAuditBtn');
  const aiSummaryText = document.getElementById('aiSummaryText');
  const aiChips = document.querySelectorAll('.ai-chip');

  if (!deptSelect || !kpiRow) return;

  const pbiDepartmentData = {
    hr: {
      name: "HR Analytics (HRA)",
      kpis: [
        { title: "Total Staff Managed", val: "5 Employees", trend: "100% On-Boarded", trendClass: "positive" },
        { title: "Avg Attendance Rate", val: "96.4%", trend: "↑ +2.1% MoM Improvement", trendClass: "positive" },
        { title: "Overtime Logged", val: "42.5 Hours", trend: "Within Monthly Cap", trendClass: "neutral" },
        { title: "Attrition Risk Index", val: "4.2% (Low)", trend: "✓ Retention Benchmark Met", trendClass: "positive" }
      ],
      chartTitle: "HRA: Employee Attendance Rate (%) & Performance Rating",
      chartData: [
        { name: "ANKIT", val: 98.2, label: "98.2% Att. | Rating: 98.5" },
        { name: "Soni", val: 97.8, label: "97.8% Att. | Rating: 97.0" },
        { name: "Rahul", val: 96.0, label: "96.0% Att. | Rating: 94.0" },
        { name: "Ajay", val: 95.6, label: "95.6% Att. | Rating: 93.8" },
        { name: "Ramesh", val: 94.5, label: "94.5% Att. | Rating: 91.2" }
      ],
      tableTitle: "HRA: Staff Attendance, Overtime & Retention Audit Table",
      tableHeaders: ["Employee Name", "Attendance %", "Overtime (Hrs)", "Leaves Taken", "Performance Rating", "Attrition Risk Status"],
      tableRows: [
        ["<strong>ANKIT</strong>", "98.2%", "12.5 Hrs", "0 Days", '<span class="acc-pill high">98.5 (Outstanding)</span>', '<span class="status-tag pass">VERY LOW RISK</span>'],
        ["<strong>Soni</strong>", "97.8%", "10.0 Hrs", "0 Days", '<span class="acc-pill high">97.0 (Outstanding)</span>', '<span class="status-tag pass">VERY LOW RISK</span>'],
        ["<strong>Rahul</strong>", "96.0%", "8.5 Hrs", "1 Day", '<span class="acc-pill high">94.0 (Excellent)</span>', '<span class="status-tag pass">LOW RISK</span>'],
        ["<strong>Ajay</strong>", "95.6%", "6.0 Hrs", "1 Day", '<span class="acc-pill high">93.8 (Excellent)</span>', '<span class="status-tag pass">LOW RISK</span>'],
        ["<strong>Ramesh</strong>", "94.5%", "5.5 Hrs", "1 Day", '<span class="acc-pill medium">91.2 (Good)</span>', '<span class="status-tag review">MONITOR ATTENDANCE</span>']
      ],
      aiNarrative: "<strong>HRA Summary:</strong> Department operational stability is exceptional with an average attendance of 96.4%. <strong>ANKIT</strong> and <strong>Soni</strong> lead key performance benchmarks with zero leaves taken and outstanding delivery scores. Ramesh exhibits a slight variance in late marks; an automated Google Apps Script reminder is configured to trigger notifications if attendance dips below 93%."
    },
    sales: {
      name: "Sales Operations & Funnel",
      kpis: [
        { title: "Total Leads Created", val: "450 Leads", trend: "↑ +18% Pipeline Growth", trendClass: "positive" },
        { title: "Leads Successfully Closed", val: "182 Deals", trend: "40.4% Conversion Rate", trendClass: "positive" },
        { title: "B2B Meetings Conducted", val: "94 Meetings", trend: "Retail Outlets Visited", trendClass: "neutral" },
        { title: "Pipeline Deal Velocity", val: "₹48.2 Lakhs", trend: "Target Exceeded by 14%", trendClass: "positive" }
      ],
      chartTitle: "Sales Department: Deals Closed vs Quota Benchmark",
      chartData: [
        { name: "Ravi", val: 48, max: 50, label: "48 Deals (96% Target)" },
        { name: "Kisan", val: 42, max: 50, label: "42 Deals (84% Target)" },
        { name: "Sahil", val: 36, max: 50, label: "36 Deals (72% Target)" },
        { name: "Kartik", val: 30, max: 50, label: "30 Deals (60% Target)" },
        { name: "Kiran", val: 26, max: 50, label: "26 Deals (52% Target)" }
      ],
      tableTitle: "Sales Department: Executive Conversion & Deal Yield Table",
      tableHeaders: ["Sales Executive", "Leads Generated", "Meetings Held", "Deals Closed", "Conversion Rate %", "Performance Grade"],
      tableRows: [
        ["<strong>Ravi</strong>", "110", "24", "48", "43.6%", '<span class="acc-pill high">Outstanding</span>'],
        ["<strong>Kisan</strong>", "98", "20", "42", "42.8%", '<span class="acc-pill high">Outstanding</span>'],
        ["<strong>Sahil</strong>", "85", "18", "36", "42.3%", '<span class="acc-pill high">Excellent</span>'],
        ["<strong>Kartik</strong>", "80", "16", "30", "37.5%", '<span class="acc-pill medium">Good</span>'],
        ["<strong>Kiran</strong>", "77", "16", "26", "33.7%", '<span class="acc-pill medium">Needs Boost</span>']
      ],
      aiNarrative: "<strong>Sales Diagnosis:</strong> Pipeline yield is strong at a 40.4% conversion rate. <strong>Ravi</strong> and <strong>Kisan</strong> have driven 49.4% of total closures. Predictive forecasting models suggest shifting 15 high-intent retail leads to Kiran to optimize cross-territory quotas before month-end."
    },
    inventory: {
      name: "Store Inventory & Assets",
      kpis: [
        { title: "Total Store Assets", val: "480 Units", trend: "Across 24 Hardware Types", trendClass: "neutral" },
        { title: "Active / In-Use Assets", val: "410 Units", trend: "85.4% High Utilization", trendClass: "positive" },
        { title: "Damaged / Under Repair", val: "35 Units", trend: "Dispatched to Vendor", trendClass: "neutral" },
        { title: "Critical Reorder Triggers", val: "35 Units", trend: "⚠️ Stock Under Safety Cap", trendClass: "neutral" }
      ],
      chartTitle: "Store Inventory: Active Units in Operation by Category",
      chartData: [
        { name: "Keyboards & Mouse", val: 120, max: 130, label: "120 Units (92.3% Active)" },
        { name: "Networking Switches", val: 95, max: 110, label: "95 Units (86.3% Active)" },
        { name: "Desktop PCs", val: 88, max: 100, label: "88 Units (88.0% Active)" },
        { name: "Toolkits & Safety", val: 62, max: 70, label: "62 Units (88.5% Active)" },
        { name: "Barcode Scanners", val: 45, max: 60, label: "45 Units (75.0% Active)" }
      ],
      tableTitle: "Store Inventory: Hardware Asset Tracking & Stock Audit Table",
      tableHeaders: ["Asset Item Name", "Category", "Total Units", "Active In-Use", "Under Repair", "Inventory Status"],
      tableRows: [
        ["<strong>Desktop PCs & Monitors</strong>", "IT Hardware", "95", "88", "7", '<span class="excel-badge match">Good / Active</span>'],
        ["<strong>Keyboards & Optical Mouse</strong>", "Peripherals", "130", "120", "10", '<span class="excel-badge match">Good / Active</span>'],
        ["<strong>Barcode Scanners & Handhelds</strong>", "Logistics Hardware", "52", "45", "7", '<span class="excel-badge warn">Repair Logged</span>'],
        ["<strong>Networking Cables & Switches</strong>", "IT Infrastructure", "110", "95", "15", '<span class="excel-badge warn">Reorder Triggered</span>'],
        ["<strong>Maintenance Toolkits & Safety</strong>", "Warehouse Ops", "70", "62", "8", '<span class="excel-badge match">Good / Active</span>'],
        ["<strong>Digital Multimeters & Testers</strong>", "Factory Tools", "23", "20", "3", '<span class="excel-badge match">Good / Active</span>']
      ],
      aiNarrative: "<strong>Inventory Insights:</strong> Overall asset utilization is optimal at 85.4%. <strong>Critical Alert:</strong> Networking switches and barcode scanner stock has fallen below the 15-unit safety buffer. An automated VBA purchase requisition macro has drafted order slips for managerial sign-off."
    }
  };

  function updateDashboard() {
    const selectedDept = deptSelect.value || 'hr';
    const activeTimeBtn = document.querySelector('.time-btn.active');
    const activeTimeframe = activeTimeBtn ? activeTimeBtn.getAttribute('data-time') : 'daily';
    const deptObj = pbiDepartmentData[selectedDept] || pbiDepartmentData.hr;

    // 1. Render KPIs
    kpiRow.innerHTML = '';
    deptObj.kpis.forEach(kpi => {
      let displayVal = kpi.val;
      const rawNum = parseInt(kpi.val.replace(/,/g, ''), 10);
      if (!isNaN(rawNum) && kpi.val.includes('Orders')) {
        if (activeTimeframe === 'daily') {
          displayVal = `${Math.round(rawNum / 22)} / Day`;
        } else if (activeTimeframe === 'weekly') {
          displayVal = `${Math.round(rawNum / 4)} / Wk`;
        } else if (activeTimeframe === 'qtd') {
          displayVal = `${(rawNum * 3).toLocaleString()} QTD`;
        } else {
          displayVal = `${rawNum.toLocaleString()} Total`;
        }
      }

      const card = document.createElement('div');
      card.className = 'kpi-card';
      card.innerHTML = `
        <span class="kpi-title">${kpi.title}</span>
        <span class="kpi-value">${displayVal}</span>
        <span class="kpi-trend ${kpi.trendClass}">${kpi.trend}</span>
      `;
      kpiRow.appendChild(card);
    });

    // 2. Render Animated Visual Chart
    chartTitle.textContent = `${deptObj.chartTitle} (${activeTimeframe.toUpperCase()})`;
    barChartGrid.innerHTML = '';

    deptObj.chartData.forEach(item => {
      const group = document.createElement('div');
      group.className = 'chart-bar-group';

      let barHeightPct = 0;
      if (item.max) {
        barHeightPct = Math.min(100, Math.max(25, (item.val / item.max) * 100));
      } else {
        barHeightPct = Math.max(30, (item.val - 90) * 9 + 20);
      }

      group.innerHTML = `
        <div class="bar-wrapper">
          <div class="bar-fill" style="height: 0%;" data-tooltip="${item.label}"></div>
        </div>
        <span class="bar-label">${item.name}</span>
      `;

      barChartGrid.appendChild(group);

      setTimeout(() => {
        const fill = group.querySelector('.bar-fill');
        if (fill) fill.style.height = `${barHeightPct}%`;
      }, 100);
    });

    // 3. Render Table with live search filter
    renderTable(deptObj, activeTimeframe);

    // 4. Update AI Assistant Narrative
    if (aiSummaryText) {
      aiSummaryText.innerHTML = deptObj.aiNarrative;
    }
  }

  function renderTable(deptObj, timeframe) {
    tableTitle.textContent = `${deptObj.tableTitle} (${timeframe.toUpperCase()})`;

    let trHead = '<tr>';
    deptObj.tableHeaders.forEach(th => {
      trHead += `<th>${th}</th>`;
    });
    trHead += '</tr>';
    tableHead.innerHTML = trHead;

    const searchTerm = (tableSearchInput ? tableSearchInput.value : '').toLowerCase().trim();
    let matchCount = 0;
    let trBody = '';

    deptObj.tableRows.forEach(row => {
      const rowPlainText = row.map(cell => cell.replace(/<[^>]*>/g, '')).join(' ').toLowerCase();
      if (!searchTerm || rowPlainText.includes(searchTerm)) {
        matchCount++;
        trBody += '<tr>';
        row.forEach(td => {
          trBody += `<td>${td}</td>`;
        });
        trBody += '</tr>';
      }
    });

    if (matchCount === 0) {
      trBody = `<tr><td colspan="${deptObj.tableHeaders.length}" style="text-align:center;padding:2rem;color:var(--text-muted);">No records found matching "${searchTerm}". Try a different search term.</td></tr>`;
    }

    tableBody.innerHTML = trBody;

    if (searchMatchCount) searchMatchCount.textContent = `${matchCount} Records`;
    if (tableRowCount) tableRowCount.textContent = `Showing ${matchCount} of ${deptObj.tableRows.length} Records`;
  }

  // Department Tab Switching
  deptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deptTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const deptKey = tab.getAttribute('data-dept');
      if (deptSelect) deptSelect.value = deptKey;

      if (tableSearchInput) tableSearchInput.value = '';
      updateDashboard();
      showToast(`Loaded ${pbiDepartmentData[deptKey].name} Power BI Dashboard`);
    });
  });

  // Timeframe Buttons
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDashboard();
    });
  });

  // Table Real-Time Search Filter
  if (tableSearchInput) {
    tableSearchInput.addEventListener('input', () => {
      const selectedDept = deptSelect.value || 'hr';
      const activeTimeBtn = document.querySelector('.time-btn.active');
      const activeTimeframe = activeTimeBtn ? activeTimeBtn.getAttribute('data-time') : 'daily';
      renderTable(pbiDepartmentData[selectedDept] || pbiDepartmentData.hr, activeTimeframe);
    });
  }

  // AI Operational Audit Button
  if (runAiAuditBtn) {
    runAiAuditBtn.addEventListener('click', () => {
      const selectedDept = deptSelect.value || 'hr';
      const deptObj = pbiDepartmentData[selectedDept] || pbiDepartmentData.hr;

      runAiAuditBtn.disabled = true;
      aiSummaryText.innerHTML = `<span style="color:var(--accent-cyan);"><svg style="width:14px;height:14px;vertical-align:middle;animation:spin 1s linear infinite;"><use href="#icon-refresh"></use></svg> Scanning operational metrics and calculating statistical Z-score anomalies...</span>`;

      setTimeout(() => {
        let auditReport = "";
        if (selectedDept === 'hr') {
          auditReport = `<strong>✨ AI Operational Audit: HRA (HR Analytics)</strong><br>
          • <strong>Workforce Stability:</strong> 96.4% attendance rate exceeds operational SLA by +2.1%.<br>
          • <strong>Anomaly Flag:</strong> Ramesh had 1 late mark and 1 day off; overall performance grade remains in target (91.2%).<br>
          • <strong>Retention Recommendation:</strong> Low overall attrition risk. Automated Google Apps Script scheduled to send weekly positive reinforcement badge to Ankit & Soni.`;
        } else if (selectedDept === 'sales') {
          auditReport = `<strong>✨ AI Operational Audit: Sales Department</strong><br>
          • <strong>Conversion Velocity:</strong> 40.4% conversion rate across 450 leads exceeds quarterly targets by 14%.<br>
          • <strong>Pipeline Bottleneck:</strong> Top 2 reps account for 49.4% of total deal closures.<br>
          • <strong>Action Step:</strong> Deploy automated lead-routing macro to balance incoming B2B enterprise inquiries across mid-tier executives.`;
        } else if (selectedDept === 'inventory') {
          auditReport = `<strong>✨ AI Operational Audit: Store Inventory & Hardware</strong><br>
          • <strong>Asset Utilization:</strong> 85.4% active hardware allocation (410 active units / 480 total).<br>
          • <strong>Critical Reorder Alert:</strong> 15 networking switches & 7 handheld scanners require supplier dispatch.<br>
          • <strong>Action Step:</strong> Excel VBA macro generated purchase requisition PO-2026-088 ready for manager verification.`;
        } else if (selectedDept === 'orders') {
          auditReport = `<strong>✨ AI Operational Audit: Orders Fulfillment</strong><br>
          • <strong>Fulfillment Rate:</strong> 84.0% same-day SLA pass rate (840 orders completed).<br>
          • <strong>Backlog Health:</strong> 110 queue orders are progressing normally within scheduled turnaround cap.<br>
          • <strong>Action Step:</strong> No operational bottleneck detected. System operating at 99.8% stability.`;
        } else {
          auditReport = `<strong>✨ AI Operational Audit: Factory Production</strong><br>
          • <strong>Line Yield:</strong> 94.6% output completion across 840 batches.<br>
          • <strong>Wastage Reduction:</strong> Material waste has declined to 1.8% (saving ~₹1.4L monthly).<br>
          • <strong>Action Step:</strong> Preventive maintenance cycle scheduled on Line Delta to maintain calibration.`;
        }

        aiSummaryText.innerHTML = auditReport;
        runAiAuditBtn.disabled = false;
        showToast(`AI Operational Audit completed for ${deptObj.name}`);
      }, 900);
    });
  }

  // AI Prompt Chips
  aiChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptType = chip.getAttribute('data-prompt');
      let promptMsg = "";

      if (promptType === 'attrition') {
        promptMsg = "<strong>AI Prompt Diagnostic (Retention & Attrition):</strong> All 5 monitored department resources maintain a low attrition risk index (< 5.0%). Ramesh demonstrates slight attendance dips following weekend shifts; recommended shift balancing.";
      } else if (promptType === 'sales-forecast') {
        promptMsg = "<strong>AI Prompt Diagnostic (Sales Forecast):</strong> Based on current pipeline velocity (40.4% closure), month-end closed deals are projected at 215 units, generating an estimated revenue yield of ₹54.8 Lakhs.";
      } else if (promptType === 'inventory-reorder') {
        promptMsg = "<strong>AI Prompt Diagnostic (Inventory Reorders):</strong> Stock reorder threshold has been breached for Networking Switches (15 units) and Scanners (7 units). Automated replenishment PO generated.";
      } else if (promptType === 'overtime') {
        promptMsg = "<strong>AI Prompt Diagnostic (Overtime & SLA):</strong> Total department overtime logged is 42.5 hours, safely within corporate compliance budgets. No signs of staff burnout detected.";
      }

      aiSummaryText.innerHTML = promptMsg;
      showToast(`AI generated findings for "${chip.textContent}"`);
    });
  });

  // Export to CSV Functionality
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const selectedDept = deptSelect.value || 'hr';
      const activeTimeBtn = document.querySelector('.time-btn.active');
      const activeTimeframe = activeTimeBtn ? activeTimeBtn.getAttribute('data-time') : 'daily';
      const deptObj = pbiDepartmentData[selectedDept] || pbiDepartmentData.hr;

      let csv = deptObj.tableHeaders.join(",") + "\n";
      deptObj.tableRows.forEach(row => {
        const cleanRow = row.map(cell => `"${cell.replace(/<[^>]*>/g, '').trim()}"`);
        csv += cleanRow.join(",") + "\n";
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Shivam_MIS_${selectedDept}_${activeTimeframe}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${deptObj.name} dataset to CSV!`);
    });
  }

  // Export to JSON Functionality
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const selectedDept = deptSelect.value || 'hr';
      const deptObj = pbiDepartmentData[selectedDept] || pbiDepartmentData.hr;

      const exportData = {
        department: deptObj.name,
        exportedAt: new Date().toISOString(),
        kpis: deptObj.kpis,
        chartData: deptObj.chartData,
        tableRecords: deptObj.tableRows.map(row => {
          const obj = {};
          deptObj.tableHeaders.forEach((header, idx) => {
            obj[header] = row[idx].replace(/<[^>]*>/g, '').trim();
          });
          return obj;
        })
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Shivam_MIS_${selectedDept}_dataset.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${deptObj.name} dataset as JSON!`);
    });
  }

  // Expose dashboard state for PostgreSQL parameter updates
  window.pbiDepartmentData = pbiDepartmentData;
  window.pbiUpdateDashboard = updateDashboard;
  window.applyPostgresParameters = applyPostgresParameters;

  // Initial load: Apply saved PostgreSQL parameters
  const storedParams = getStoredPgParams();
  applyPostgresParameters(storedParams, pbiDepartmentData);
  updateDashboard();
}

/* ==========================================================================
   7. POSTGRESQL PARAMETER DATA & CONFIGURATION ENGINE
   ========================================================================== */
const DEFAULT_PG_PARAMS = {
  hr_attendance_threshold: 95.0,
  hr_overtime_cap: 10.0,
  sales_target_conversion: 40.0,
  sales_quota_benchmark: 45,
  inventory_reorder_safety: 15,
  inventory_utilization_target: 85.0
};

function getStoredPgParams() {
  try {
    const raw = localStorage.getItem('mis_pg_parameters');
    if (raw) return { ...DEFAULT_PG_PARAMS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading PostgreSQL parameters:', e);
  }
  return { ...DEFAULT_PG_PARAMS };
}

function applyPostgresParameters(params, dataObj) {
  if (!dataObj) return;

  const hrThresh = parseFloat(params.hr_attendance_threshold) || 95.0;
  const hrOtCap = parseFloat(params.hr_overtime_cap) || 10.0;
  const salesTarget = parseFloat(params.sales_target_conversion) || 40.0;
  const salesQuota = parseInt(params.sales_quota_benchmark, 10) || 45;
  const invBuffer = parseInt(params.inventory_reorder_safety, 10) || 15;
  const invTarget = parseFloat(params.inventory_utilization_target) || 85.0;

  // 1. Update HRA Dataset
  if (dataObj.hr) {
    dataObj.hr.chartData = [
      { name: "ANKIT", val: 98.2, label: `98.2% Att. | Target: ${hrThresh}%` },
      { name: "Soni", val: 97.8, label: `97.8% Att. | Target: ${hrThresh}%` },
      { name: "Rahul", val: 96.0, label: `96.0% Att. | Target: ${hrThresh}%` },
      { name: "Ajay", val: 95.6, label: `95.6% Att. | Target: ${hrThresh}%` },
      { name: "Ramesh", val: 94.5, label: `94.5% Att. | Target: ${hrThresh}%` }
    ];

    const staffList = [
      { name: "ANKIT", att: 98.2, ot: 12.5, leaves: "0 Days", rating: "98.5 (Outstanding)" },
      { name: "Soni", att: 97.8, ot: 10.0, leaves: "0 Days", rating: "97.0 (Outstanding)" },
      { name: "Rahul", att: 96.0, ot: 8.5, leaves: "1 Day", rating: "94.0 (Excellent)" },
      { name: "Ajay", att: 95.6, ot: 6.0, leaves: "1 Day", rating: "93.8 (Excellent)" },
      { name: "Ramesh", att: 94.5, ot: 5.5, leaves: "1 Day", rating: "91.2 (Good)" }
    ];

    let outlierCount = 0;
    dataObj.hr.tableRows = staffList.map(st => {
      const isUnder = st.att < hrThresh;
      if (isUnder) outlierCount++;
      const isOvertime = st.ot > hrOtCap;

      const riskPill = isUnder
        ? `<span class="status-tag review">OUTLIER (&lt; ${hrThresh}%)</span>`
        : `<span class="status-tag pass">BENCHMARK MET</span>`;

      const otDisplay = isOvertime
        ? `<span class="acc-pill warn">${st.ot} Hrs (Over Cap)</span>`
        : `${st.ot} Hrs`;

      return [
        `<strong>${st.name}</strong>`,
        `${st.att}%`,
        otDisplay,
        st.leaves,
        `<span class="acc-pill high">${st.rating}</span>`,
        riskPill
      ];
    });

    dataObj.hr.aiNarrative = `<strong>HRA Summary (PostgreSQL Parameter Evaluated):</strong> Active attendance threshold is set at <strong>${hrThresh}%</strong> in PostgreSQL (<code>public.mis_config_parameters</code>). ${outlierCount > 0 ? `<strong>${outlierCount} staff member(s)</strong> flagged below threshold for operational audit.` : 'All staff meet or exceed the active attendance threshold.'} Overtime limit calibrated at <strong>${hrOtCap} hrs/week</strong>.`;
  }

  // 2. Update Sales Dataset
  if (dataObj.sales) {
    const salesReps = [
      { name: "Ravi", leads: 110, meets: 24, closed: 48, rate: 43.6 },
      { name: "Kisan", leads: 98, meets: 20, closed: 42, rate: 42.8 },
      { name: "Sahil", leads: 85, meets: 18, closed: 36, rate: 42.3 },
      { name: "Kartik", leads: 80, meets: 16, closed: 30, rate: 37.5 },
      { name: "Kiran", leads: 77, meets: 16, closed: 26, rate: 33.7 }
    ];

    dataObj.sales.chartData = salesReps.map(rep => ({
      name: rep.name,
      val: rep.closed,
      max: salesQuota,
      label: `${rep.closed} Deals (${Math.round((rep.closed / salesQuota) * 100)}% of Quota: ${salesQuota})`
    }));

    dataObj.sales.tableRows = salesReps.map(rep => {
      const meets = rep.rate >= salesTarget;
      const grade = meets
        ? `<span class="acc-pill high">Met Target (&gt;= ${salesTarget}%)</span>`
        : `<span class="acc-pill medium">Under Target (&lt; ${salesTarget}%)</span>`;

      return [
        `<strong>${rep.name}</strong>`,
        `${rep.leads}`,
        `${rep.meets}`,
        `${rep.closed}`,
        `${rep.rate}%`,
        grade
      ];
    });

    dataObj.sales.kpis[1] = {
      title: "Leads Successfully Closed",
      val: "182 Deals",
      trend: `${salesTarget}% PostgreSQL Benchmark Target`,
      trendClass: "positive"
    };

    dataObj.sales.aiNarrative = `<strong>Sales Diagnosis (PostgreSQL Parameter Evaluated):</strong> Benchmark quota is <strong>${salesQuota} deals</strong> and conversion target is <strong>${salesTarget}%</strong> per PostgreSQL configuration table. Reps exceeding SLA receive automated pipeline credit tags.`;
  }

  // 3. Update Store Inventory Dataset
  if (dataObj.inventory) {
    const invItems = [
      { name: "Desktop PCs & Monitors", cat: "IT Hardware", total: 95, active: 88, repair: 7, buffer: 20 },
      { name: "Keyboards & Optical Mouse", cat: "Peripherals", total: 130, active: 120, repair: 10, buffer: 25 },
      { name: "Barcode Scanners & Handhelds", cat: "Logistics Hardware", total: 52, active: 45, repair: 7, buffer: 12 },
      { name: "Networking Cables & Switches", cat: "IT Infrastructure", total: 110, active: 95, repair: 15, buffer: 18 },
      { name: "Maintenance Toolkits & Safety", cat: "Warehouse Ops", total: 70, active: 62, repair: 8, buffer: 10 },
      { name: "Digital Multimeters & Testers", cat: "Factory Tools", total: 23, active: 20, repair: 3, buffer: 5 }
    ];

    dataObj.inventory.tableRows = invItems.map(item => {
      const isReorder = item.repair <= invBuffer && (item.total - item.active) >= invBuffer;
      const statusBadge = isReorder
        ? `<span class="excel-badge warn">Reorder Triggered (&lt;= ${invBuffer})</span>`
        : `<span class="excel-badge match">Good / Active</span>`;

      return [
        `<strong>${item.name}</strong>`,
        item.cat,
        `${item.total}`,
        `${item.active}`,
        `${item.repair}`,
        statusBadge
      ];
    });

    dataObj.inventory.kpis[3] = {
      title: "Critical Reorder Buffer",
      val: `${invBuffer} Units Buffer`,
      trend: `⚠️ Trigger SLA Configured in PostgreSQL`,
      trendClass: "neutral"
    };

    dataObj.inventory.aiNarrative = `<strong>Inventory Insights (PostgreSQL Parameter Evaluated):</strong> Safety stock threshold is locked at <strong>${invBuffer} units</strong> and utilization target at <strong>${invTarget}%</strong> via PostgreSQL. Reorder POs are automatically drafted when stock nears safety limits.`;
  }
}

function initPostgresParameterManager() {
  const panel = document.getElementById('pbiPgParamPanel');
  const toggleBtn = document.getElementById('pbiPgParamBtn');
  const closeBtn = document.getElementById('pbiPgParamCloseBtn');
  const saveBtn = document.getElementById('savePgParamsBtn');
  const resetBtn = document.getElementById('resetPgParamsBtn');
  const consoleOutput = document.getElementById('pgConsoleOutput');

  // Sliders and badges
  const rangeHrAtt = document.getElementById('pgParamHrAttendance');
  const valHrAtt = document.getElementById('pgValHrAttendance');
  const rangeHrOt = document.getElementById('pgParamHrOvertime');
  const valHrOt = document.getElementById('pgValHrOvertime');

  const rangeSalesConv = document.getElementById('pgParamSalesConversion');
  const valSalesConv = document.getElementById('pgValSalesConversion');
  const rangeSalesBm = document.getElementById('pgParamSalesBenchmark');
  const valSalesBm = document.getElementById('pgValSalesBenchmark');

  const rangeInvBuf = document.getElementById('pgParamInvBuffer');
  const valInvBuf = document.getElementById('pgValInvBuffer');
  const rangeInvUtil = document.getElementById('pgParamInvUtilization');
  const valInvUtil = document.getElementById('pgValInvUtilization');

  // Sync inputs with stored params
  const currentParams = getStoredPgParams();
  if (rangeHrAtt) { rangeHrAtt.value = currentParams.hr_attendance_threshold; valHrAtt.textContent = `${parseFloat(currentParams.hr_attendance_threshold).toFixed(1)}%`; }
  if (rangeHrOt) { rangeHrOt.value = currentParams.hr_overtime_cap; valHrOt.textContent = `${parseFloat(currentParams.hr_overtime_cap).toFixed(1)} Hrs`; }
  if (rangeSalesConv) { rangeSalesConv.value = currentParams.sales_target_conversion; valSalesConv.textContent = `${parseFloat(currentParams.sales_target_conversion).toFixed(1)}%`; }
  if (rangeSalesBm) { rangeSalesBm.value = currentParams.sales_quota_benchmark; valSalesBm.textContent = `${currentParams.sales_quota_benchmark} Deals`; }
  if (rangeInvBuf) { rangeInvBuf.value = currentParams.inventory_reorder_safety; valInvBuf.textContent = `${currentParams.inventory_reorder_safety} Units`; }
  if (rangeInvUtil) { rangeInvUtil.value = currentParams.inventory_utilization_target; valInvUtil.textContent = `${parseFloat(currentParams.inventory_utilization_target).toFixed(1)}%`; }

  // Slider change listeners for live badge updates
  if (rangeHrAtt) rangeHrAtt.addEventListener('input', () => { valHrAtt.textContent = `${parseFloat(rangeHrAtt.value).toFixed(1)}%`; });
  if (rangeHrOt) rangeHrOt.addEventListener('input', () => { valHrOt.textContent = `${parseFloat(rangeHrOt.value).toFixed(1)} Hrs`; });
  if (rangeSalesConv) rangeSalesConv.addEventListener('input', () => { valSalesConv.textContent = `${parseFloat(rangeSalesConv.value).toFixed(1)}%`; });
  if (rangeSalesBm) rangeSalesBm.addEventListener('input', () => { valSalesBm.textContent = `${rangeSalesBm.value} Deals`; });
  if (rangeInvBuf) rangeInvBuf.addEventListener('input', () => { valInvBuf.textContent = `${rangeInvBuf.value} Units`; });
  if (rangeInvUtil) rangeInvUtil.addEventListener('input', () => { valInvUtil.textContent = `${parseFloat(rangeInvUtil.value).toFixed(1)}%`; });

  // Toggle Panel Open/Close
  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('active');
      toggleBtn.classList.toggle('active', isOpen);
      if (isOpen) {
        showToast("Opened PostgreSQL Parameter Data Manager");
      }
    });
  }

  if (closeBtn && panel) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('active');
      if (toggleBtn) toggleBtn.classList.remove('active');
    });
  }

  // Switch between Interactive and Schema tabs
  const tabBtns = panel ? panel.querySelectorAll('.pg-tab-btn') : [];
  const tabInteractive = document.getElementById('pgTabInteractive');
  const tabSchema = document.getElementById('pgTabSchema');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-pg-tab');
      if (targetTab === 'params-interactive') {
        if (tabInteractive) tabInteractive.style.display = 'block';
        if (tabSchema) tabSchema.style.display = 'none';
      } else {
        if (tabInteractive) tabInteractive.style.display = 'none';
        if (tabSchema) tabSchema.style.display = 'block';
      }
    });
  });

  // Save to PostgreSQL
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveBtn.disabled = true;
      const nowTime = new Date().toTimeString().split(' ')[0];

      const newParams = {
        hr_attendance_threshold: parseFloat(rangeHrAtt ? rangeHrAtt.value : 95.0),
        hr_overtime_cap: parseFloat(rangeHrOt ? rangeHrOt.value : 10.0),
        sales_target_conversion: parseFloat(rangeSalesConv ? rangeSalesConv.value : 40.0),
        sales_quota_benchmark: parseInt(rangeSalesBm ? rangeSalesBm.value : 45, 10),
        inventory_reorder_safety: parseInt(rangeInvBuf ? rangeInvBuf.value : 15, 10),
        inventory_utilization_target: parseFloat(rangeInvUtil ? rangeInvUtil.value : 85.0)
      };

      if (consoleOutput) {
        consoleOutput.innerHTML = `
          <div class="term-line success"><strong>[${nowTime}] BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;</strong></div>
          <div class="term-line code">> UPDATE public.mis_config_parameters SET param_value = '${newParams.hr_attendance_threshold}', updated_at = NOW() WHERE param_key = 'ATTENDANCE_ANOMALY_THRESHOLD';</div>
          <div class="term-line code">> UPDATE public.mis_config_parameters SET param_value = '${newParams.hr_overtime_cap}', updated_at = NOW() WHERE param_key = 'MAX_OVERTIME_CAP';</div>
          <div class="term-line code">> UPDATE public.mis_config_parameters SET param_value = '${newParams.sales_target_conversion}', updated_at = NOW() WHERE param_key = 'SALES_TARGET_CONVERSION';</div>
          <div class="term-line code">> UPDATE public.mis_config_parameters SET param_value = '${newParams.sales_quota_benchmark}', updated_at = NOW() WHERE param_key = 'MONTHLY_QUOTA_BENCHMARK';</div>
          <div class="term-line code">> UPDATE public.mis_config_parameters SET param_value = '${newParams.inventory_reorder_safety}', updated_at = NOW() WHERE param_key = 'SAFETY_STOCK_BUFFER';</div>
          <div class="term-line code">> UPDATE public.mis_config_parameters SET param_value = '${newParams.inventory_utilization_target}', updated_at = NOW() WHERE param_key = 'ASSET_UTILIZATION_TARGET';</div>
          <div class="term-line info">> TRIGGER trg_save_parameter_audit() FIRED: 6 rows appended to public.mis_parameter_audit_log</div>
          <div class="term-line success"><strong>[${nowTime}] COMMIT; Query OK, 6 rows affected (Execution time: 14.2 ms)</strong></div>
        `;
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
      }

      localStorage.setItem('mis_pg_parameters', JSON.stringify(newParams));

      if (window.applyPostgresParameters && window.pbiDepartmentData) {
        window.applyPostgresParameters(newParams, window.pbiDepartmentData);
      }
      if (window.pbiUpdateDashboard) {
        window.pbiUpdateDashboard();
      }

      setTimeout(() => {
        saveBtn.disabled = false;
        showToast("Saved 6 operational parameters to PostgreSQL!");
      }, 400);
    });
  }

  // Reset to Defaults
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const nowTime = new Date().toTimeString().split(' ')[0];

      if (rangeHrAtt) { rangeHrAtt.value = DEFAULT_PG_PARAMS.hr_attendance_threshold; valHrAtt.textContent = `${DEFAULT_PG_PARAMS.hr_attendance_threshold.toFixed(1)}%`; }
      if (rangeHrOt) { rangeHrOt.value = DEFAULT_PG_PARAMS.hr_overtime_cap; valHrOt.textContent = `${DEFAULT_PG_PARAMS.hr_overtime_cap.toFixed(1)} Hrs`; }
      if (rangeSalesConv) { rangeSalesConv.value = DEFAULT_PG_PARAMS.sales_target_conversion; valSalesConv.textContent = `${DEFAULT_PG_PARAMS.sales_target_conversion.toFixed(1)}%`; }
      if (rangeSalesBm) { rangeSalesBm.value = DEFAULT_PG_PARAMS.sales_quota_benchmark; valSalesBm.textContent = `${DEFAULT_PG_PARAMS.sales_quota_benchmark} Deals`; }
      if (rangeInvBuf) { rangeInvBuf.value = DEFAULT_PG_PARAMS.inventory_reorder_safety; valInvBuf.textContent = `${DEFAULT_PG_PARAMS.inventory_reorder_safety} Units`; }
      if (rangeInvUtil) { rangeInvUtil.value = DEFAULT_PG_PARAMS.inventory_utilization_target; valInvUtil.textContent = `${DEFAULT_PG_PARAMS.inventory_utilization_target.toFixed(1)}%`; }

      localStorage.removeItem('mis_pg_parameters');

      if (consoleOutput) {
        consoleOutput.innerHTML = `
          <div class="term-line warn"><strong>[${nowTime}] ROLLBACK TO BASELINE; Restoring PostgreSQL default seed configuration...</strong></div>
          <div class="term-line success"><strong>[${nowTime}] Parameters reset to factory values. Dashboard benchmarks synchronized.</strong></div>
        `;
      }

      if (window.applyPostgresParameters && window.pbiDepartmentData) {
        window.applyPostgresParameters(DEFAULT_PG_PARAMS, window.pbiDepartmentData);
      }
      if (window.pbiUpdateDashboard) {
        window.pbiUpdateDashboard();
      }

      showToast("Reverted parameters to PostgreSQL baseline defaults");
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM LOGIC (EMAILJS)
   ========================================================================== */
function initContactForm() {
  emailjs.init("wbA_cxjY2HJMI868a");
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    if (nameInput.value.trim().length < 2) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      messageInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (isValid) {
      const submitBtn = document.getElementById('submitFormBtn');
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending Message...';

      emailjs.sendForm('Csd_fgsdfj_sgj65ff6g5sf3', '(g$sd654digujh5*&()fgsfg', form)
        .then(() => {
          showToast('Thank you! Your message has been sent to Shivam Gupta.');
          form.reset();
        })
        .catch((error) => {
          console.error('Email error:', error);
          showToast('Failed to send message. Please try again later.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Send Message to Shivam';
        });
    }
  });
}

/* ==========================================================================
   8. RESUME DOWNLOAD HANDLER
   ========================================================================== */
function initResumeModal() {
  const openBtn = document.getElementById('openResumeBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      showToast("Downloading Shivam Gupta's Resume (PDF)...");
    });
  }
}

/* ==========================================================================
   9. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg style="width:18px;height:18px;color:var(--accent-cyan);flex-shrink:0;"><use href="#icon-check"></use></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
