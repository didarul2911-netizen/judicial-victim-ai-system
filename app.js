// Application State
const state = {
  activePortal: 'landing', // 'landing', 'judicial', 'victim'
  activeTab: {
    judicial: 'tab-jid-overview',
    victim: 'tab-vsrs-welcome'
  },
  safetyChoices: {
    hasChildren: false,
    sharedHome: false,
    planToLeave: false,
    digitalMonitoring: false,
    orderOfProtection: false
  },
  reportData: {
    survivorName: '',
    contactInfo: '',
    safeToContact: true,
    incidentDateTime: '',
    incidentLocation: '',
    incidentType: 'Harassment',
    incidentDescription: '',
    witnesses: '',
    evidenceLog: ''
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupJudicialPortal();
  setupVictimPortal();
  setupEmergencyExit();
});

// ---------------------------------------------------------
// Navigation & Routing Logic
// ---------------------------------------------------------
function setupNavigation() {
  const body = document.body;
  const landingView = document.getElementById('view-landing');
  const judicialView = document.getElementById('view-judicial');
  const victimView = document.getElementById('view-victim');

  // Home Portal Selection Cards
  document.getElementById('card-go-judicial').addEventListener('click', () => {
    switchPortal('judicial');
  });
  document.getElementById('card-go-victim').addEventListener('click', () => {
    switchPortal('victim');
  });

  // Back to Home Buttons
  document.querySelectorAll('.btn-back-home').forEach(btn => {
    btn.addEventListener('click', () => {
      switchPortal('landing');
    });
  });

  // Switch Portal Function
  function switchPortal(portal) {
    state.activePortal = portal;
    
    // Hide all views
    landingView.classList.remove('active');
    judicialView.classList.remove('active');
    victimView.classList.remove('active');
    
    // Reset body classes
    body.className = '';
    window.scrollTo(0, 0);

    if (portal === 'landing') {
      landingView.classList.add('active');
    } else if (portal === 'judicial') {
      body.classList.add('theme-judicial');
      judicialView.classList.add('active');
      triggerSidebarTab('judicial', state.activeTab.judicial);
    } else if (portal === 'victim') {
      body.classList.add('theme-victim');
      victimView.classList.add('active');
      triggerSidebarTab('victim', state.activeTab.victim);
    }
  }

  // Sidebar navigation bindings
  setupSidebarNav('judicial');
  setupSidebarNav('victim');
}

function setupSidebarNav(portal) {
  const buttons = document.querySelectorAll(`#view-${portal} .nav-item`);
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      triggerSidebarTab(portal, tabId);
    });
  });
}

