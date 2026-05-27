/**
 * Generates an empathetic, trauma-informed response to victim chat input in Bangladesh.
 * @param {string} message - Message sent by user.
 * @returns {string} - Chatbot response.
 */
window.getChatbotResponse = function(message) {
  const msg = message.toLowerCase().trim();

  if (!msg) {
    return "I am here. Please share whatever you feel comfortable with, or use the quick links below.";
  }

  // Emotional triggers
  const fearTriggers = ["scared", "afraid", "danger", "hurt", "kill", "threaten", "weapon", "gun", "knife", "punch", "hit", "police", "ramda", "terror"];
  const shelterTriggers = ["shelter", "house", "stay", "sleep", "flee", "leave", "escape", "run away", "home", "occ"];
  const legalTriggers = ["court", "lawyer", "restraining order", "police", "arrest", "sue", "legal", "divorce", "custody", "injunction", "gd", "general diary", "fir", "thana", "blast"];
  const digitalTriggers = ["hack", "online", "phone", "email", "spy", "tracked", "location", "message", "screenshot", "cyber", "stalk", "facebook", "photo", "threaten"];
  const emotionTriggers = ["crying", "sad", "pain", "hurt", "lonely", "depressed", "anxious", "panic", "suicide", "heal"];

  if (fearTriggers.some(t => msg.includes(t))) {
    return `Your safety is the absolute priority. If you feel you are in immediate danger, please dial **999** for emergency police assistance, or find a safe physical location. You can also use the red **Emergency Quick Exit** button at the bottom of the screen to close this site instantly. 

If you are safe right now but worried about your safety, we can create a safety plan, or I can help you contact the **National Violence Against Women Helpline** at **109** immediately.`;
  }

  if (shelterTriggers.some(t => msg.includes(t))) {
    return `If you need a safe place to stay, temporary shelter is available. You can access the **One-Stop Crisis Center (OCC)** at Dhaka Medical College Hospital and other public medical colleges, which provide immediate safe shelter, medical aid, and legal help. 

Alternatively, the **Victim Support Center at Tejgaon Police Station** and NGOs like **Bangladesh Mahila Parishad** operate safe homes. Would you like me to filter our directory for safe housing or legal aid contact details?`;
  }

  if (legalTriggers.some(t => msg.includes(t))) {
    return `Navigating the legal system in Bangladesh can feel complex, but there is free support. You can call the **National Government Legal Aid Helpline** at **16430** for free consultations and court representation. 

Organizations like **BLAST (Bangladesh Legal Aid and Services Trust)** and **Ain o Salish Kendra (ASK)** provide free legal assistance, mediation, and help with filing General Diaries (GD) or First Information Reports (FIR) at police stations (Thanas). Would you like their direct hotline numbers?`;
  }

  if (digitalTriggers.some(t => msg.includes(t))) {
    return `Digital stalking or harassment (especially via Facebook, WhatsApp, or email) is a criminal offense under the **Cyber Security Act, 2024** and Section 509 of the Penal Code. 
1. Keep exact screenshots and URLs of the offending profiles, messages, or posts. You can list them in our **Document Builder** tab.
2. You can file a General Diary (GD) at your local Thana (Police Station) or file a complaint directly to the **Cyber Tribunal Dhaka**.
3. Access social accounts from a safe device if you suspect your personal phone is compromised, and turn off location features.`;
  }

  if (emotionTriggers.some(t => msg.includes(t))) {
    return `I am so sorry you are going through this. Please know that what you are feeling is valid, and you are not alone. 

If you need someone to talk to for emotional support, you can call **Kaan Pete Roi** (01777-763434 / 01844-015822), the first confidential emotional support and suicide prevention helpline in Bangladesh. Their trained volunteers offer a safe, non-judgmental space to listen. I am also here to continue chatting.`;
  }

  // Greeting / general
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello. I am your support assistant. I am here to help you explore crisis hotlines, pro-bono legal services (like BLAST), or draft a General Diary (GD) timeline report. You are in a safe, confidential space. How can I help you today?";
  }

  return "Thank you for sharing that with me. I hear you, and I want to help you find the support you deserve in Bangladesh. Would you like to check local resources, draft a General Diary (GD) draft, or generate a personal safety checklist?";
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
 * Compiles a list of actionable safety checklist steps based on user choices in Bangladesh.
 * @param {object} choices - User options.
 * @returns {Array} - Checklist items.
 */
