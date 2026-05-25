/**
 * Generates an empathetic, trauma-informed response to victim chat input.
 * @param {string} message - Message sent by user.
 * @returns {string} - Chatbot response.
 */
window.getChatbotResponse = function(message) {
  const msg = message.toLowerCase().trim();

  if (!msg) {
    return "I am here. Please share whatever you feel comfortable with, or use the quick links below.";
  }

  // Emotional triggers
  const fearTriggers = ["scared", "afraid", "danger", "hurt", "kill", "threaten", "weapon", "gun", "knife", "punch", "hit", "police"];
  const shelterTriggers = ["shelter", "house", "stay", "sleep", "flee", "leave", "escape", "run away", "home"];
  const legalTriggers = ["court", "lawyer", "restraining order", "police", "arrest", "sue", "legal", "divorce", "custody", "injunction"];
  const digitalTriggers = ["hack", "online", "phone", "email", "spy", "tracked", "location", "message", "screenshot", "cyber", "stalk"];
  const emotionTriggers = ["crying", "sad", "pain", "hurt", "lonely", "depressed", "anxious", "panic", "suicide", "heal"];

  if (fearTriggers.some(t => msg.includes(t))) {
    return `Your safety is the absolute priority. If you feel you are in immediate danger, please dial 911 or find a safe physical location. You can also use the red **Emergency Quick Exit** button at the bottom of the screen to close this site instantly. 

If you are safe right now but worried about future danger, we can create a safety plan together, or I can help you contact the **National Domestic Violence Hotline** (1-800-799-SAFE) immediately.`;
  }

  if (shelterTriggers.some(t => msg.includes(t))) {
    return `If you need a safe place to sleep or stay, emergency housing is available. Organizations like **Safe Horizon** run 24/7 confidential shelters that accommodate children and provide meals. 

Would you like me to filter our directory for housing shelters, or help you make an emergency intake call?`;
  }

  if (legalTriggers.some(t => msg.includes(t))) {
    return `Navigating the legal system can feel overwhelming, but you do not have to do it alone. You may be eligible for pro-bono representation through the **Legal Aid Society** to help secure a protective order, handle child custody, or navigate immigration filings. 

For general legal information, **WomensLaw.org** provides simple, state-by-state guides to court procedures. I can guide you to their databases if you'd like.`;
  }

  if (digitalTriggers.some(t => msg.includes(t))) {
    return `Digital safety is incredibly important. If someone is tracking your device or stalking you online:
1. Try to access resources from a safe, neutral device (like a library computer or a trusted friend's phone).
2. Keep screenshots and logs of all harassing messages, emails, or posts. You can compile these securely in our **Document Builder** tab.
3. Consider changing passwords and enabling two-factor authentication on accounts from a clean device.`;
  }

  if (emotionTriggers.some(t => msg.includes(t))) {
    return `I am so sorry you are going through this. What you are feeling is completely valid, and it is okay to feel overwhelmed. You are incredibly brave for reaching out. 

If you'd like someone to talk to who is trained to help, the **Crisis Text Line** (text HOME to 741741) or the **VictimConnect Resource Center** are free, fully confidential resources where you can speak or text with an advocate. I am also here to continue chatting if you wish.`;
  }

  // Greeting / general
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello. I am your support assistant. I am here to help you explore local resources, create an emergency safety checklist, or compile incident records. You are in a safe, confidential space. How can I support you today?";
  }

  return "Thank you for sharing that with me. I hear you, and I want to help you find the support you deserve. Would you like to check local resources, build a secure incident log, or learn about safety planning?";
};

/**
 * Filter resources.
 * @param {string} query - Keyword search.
 * @param {string} category - Category filter.
 * @returns {Array} - Matching resources.
 */
window.searchResources = function(query = "", category = "") {
  const queryLower = query.toLowerCase().trim();

  return window.resources.filter(r => {
    const matchesCategory = !category || r.category === category;
    
    const matchesQuery = !queryLower ||
      r.name.toLowerCase().includes(queryLower) ||
      r.description.toLowerCase().includes(queryLower) ||
      r.tags.some(tag => tag.toLowerCase().includes(queryLower));

    return matchesCategory && matchesQuery;
  });
};

