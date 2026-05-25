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
  const casePresets = {
    preset1: `The defendant, John Carter, has a history of stalking his ex-partner. On the night of May 12, he approached her home, shouted threats, and slapped her across the face when she tried to close the door. Neighbor witnesses called the police, and he was arrested. The victim reported severe emotional trauma and fears he will return with a firearm.`,
    preset2: `The suspect targeted several victims over Twitter and email, sending more than three hundred messages. He created multiple burner accounts after being blocked. The messages detailed threats of physical violence, leaked personal photos, and tracked the victim's location to her office, causing her severe emotional distress.`,
    preset3: `An individual was stopped at the terminal checkpoint carrying five forged Social Security cards and fake alien authorization files in an attempt to secure employment. The prosecution claims the defendant was aware that the identity details belonged to real individuals living in Texas, violating aggravated theft provisions.`
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

    setTimeout(() => {
      const analysis = window.analyzeCase(text);
      if (!analysis.success) {
        resultsContainer.innerHTML = `<p style="color: #ef4444; text-align: center;">${analysis.message}</p>`;
        return;
      }
      renderCaseAnalysis(analysis);
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

  // Sentencing Estimator
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
    document.getElementById('jid-guideline-category').textContent = `Category ${estimate.categoryRoman}`;
    
    const probationText = estimate.probationEligible 
      ? "YES - Eligible for alternative probation programs." 
      : "NO - Custodial confinement mandated by federal law.";
    document.getElementById('jid-guideline-probation').textContent = probationText;
  }

  offenseSlider.addEventListener('input', updateSentencingRange);
  historySlider.addEventListener('input', updateSentencingRange);
  updateSentencingRange(); // Initial run
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
        <h5 style="color:#fff; font-size:1rem; font-family:var(--font-family-heading); margin-bottom:0.75rem; border-bottom:1px solid var(--border-color); padding-bottom:0.25rem;">Suggested Federal Statutes</h5>
        ${statutesHtml}
      </div>

      <div style="margin-top:0.5rem;">
        <h5 style="color:#fff; font-size:1rem; font-family:var(--font-family-heading); margin-bottom:0.75rem; border-bottom:1px solid var(--border-color); padding-bottom:0.25rem;">Applicable Case Precedents</h5>
        ${precedentsHtml}
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: rgba(255,255,255,0.01); border:1px solid var(--border-color); padding: 1rem; border-radius: 8px; font-size:0.85rem;">
        <div><strong style="color:var(--text-muted);">Medium Identified:</strong> <span style="color:#fff;">${data.entities.medium}</span></div>
        <div><strong style="color:var(--text-muted);">Jurisdiction:</strong> <span style="color:#fff;">U.S. Federal Jurisdiction</span></div>
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