function triggerSidebarTab(portal, tabId) {
  state.activeTab[portal] = tabId;
  const viewSelector = `#view-${portal}`;
  
  // Update sidebar active classes
  document.querySelectorAll(`${viewSelector} .nav-item`).forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update main content visibility
  document.querySelectorAll(`${viewSelector} .portal-tab-content`).forEach(content => {
    if (content.id === tabId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // Reset scroll height of the main workspace container to the top on tab change
  const scrollContainer = document.querySelector(`${viewSelector} .portal-content-scroll`);
  if (scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}

// ---------------------------------------------------------
// EquiLaw (Judicial Intelligence) Portal Logic
// ---------------------------------------------------------
function setupJudicialPortal() {
  // Case Analyzer Form
  const analyzerForm = document.getElementById('jid-analyzer-form');
  const caseTextInput = document.getElementById('jid-case-text');
  const resultsContainer = document.getElementById('jid-analysis-results');

  // Preset loading templates
  // Preset loading templates - Localized for Bangladesh
  const casePresets = {
    preset1: `The defendant, Kalam Miah, has a history of domestic violence and dowry harassment (demanding BDT 2,00,000) from his wife. On the night of May 12, he approached her father's home in Dhaka, shouted threats of violence, and slapped her when she refused to give him money. Neighbors called the police via 999. The victim filed a complaint under Nari O Shishu Nirjatan Daman Ain and fears physical injury.`,
    preset2: `The suspect targeted the victim over Facebook Messenger and email, sending more than three hundred abusive messages after she blocked his accounts. The messages detailed threats of leaking private photos, defaming her family, and tracking her movements to her university, violating provisions of the Cyber Security Act, 2024 and causing severe mental distress.`,
    preset3: `The respondent produced forged land transfer papers and a fake unregistered Heba deed to take possession of CS Plot 1024, Khatian 85. The plaintiff asserts that the signature on the deed is forged and the mutation was obtained through fraudulent identity cheating in the land registry, violating Section 419/420 of the Penal Code.`
  };

  document.querySelectorAll('.jid-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset');
      if (casePresets[presetId]) {
        caseTextInput.value = casePresets[presetId];
      }
    });
  });

  analyzerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = caseTextInput.value;
    
    // Show AI Scanning Loading State
    resultsContainer.innerHTML = `
      <div class="ai-results-placeholder">
        <div class="status-dot" style="margin: 0 auto 1rem; width: 12px; height: 12px; box-shadow: 0 0 12px var(--theme-primary)"></div>
        <p>AI Engine compiling files, matching precedents, and generating statutory risk profiles...</p>
      </div>
    `;

    // Scroll to results loading block on mobile immediately
    if (window.innerWidth <= 768) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      const analysis = window.analyzeCase(text);
      if (!analysis.success) {
        resultsContainer.innerHTML = `<p style="color: #ef4444; text-align: center;">${analysis.message}</p>`;
        return;
      }
      renderCaseAnalysis(analysis);
      
      // Re-scroll to loaded results block on mobile
      if (window.innerWidth <= 768) {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1200); // realistic mock calculation delay
  });

  // Precedent Search
  const searchInput = document.getElementById('jid-search-input');
  const categoryFilter = document.getElementById('jid-category-filter');
  
  function performSearch() {
    const query = searchInput.value;
    const cat = categoryFilter.value;
    const matches = window.searchPrecedents(query, cat);
    renderPrecedents(matches);
  }

  searchInput.addEventListener('input', performSearch);
  categoryFilter.addEventListener('change', performSearch);

  // Initial Precedents list render
  performSearch();

  // Sentencing Estimator - Redesigned as Bangladeshi Bail & Penalty Advisor
  const offenseSlider = document.getElementById('jid-offense-level');
  const historySlider = document.getElementById('jid-history-points');
  const offenseVal = document.getElementById('jid-offense-level-val');
  const historyVal = document.getElementById('jid-history-points-val');

  function updateSentencingRange() {
    const level = offenseSlider.value;
    const points = historySlider.value;
    offenseVal.textContent = level;
    historyVal.textContent = points;

    const estimate = window.calculateSentencing(level, points);
    
    document.getElementById('jid-guideline-months').textContent = estimate.range;
    document.getElementById('jid-guideline-zone').textContent = estimate.zone;
    document.getElementById('jid-guideline-category').textContent = estimate.courtName;
    
    const probationText = estimate.probationEligible 
      ? `YES - Trial court may grant bail as a right, or consider probation (Bail Chance: ${estimate.bailChance}%).` 
      : `NO - Non-Bailable offense (Bail Chance: ${estimate.bailChance}%). Custodial detention is standard practice under CrPC.`;
    document.getElementById('jid-guideline-probation').textContent = probationText;
  }

  offenseSlider.addEventListener('change', updateSentencingRange);
  historySlider.addEventListener('input', updateSentencingRange);
  updateSentencingRange(); // Initial run

  // Setup Theme 1: Judicial Intelligence components
  setupJudicialIntelligenceTheme1();
}