/**
 * Compiles a list of actionable safety checklist steps based on user choices.
 * @param {object} choices - User options.
 * @returns {Array} - Checklist items.
 */
window.generateSafetyChecklist = function(choices) {
  const checklist = [];

  // Default essentials
  checklist.push({
    id: "s1",
    text: "Identify escape routes out of your house (doors, windows, fire escapes) and practice exiting them."
  });
  checklist.push({
    id: "s2",
    text: "Keep a charged phone and a backup power bank on your person at all times."
  });

  if (choices.hasChildren) {
    checklist.push({
      id: "s_child1",
      text: "Teach children how to dial 911 and state their address clearly in an emergency."
    });
    checklist.push({
      id: "s_child2",
      text: "Establish a safe word/code with your children so they know when to run to a designated safe place (e.g. a neighbor's house)."
    });
  }

  if (choices.sharedHome || choices.planToLeave) {
    checklist.push({
      id: "s_leave1",
      text: "Pack an emergency 'Go-Bag' containing spare keys, medications, birth certificates, ID copies, and emergency cash. Hide it in a safe place (like at a trusted friend's house or a secure outdoor location)."
    });
    checklist.push({
      id: "s_leave2",
      text: "Open a separate bank account in your name only, and request paperless statements sent to a safe email or physical address."
    });
  }

  if (choices.digitalMonitoring) {
    checklist.push({
      id: "s_dig1",
      text: "Use a public computer (library) or a borrowed device to search for help, legal resources, or housing."
    });
    checklist.push({
      id: "s_dig2",
      text: "Change login credentials for email, banking, and social accounts on a clean device. Enable two-factor authentication (2FA) pointing to a secret phone number or authenticator app."
    });
    checklist.push({
      id: "s_dig3",
      text: "Turn off location sharing, GPS services, and Bluetooth on all cellular devices and wearable tech."
    });
  }

  if (choices.orderOfProtection) {
    checklist.push({
      id: "s_prot1",
      text: "Keep a copy of your protective order with you at all times. Leave extra copies at your workplace, car, and with a trusted contact."
    });
    checklist.push({
      id: "s_prot2",
      text: "Inform your workplace security and local police station that you hold a protective order against the offender, providing them a photo of the individual if possible."
    });
  }

  return checklist;
};

/**
 * Utility to download formatted incident report as a text file.
 * @param {object} report - Report data.
 */
window.downloadReport = function(report) {
  const content = `===========================================================
               CONFIDENTIAL INCIDENT REPORT
===========================================================
DOCUMENTED ON: ${new Date().toLocaleString()}
STATUS: STRICTLY CONFIDENTIAL - SURVIVOR RECORDS

-----------------------------------------------------------
1. PERSONAL INFORMATION
-----------------------------------------------------------
Survivor Name: ${report.survivorName || 'Not Provided (Anonymous)'}
Contact Info:  ${report.contactInfo || 'Not Provided (Anonymous)'}
Safe to Contact? ${report.safeToContact ? 'YES' : 'NO / USE CAUTION'}

-----------------------------------------------------------
2. INCIDENT DETAILS
-----------------------------------------------------------
Date/Time of Occurrence: ${report.incidentDateTime || 'Not Provided'}
Location:                 ${report.incidentLocation || 'Not Provided'}
Type of Incident:         ${report.incidentType || 'Not Specified'}

Description of Event:
${report.incidentDescription || 'No description provided.'}

-----------------------------------------------------------
3. EVIDENCE & WITNESS DETAILS
-----------------------------------------------------------
Witnesses:
${report.witnesses || 'None logged.'}

Evidence Logged (Texts, Audio, Physical):
${report.evidenceLog || 'None logged.'}

===========================================================
END OF RECORD. 
This document was generated securely via JustiSafe Portal.
Keep this file in a secure digital folder, or print and 
store in a trusted, private location.
===========================================================`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `JustiSafe_Report_${report.incidentType.replace(/\s+/g, '_') || 'General'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