window.generateSafetyChecklist = function(choices) {
  const checklist = [];

  // Default essentials
  checklist.push({
    id: "s1",
    text: "Identify exits out of your house (doors, gates, neighbors' adjoining rooftops) and practice moving through them."
  });
  checklist.push({
    id: "s2",
    text: "Keep your phone charged and ensure you have emergency credit/minutes loaded for direct dialing."
  });
  checklist.push({
    id: "s3",
    text: "Memorize the direct number of your local Thana (Police Station) and the national helplines: 999 and 109."
  });

  if (choices.hasChildren) {
    checklist.push({
      id: "s_child1",
      text: "Teach children how to dial 999 and state their address/location clearly in an emergency."
    });
    checklist.push({
      id: "s_child2",
      text: "Establish a secret word/code with children so they know when to run to a designated safe neighbor's house."
    });
  }

  if (choices.sharedHome || choices.planToLeave) {
    checklist.push({
      id: "s_leave1",
      text: "Pack an emergency Go-Bag with original documents (National ID/NID card, Kabinnama/marriage deed, educational certificates, land records), spare keys, and cash. Hide it with a trusted relative or friend."
    });
    checklist.push({
      id: "s_leave2",
      text: "Keep a secret, separate savings amount in a mobile financial account (e.g. bKash, Rocket, Nagad) registered under a secure SIM card."
    });
  }

  if (choices.digitalMonitoring) {
    checklist.push({
      id: "s_dig1",
      text: "Use a public computer or a borrowed phone from a trusted friend to seek legal advice or look up support centers."
    });
    checklist.push({
      id: "s_dig2",
      text: "Change passwords and PINs for emails, social media, and mobile banking (bKash/Nagad). Set up 2-Factor Authentication (2FA) using a secret, secondary SIM card."
    });
    checklist.push({
      id: "s_dig3",
      text: "Disable location sharing, GPS services, and history tracking on all mobile applications."
    });
  }

  if (choices.orderOfProtection) {
    checklist.push({
      id: "s_prot1",
      text: "Keep a certified copy of your court Protection Order (under the Domestic Violence Act, 2010) with you at all times. Leave extra copies at your place of employment and with trusted neighbors."
    });
    checklist.push({
      id: "s_prot2",
      text: "Notify your local Thana and Ward Commissioner's office that you hold a Protection Order against the offender, providing their photo if available."
    });
  }

  return checklist;
};

/**
 * Utility to download formatted incident report as a General Diary (GD) draft text file.
 * @param {object} report - Report data.
 */
window.downloadReport = function(report) {
  const content = `To:
The Officer-in-Charge (OC)
${report.incidentLocation || '[Name of Thana / Police Station]'} Police Station,
${report.incidentLocation ? '' : 'Dhaka, '}Bangladesh.

Subject: Lodging of General Diary (GD) regarding occurrence of ${report.incidentType || 'Harassment'}.

Dear Sir/Madam,
I, the undersigned, ${report.survivorName || 'Not Provided (Anonymous)'}, safe contact: ${report.contactInfo || 'Not Provided'}, safe to contact: ${report.safeToContact ? 'YES' : 'NO / BY APPOINTMENT'}, wish to state that on ${report.incidentDateTime || '[Date/Time of Incident]'}, the following incident took place in your jurisdiction:

-----------------------------------------------------------
INCIDENT DESCRIPTION (GD CHRONOLOGY)
-----------------------------------------------------------
Violation Category: ${report.incidentType || 'Harassment'}
Date & Time: ${report.incidentDateTime || 'Not Provided'}
Specific Location: ${report.incidentLocation || 'Not Provided'}

Description:
${report.incidentDescription || 'No description provided.'}

-----------------------------------------------------------
CORROBORATIVE EVIDENCE & WITNESS DETAILS
-----------------------------------------------------------
Witnesses present:
${report.witnesses || 'None logged.'}

Digital / Physical Evidence logged (such as Facebook links, chat screenshots, or medical papers):
${report.evidenceLog || 'None logged.'}

-----------------------------------------------------------
Under the circumstances, I request you to record this matter in the General Diary (GD book) of the police station for security purposes and legal record.

Sincerely,
${report.survivorName || 'Not Provided (Anonymous)'}

Date: ${new Date().toLocaleDateString()}
Generated securely via JustiSafe Bangladesh Portal. All calculations kept strictly local.
===========================================================`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `JustiSafe_GD_Draft_${report.incidentType.replace(/\s+/g, '_') || 'General'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