function setupJudicialIntelligenceTheme1() {
  // --- 1. Precedent Parser ---
  const parserPresets = document.querySelectorAll('.jid-parser-preset');
  const parserText = document.getElementById('jid-parser-text');
  const runParserBtn = document.getElementById('jid-run-parser-btn');
  const logsContainer = document.getElementById('jid-parser-logs');
  const confidenceBadge = document.getElementById('jid-parser-confidence-badge');
  const outputFields = document.getElementById('jid-parser-output-fields');
  const placeholder = document.getElementById('jid-parser-placeholder');
  const copyBtn = document.getElementById('jid-parser-copy-btn');
  let parsedMetadata = null;

  parserPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset');
      const sample = window.getParserSample(presetId);
      if (sample) {
        parserText.value = sample.rawText;
      }
    });
  });

  runParserBtn.addEventListener('click', () => {
    const text = parserText.value.trim();
    if (!text) {
      alert("Please enter legacy ruling text to parse.");
      return;
    }

    runParserBtn.disabled = true;
    logsContainer.innerHTML = '';
    outputFields.style.display = 'none';
    confidenceBadge.style.display = 'none';
    placeholder.style.display = 'flex';
    parsedMetadata = null;

    // Scroll to logs console on mobile
    if (window.innerWidth <= 768) {
      logsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.parseLegacyText(
      text,
      (msg) => {
        const logLine = document.createElement('div');
        logLine.className = 'log-entry';
        if (msg.startsWith('[Success]')) {
          logLine.classList.add('log-entry-success');
        } else if (msg.startsWith('[OCR') || msg.startsWith('[Layout')) {
          logLine.classList.add('log-entry-step');
        } else {
          logLine.classList.add('log-entry-info');
        }
        logLine.textContent = msg;
        logsContainer.appendChild(logLine);
        logsContainer.scrollTop = logsContainer.scrollHeight;
      },
      (metadata) => {
        runParserBtn.disabled = false;
        parsedMetadata = metadata;

        document.getElementById('out-court').textContent = metadata.court;
        document.getElementById('out-citation').textContent = metadata.citation;
        document.getElementById('out-date').textContent = metadata.date;
        document.getElementById('out-judge').textContent = metadata.judge;
        document.getElementById('out-casetype').textContent = metadata.caseType;
        document.getElementById('out-holdings').textContent = metadata.holdings;
        document.getElementById('out-ratio').textContent = metadata.ratioDecidendi;

        confidenceBadge.textContent = `Confidence: ${metadata.ocrConfidence}`;
        confidenceBadge.style.display = 'inline-block';

        placeholder.style.display = 'none';
        outputFields.style.display = 'flex';

        // Scroll to parsed output on mobile
        if (window.innerWidth <= 768) {
          outputFields.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    );
  });

  copyBtn.addEventListener('click', () => {
    if (parsedMetadata) {
      const jsonStr = JSON.stringify(parsedMetadata, null, 2);
      navigator.clipboard.writeText(jsonStr).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied! ✓";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy json metadata", err);
      });
    }
  });

  // --- 2. Adjournment Predictor ---
  const predForm = document.getElementById('jid-predictor-form');
  const pastSlider = document.getElementById('jid-pred-past');
  const workloadSlider = document.getElementById('jid-pred-workload');
  const attorneySlider = document.getElementById('jid-pred-attorney');
  const pastVal = document.getElementById('jid-pred-past-val');
  const workloadVal = document.getElementById('jid-pred-workload-val');
  const attorneyVal = document.getElementById('jid-pred-attorney-val');

  const predPlaceholder = document.getElementById('jid-predictor-placeholder');
  const predOutput = document.getElementById('jid-predictor-output');
  const gaugePercent = document.getElementById('gauge-percent');
  const gaugeRiskBadge = document.getElementById('gauge-risk-badge');
  const gaugeProgress = document.getElementById('gauge-progress');
  const insightsList = document.getElementById('pred-insights-list');
  const directivesList = document.getElementById('pred-directives-list');

  pastSlider.addEventListener('input', () => {
    pastVal.textContent = pastSlider.value;
  });
  workloadSlider.addEventListener('input', () => {
    workloadVal.textContent = workloadSlider.value + '%';
  });
  attorneySlider.addEventListener('input', () => {
    attorneyVal.textContent = attorneySlider.value + '%';
  });

  predForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const caseType = document.getElementById('jid-pred-casetype').value;
    const pastAdjournments = parseInt(pastSlider.value) || 0;
    const benchWorkload = parseInt(workloadSlider.value) || 0;
    const attorneyDelayRate = parseInt(attorneySlider.value) || 0;
    const caseAgeDays = parseInt(document.getElementById('jid-pred-age').value) || 0;
    const delayReason = document.getElementById('jid-pred-reason').value;

    const result = window.predictAdjournments({
      caseType,
      pastAdjournments,
      benchWorkload,
      attorneyDelayRate,
      caseAgeDays,
      delayReason
    });

    predPlaceholder.style.display = 'none';
    predOutput.style.display = 'flex';

    // Animate Circular Gauge
    gaugePercent.textContent = `${result.probability}%`;
    gaugeRiskBadge.textContent = `${result.riskLevel} RISK`;

    // Clear previous risk classes
    gaugeProgress.className.baseVal = '';
    gaugePercent.style.color = '#fff';
    if (result.riskLevel === 'Critical') {
      gaugeProgress.classList.add('gauge-risk-critical');
      gaugeRiskBadge.style.color = '#ef4444';
    } else if (result.riskLevel === 'Moderate') {
      gaugeProgress.classList.add('gauge-risk-moderate');
      gaugeRiskBadge.style.color = '#f59e0b';
    } else {
      gaugeProgress.classList.add('gauge-risk-low');
      gaugeRiskBadge.style.color = '#10b981';
    }

    // Radial stroke-dashoffset math
    const circumference = 440;
    const offset = circumference - (circumference * result.probability / 100);
    gaugeProgress.style.strokeDashoffset = offset;

    // Pop insights
    insightsList.innerHTML = '';
    result.insights.forEach(insight => {
      const li = document.createElement('li');
      li.textContent = insight;
      insightsList.appendChild(li);
    });

    // Pop directives
    directivesList.innerHTML = '';
    result.recommendations.forEach(rec => {
      const li = document.createElement('li');
      li.textContent = rec;
      directivesList.appendChild(li);
    });

    // Scroll to predictor output on mobile
    if (window.innerWidth <= 768) {
      predOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // --- 3. Smart Docketing ---
  const docketForm = document.getElementById('jid-docket-form');
  const docketText = document.getElementById('jid-docket-text');
  const docketPresets = document.querySelectorAll('.jid-docket-preset');
  const docketPlaceholder = document.getElementById('jid-docket-placeholder');
  const docketOutput = document.getElementById('jid-docket-output');

  const outCategory = document.getElementById('docket-out-category');
  const outBench = document.getElementById('docket-out-bench');
  const outRoom = document.getElementById('docket-out-room');
  const outWorkloadLbl = document.getElementById('docket-out-workload-lbl');
  const outWorkloadBar = document.getElementById('docket-out-workload-bar');
  const outQueue = document.getElementById('docket-out-queue');
  const outTime = document.getElementById('docket-out-time');
  const outConfidence = document.getElementById('docket-out-confidence');
  const outKeywords = document.getElementById('docket-out-keywords');

  docketPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      docketText.value = btn.getAttribute('data-text');
    });
  });

  docketForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = docketText.value.trim();

    const result = window.matchCaseToBench(text);
    if (!result.success) {
      alert(result.message);
      return;
    }

    docketPlaceholder.style.display = 'none';
    docketOutput.style.display = 'flex';

    outCategory.textContent = result.detectedCategory;
    outBench.textContent = result.recommendedBench;
    outRoom.textContent = result.courtRoom;
    outWorkloadLbl.textContent = `${result.benchWorkload}%`;

    outWorkloadBar.style.width = `${result.benchWorkload}%`;
    outWorkloadBar.className = 'risk-level';
    if (result.benchWorkload > 80) {
      outWorkloadBar.classList.add('risk-high');
    } else if (result.benchWorkload > 60) {
      outWorkloadBar.classList.add('risk-medium');
    } else {
      outWorkloadBar.classList.add('risk-low');
    }

    outQueue.textContent = `Case #${result.queuePosition} in Queue`;
    outTime.textContent = `${result.estimatedDays} Court Days`;
    outConfidence.textContent = result.confidence;

    outKeywords.innerHTML = '';
    result.matchedKeywords.forEach(kw => {
      const span = document.createElement('span');
      span.className = 'statute-tag';
      span.textContent = kw;
      outKeywords.appendChild(span);
    });

    if (outKeywords.children.length === 0) {
      const span = document.createElement('span');
      span.className = 'statute-tag';
      span.style.fontStyle = 'italic';
      span.textContent = 'None Mapped';
      outKeywords.appendChild(span);
    }

    // Scroll to docket output on mobile
    if (window.innerWidth <= 768) {
      docketOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function renderCaseAnalysis(data) {
  const container = document.getElementById('jid-analysis-results');

  const riskClass = data.riskLevel === 'High' ? 'risk-high' : (data.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low');
  
  let statutesHtml = data.statutes.map(s => `
    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem;">
      <div style="font-weight:700; color:#fff; display:flex; justify-content:space-between; margin-bottom:0.25rem;">
        <span>${s.code}</span>
        <span style="color:var(--theme-accent); font-size:0.8rem;">Statutory Mapping</span>
      </div>
      <p style="font-size:0.9rem; font-weight:600; color:#cbd5e1; margin-bottom:0.5rem;">${s.title}</p>
      <p style="font-size:0.85rem; color:var(--text-secondary);">${s.description}</p>
      <div style="margin-top:0.75rem;">
        <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; display:block; margin-bottom:0.25rem;">Constituent Elements:</span>
        <ul style="list-style:inside square; font-size:0.8rem; color:var(--text-secondary);">
          ${s.elements.map(el => `<li>${el}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  if (!statutesHtml) {
    statutesHtml = `<p style="font-size:0.9rem; color:var(--text-muted);">No primary federal statutes identified. Local jurisdictional laws may apply.</p>`;
  }

  let precedentsHtml = data.precedents.map(p => `
    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem;">
      <div style="font-weight:700; color:#fff; display:flex; justify-content:space-between; font-family:var(--font-family-heading);">
        <span>${p.title}</span>
        <span style="color:var(--text-muted); font-size:0.8rem; font-family:monospace;">${p.citation}</span>
      </div>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin: 0.5rem 0;"><strong>Ruling:</strong> ${p.ruling}</p>
      <p style="font-size:0.85rem; color:var(--text-secondary);"><strong>Significance:</strong> ${p.significance}</p>
    </div>
  `).join('');

  if (!precedentsHtml) {
    precedentsHtml = `<p style="font-size:0.9rem; color:var(--text-muted);">No matching federal precedents on file for this offense category.</p>`;
  }

  container.innerHTML = `
    <div class="output-card">
      <div class="output-badge">
        <span>⚖️ Legal Analysis Summary</span>
      </div>
      
      <div>
        <p style="font-size:1.4rem; font-weight:700; color:#fff; font-family:var(--font-family-heading); margin-bottom:0.25rem;">
          ${data.category} Detection
        </p>
        <p style="font-size:0.95rem; line-height:1.6; color:#e2e8f0; border-left: 3px solid var(--theme-primary); padding-left: 1rem;">
          ${data.analysisText}
        </p>
      </div>

      <div style="margin: 1rem 0; padding: 1rem; background: rgba(0,0,0,0.15); border-radius: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span style="font-size:0.85rem; font-weight:600; text-transform:uppercase; color:var(--text-secondary);">Safety & Violence Risk Score</span>
          <span style="font-size:1.1rem; font-weight:700; color:#fff;">${data.riskScore}/100 (${data.riskLevel})</span>
        </div>
        <div class="risk-meter">
          <div class="risk-level ${riskClass}" style="width: ${data.riskScore}%"></div>
        </div>
      </div>

      <div>
        <h5 style="color:#fff; font-size:1rem; font-family:var(--font-family-heading); margin-bottom:0.75rem; border-bottom:1px solid var(--border-color); padding-bottom:0.25rem;">Suggested Legal Statutes</h5>
        ${statutesHtml}
      </div>

      <div style="margin-top:0.5rem;">
        <h5 style="color:#fff; font-size:1rem; font-family:var(--font-family-heading); margin-bottom:0.75rem; border-bottom:1px solid var(--border-color); padding-bottom:0.25rem;">Applicable Case Precedents</h5>
        ${precedentsHtml}
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: rgba(255,255,255,0.01); border:1px solid var(--border-color); padding: 1rem; border-radius: 8px; font-size:0.85rem;">
        <div><strong style="color:var(--text-muted);">Medium Identified:</strong> <span style="color:#fff;">${data.entities.medium}</span></div>
        <div><strong style="color:var(--text-muted);">Jurisdiction:</strong> <span style="color:#fff;">Bangladesh Jurisdiction</span></div>
      </div>
    </div>
  `;
}

function renderPrecedents(list) {
  const container = document.getElementById('jid-precedents-list');
  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 2rem; color:var(--text-muted);">
        <p>No precedents found matching the query.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="result-item">
      <div class="result-header">
        <div>
          <h4 class="result-title">${p.title}</h4>
          <span style="font-size:0.8rem; color:var(--text-secondary);">${p.court} (${p.year})</span>
        </div>
        <span class="result-citation">${p.citation}</span>
      </div>
      <p style="font-size:0.9rem; color:#cbd5e1; margin-bottom: 0.75rem; line-height: 1.5;">${p.synopsis}</p>
      <div style="margin-bottom:0.75rem;">
        <strong style="font-size:0.8rem; color:var(--text-muted);">Ruling:</strong>
        <p style="font-size:0.85rem; color:var(--text-secondary);">${p.ruling}</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div style="display:flex; gap:0.25rem;">
          ${p.statutes.map(s => `<span class="statute-tag">${s}</span>`).join('')}
        </div>
        <span style="font-size:0.75rem; background:rgba(79, 70, 229, 0.1); border:1px solid rgba(79, 70, 229, 0.2); color:#a5b4fc; padding: 0.15rem 0.5rem; border-radius: 4px;">
          ${p.category}
        </span>
      </div>
    </div>
  `).join('');
}

// ---------------------------------------------------------
// JustiSafe (Victim Referral & Support) Portal Logic
// ---------------------------------------------------------
function setupVictimPortal() {
  // empathetic Support Chat
  const chatMessages = document.getElementById('vsrs-chat-messages');
  const chatForm = document.getElementById('vsrs-chat-form');
  const chatInput = document.getElementById('vsrs-chat-input');

  function appendChatBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    
    // Convert newlines to breaks or handle spacing
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Handle Preset Quick Replies clicks
  document.querySelectorAll('.btn-quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent;
      triggerUserMessage(text);
    });
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    
    triggerUserMessage(text);
    chatInput.value = '';
  });

  function triggerUserMessage(text) {
    appendChatBubble(text, 'user');
    
    // Add dynamic simulated typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'ai');
    typingBubble.innerHTML = `<span style="display:inline-flex; gap:3px;"><span class="status-dot" style="animation: pulse-glow 1s infinite"></span> Typing...</span>`;
    chatMessages.appendChild(typingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      // Remove typing indicator
      chatMessages.removeChild(typingBubble);
      
      const response = window.getChatbotResponse(text);
      appendChatBubble(response, 'ai');
    }, 1000 + Math.random() * 800); // human typing lag simulation
  }

  // Initial Greeting Bubble
  appendChatBubble("Welcome to JustiSafe. I am a confidential support assistant designed to help survivors. I can map support directories, generate personal safety guides, or compile incident logs. You are safe here. How can I help you?", "ai");

  // Resource Search
  const resSearchInput = document.getElementById('vsrs-resource-search');
  const resCategoryFilter = document.getElementById('vsrs-resource-category');

  function renderResourceCards() {
    const query = resSearchInput.value;
    const cat = resCategoryFilter.value;
    const list = window.searchResources(query, cat);
    const resourcesList = document.getElementById('vsrs-resources-list');

    if (list.length === 0) {
      resourcesList.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 3rem; color:var(--text-muted);">
          <p>No resources found matching the criteria.</p>
        </div>
      `;
      return;
    }

    resourcesList.innerHTML = list.map(r => `
      <div style="background:var(--bg-card); border: 1px solid var(--border-color); border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; font-weight:600; color:var(--theme-primary); tracking:0.05em; display:block; margin-bottom:0.25rem;">
            ${r.category}
          </span>
          <h4 style="font-size:1.15rem; color:#fff; font-family:var(--font-family-heading);">${r.name}</h4>
        </div>
        <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5; flex:1;">${r.description}</p>
        
        <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.85rem; border-top: 1px solid var(--border-color); padding-top:0.75rem;">
          <div><strong style="color:var(--text-muted);">Call:</strong> <a href="tel:${r.phone.replace(/[^0-9]/g, '')}" style="color:#fff; text-decoration:underline;">${r.phone}</a></div>
          ${r.text ? `<div><strong style="color:var(--text-muted);">Text:</strong> <span style="color:#fff;">${r.text}</span></div>` : ''}
          <div><strong style="color:var(--text-muted);">Hours:</strong> <span style="color:#e2e8f0;">${r.availability}</span></div>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:0.25rem; margin-top:0.25rem;">
          ${r.tags.map(t => `<span style="font-size:0.75rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); color:var(--text-secondary); padding:0.1rem 0.4rem; border-radius:4px;">${t}</span>`).join('')}
        </div>
        
        <a href="${r.website}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="justify-content:center; text-decoration:none; font-size:0.85rem; padding:0.5rem;">
          Visit Official Site ↗
        </a>
      </div>
    `).join('');
  }

  resSearchInput.addEventListener('input', renderResourceCards);
  resCategoryFilter.addEventListener('change', renderResourceCards);
  renderResourceCards(); // Initial run

  // Safety Planner Checklist Wizard
  const safetyForm = document.getElementById('vsrs-safety-form');

  safetyForm.addEventListener('change', () => {
    // Gather checkbox choices
    state.safetyChoices.hasChildren = document.getElementById('choice-children').checked;
    state.safetyChoices.sharedHome = document.getElementById('choice-home').checked;
    state.safetyChoices.planToLeave = document.getElementById('choice-leave').checked;
    state.safetyChoices.digitalMonitoring = document.getElementById('choice-digital').checked;
    state.safetyChoices.orderOfProtection = document.getElementById('choice-protection').checked;

    const list = window.generateSafetyChecklist(state.safetyChoices);
    renderSafetyChecklist(list);
  });

  // Initial trigger to render default lists
  safetyForm.dispatchEvent(new Event('change'));

  // Document Builder
  const docForm = document.getElementById('vsrs-doc-form');
  const reportDownloadBtn = document.getElementById('vsrs-download-report-btn');

  // Input bindings to sync report preview
  const bindInputs = [
    { id: 'vsrs-report-name', stateKey: 'survivorName' },
    { id: 'vsrs-report-contact', stateKey: 'contactInfo' },
    { id: 'vsrs-report-date', stateKey: 'incidentDateTime' },
    { id: 'vsrs-report-location', stateKey: 'incidentLocation' },
    { id: 'vsrs-report-type', stateKey: 'incidentType' },
    { id: 'vsrs-report-desc', stateKey: 'incidentDescription' },
    { id: 'vsrs-report-witnesses', stateKey: 'witnesses' },
    { id: 'vsrs-report-evidence', stateKey: 'evidenceLog' }
  ];

  const safeContactCheckbox = document.getElementById('vsrs-report-safe');
  safeContactCheckbox.addEventListener('change', () => {
    state.reportData.safeToContact = safeContactCheckbox.checked;
    updateReportPreview();
  });

  bindInputs.forEach(binding => {
    const element = document.getElementById(binding.id);
    element.addEventListener('input', () => {
      state.reportData[binding.stateKey] = element.value;
      updateReportPreview();
    });
  });

  reportDownloadBtn.addEventListener('click', () => {
    window.downloadReport(state.reportData);
  });

  updateReportPreview(); // initial empty preview
}

function renderSafetyChecklist(list) {
  const container = document.getElementById('vsrs-checklist-results');
  
  if (list.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); text-align:center;">Select risk factors in the questionnaire to generate your guide.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="safety-check-list">
      <p style="font-size:0.95rem; color:#cbd5e1; margin-bottom:0.5rem; font-weight:500;">
        Below is your tailored safety guide. Check off items as you complete them. This list is run locally and never saved to a server.
      </p>
      ${list.map(item => `
        <label class="safety-check-item">
          <input type="checkbox" id="chk-${item.id}">
          <span class="safety-check-text">${item.text}</span>
        </label>
      `).join('')}
    </div>
  `;
}

function updateReportPreview() {
  const r = state.reportData;
  
  document.getElementById('prev-name').textContent = r.survivorName || 'Not Provided (Anonymous)';
  document.getElementById('prev-contact').textContent = r.contactInfo || 'Not Provided (Anonymous)';
  document.getElementById('prev-safe').textContent = r.safeToContact ? 'YES' : 'NO / SECURE ENVELOPE';
  document.getElementById('prev-date').textContent = r.incidentDateTime || 'Not Provided';
  document.getElementById('prev-location').textContent = r.incidentLocation || 'Not Provided';
  document.getElementById('prev-type').textContent = r.incidentType || 'Not Specified';
  document.getElementById('prev-desc').textContent = r.incidentDescription || 'Provide description details in the left panel to populate...';
  document.getElementById('prev-witnesses').textContent = r.witnesses || 'No witnesses logged.';
  document.getElementById('prev-evidence').textContent = r.evidenceLog || 'No physical/digital evidence items logged.';
}

// ---------------------------------------------------------
// Emergency Quick Exit Handler
// ---------------------------------------------------------
function setupEmergencyExit() {
  const exitButtons = document.querySelectorAll('.btn-quick-exit');
  
  function triggerQuickExit() {
    // Clear potentially sensitive inputs for safety
    document.querySelectorAll('input, textarea').forEach(el => {
      el.value = '';
    });
    
    // Immediately redirect to a neutral site
    window.location.href = 'https://www.google.com';
  }

  exitButtons.forEach(btn => {
    btn.addEventListener('click', triggerQuickExit);
  });

  // Hotkey: Escape key causes instant redirect
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      triggerQuickExit();
    }
  });
}
