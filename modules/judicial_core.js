// Mapped Legacy PDF Judgments for Project 1.1 (Precedent Parser) - Bangladesh Context
window.legacyJudgments = {
  sample1: {
    title: "Rahim Uddin v. Karim Ali (Land Title & Partition Dispute)",
    rawText: `IN THE COURT OF THE DISTRICT JUDGE AT DHAKA.
Title Suit No. 402 of 2012.
Rahim Uddin (Plaintiff) vs. Karim Ali (Respondent).
Date of Decision: 14th April 2015.
Presiding Judge: Judge Md. Aminul Islam (District Judge).

--- JUDGMENT ---
This suit was instituted for declaration of title and partition of the scheduled land measuring 12 decimals under CS Plot 1024, Khatian 85. The plaintiff asserts ownership through registered gift deed (Heba) No. 3409 dated 12/05/1978 from original owner. The respondent Karim Ali claims oral tenancy and continuous adverse possession since 1990 without mutation.

Upon hearing both parties and examining the CS/SA Khatian records and oral depositions, this court finds that CS Plot 1024 was legally transferred to the plaintiff in 1978. Under Land Law principles of Bangladesh, possession follows registered title. An oral lease or adverse possession cannot defeat a registered Heba deed of title unless supported by official land tax receipts (Dakhila) and mutation documents, which the respondent failed to produce.

Order:
The suit is decreed in favor of the plaintiff. It is declared that the plaintiff Rahim Uddin has clear title. Respondent is directed to deliver peaceful possession of the suit property within 60 days of this decree, failing which plaintiff is at liberty to recover possession through execution proceeding (Jari Suit) under Order 21 Rule 35 of the Code of Civil Procedure.`,
    metadata: {
      court: "District Court of Dhaka",
      citation: "TS-402-2012-DHAKA",
      date: "April 14, 2015",
      judge: "Judge Md. Aminul Islam",
      caseType: "Land Dispute & Partition Suit",
      plaintiff: "Rahim Uddin",
      defendant: "Karim Ali",
      ratioDecidendi: "Possession follows title. In land disputes between a registered Heba deed owner and an oral claimant, the registered deed prevails unless adverse possession is established by mutation, khatian corrections, and land tax receipts.",
      holdings: "Title declared for Plaintiff. Defendant ordered to deliver possession within 60 days under CPC Order 21 Rule 35.",
      ocrConfidence: "96.4%"
    }
  },
  sample2: {
    title: "State v. Kalam Miah (Grievous Hurt Section 326 Penal Code)",
    rawText: `IN THE COURT OF SESSIONS, DHAKA.
Sessions Case No. 89 of 2018.
State (Prosecution) vs. Kalam Miah (Accused).
Date of Decision: 8th October 2019.
Presiding Judge: Justice M. H. Rahman (Additional Sessions Judge).

--- JUDGMENT ---
The accused Kalam Miah is charged under Section 326 of the Penal Code, 1860 for causing grievous hurt with a lethal weapon (chopper/Ramda) to complainant James Smith on the night of August 14, 2018, at the Metro Transit Plaza.

The defense argues self-defense, claiming the complainant provoked the physical altercation. The prosecution produced three eyewitnesses, including security guard Marcus Vance, who testified that the accused pulled out a Ramda after a verbal dispute and struck the victim twice. Complainant suffered a 4-inch deep laceration to the abdominal wall, verified by medical officer report Ex-B from Dhaka Medical College Hospital.

This court holds that the claim of self-defense is unsustainable. The retaliatory action by Kalam Miah using a deadly weapon (Ramda) far exceeded any proportional threat. Eye-witness testimony corroborated by instant medical records from DMCH is sufficient to prove guilt beyond reasonable doubt under Section 326 of the Penal Code.

Order:
Accused Kalam Miah is found guilty of the charge under Section 326 of the Penal Code. He is sentenced to 5 years of rigorous imprisonment and a fine of BDT 10,000, default of which adds 6 months simple custody.`,
    metadata: {
      court: "Court of Sessions, Dhaka",
      citation: "SC-89-2018-DHAKA",
      date: "October 8, 2019",
      judge: "Justice M. H. Rahman",
      caseType: "Grievous Hurt (Sec. 326)",
      plaintiff: "State (Prosecution)",
      defendant: "Kalam Miah",
      ratioDecidendi: "Right to private defense of body is strictly defensive, not punitive. Retaliatory force using a weapon like a Ramda is disproportionate if the threat does not warrant a reasonable apprehension of death or grievous bodily harm.",
      holdings: "Accused convicted under Section 326 Penal Code. Sentenced to 5 years rigorous imprisonment and BDT 10,000 fine.",
      ocrConfidence: "98.1%"
    }
  },
  sample3: {
    title: "Apex Technologies v. Matrix Solutions (Contractual Arbitration & Dispute)",
    rawText: `IN THE HIGH COURT DIVISION, DHAKA (COMMERCIAL BENCH).
Arbitration Matter No. 115 of 2020.
Apex Technologies Ltd. (Petitioner) vs. Matrix Software Solutions Inc. (Respondent).
Date of Decision: 22nd July 2021.
Presiding Judge: Justice M. H. Kamal.

--- JUDGMENT ---
This petition is filed under Section 12 of the Arbitration Act, 2001 for enforcement of liquidated damages of BDT 1,20,00,000 arising from a breach of software infrastructure service levels. Under the Service Agreement dated 10/10/2019, milestone delivery of the cloud database system was scheduled for 01/03/2020.

The respondent claims the delay was excusable under force majeure due to staff shortages. The petitioner produced communications showing Matrix Software had diverted staff to a separate higher-value project, and had missed three successive warnings prior to contract termination.

This court finds that force majeure does not cover voluntary business reallocation of staffing resources under Section 56 of the Contract Act, 1872. Time was explicitly made of the essence in the delivery schedule under Clause 14. Matrix Software's failure to meet deadlines without a valid excuse constitutes a material breach, triggering the liquidated damages clause.

Order:
The petition is allowed. Respondent Matrix Software Solutions Inc. is directed to pay Apex Technologies Ltd. the sum of BDT 1,20,00,000 within 45 days, plus interest at 6% per annum from the date of default.`,
    metadata: {
      court: "High Court Division (Commercial Bench)",
      citation: "AM-115-2020-HCD",
      date: "July 22, 2021",
      judge: "Justice M. H. Kamal",
      caseType: "Breach of Contract (Arbitration)",
      plaintiff: "Apex Technologies Ltd.",
      defendant: "Matrix Software Solutions Inc.",
      ratioDecidendi: "Business resource reallocation does not qualify as Force Majeure under the Contract Act. Where contracts explicitly define 'time is of the essence', failure to meet milestone deadlines constitutes a material breach triggering agreed liquidated damages under Section 55 and 74.",
      holdings: "Petition allowed. Respondent ordered to pay BDT 1,20,00,000 in liquidated damages within 45 days plus 6% interest.",
      ocrConfidence: "95.7%"
    }
  }
};

// ---------------------------------------------------------
// Project 1.1: Precedent Parser Logic
// ---------------------------------------------------------
window.getParserSample = function(sampleId) {
  return window.legacyJudgments[sampleId] || null;
};

window.parseLegacyText = function(text, onLogCallback, onCompleteCallback) {
  const ocrSteps = [
    { delay: 150, msg: "[OCR Engine] Initializing scanning metrics..." },
    { delay: 300, msg: "[OCR Engine] Page 1 aligned. Running layout analysis..." },
    { delay: 450, msg: "[Layout Analyzer] Detected headers, Case No. (Title Suit/Sessions Case), and seal stamps." },
    { delay: 600, msg: "[OCR Engine] Converting Bengali/English text pixels to Unicode..." },
    { delay: 750, msg: "[OCR Engine] Scan complete (Confidence level: 98%). Starting legal NLP extraction..." },
    { delay: 900, msg: "[Entity Extractor] Identifying Court, Presiding Judge, and Party Names..." },
    { delay: 1050, msg: "[NLP Classifier] Matching legal keywords with Penal Code, 1860 & CrPC..." },
    { delay: 1200, msg: "[Summary Generator] Synthesizing holdings and ratio decidendi..." },
    { delay: 1350, msg: "[JSON Builder] Validating structured metadata schema..." },
    { delay: 1500, msg: "[Success] Parsing completed. Saving output." }
  ];

  // Run simulated logs step-by-step
  ocrSteps.forEach(step => {
    setTimeout(() => {
      onLogCallback(step.msg);
    }, step.delay);
  });

  // Calculate parsed result on completion
  setTimeout(() => {
    const textLower = text.toLowerCase();
    let matchedSample = null;

    // Detect if they pasted one of our samples
    if (textLower.includes("rahim uddin") || textLower.includes("karim ali")) {
      matchedSample = window.legacyJudgments.sample1;
    } else if (textLower.includes("kalam miah") || textLower.includes("sessions case no. 89")) {
      matchedSample = window.legacyJudgments.sample2;
    } else if (textLower.includes("apex technologies") || textLower.includes("matrix software")) {
      matchedSample = window.legacyJudgments.sample3;
    } else {
      // General fall-back matching rules for custom pasted text
      let detectedCourt = "District Court of Dhaka";
      if (textLower.includes("high court")) detectedCourt = "High Court Division, Supreme Court";
      else if (textLower.includes("tribunal")) detectedCourt = "Cyber/Nari o Shishu Tribunal";
      else if (textLower.includes("sessions")) detectedCourt = "Sessions Court";

      let detectedCaseType = "General Civil Suit";
      if (textLower.includes("suit") || textLower.includes("land") || textLower.includes("khatian") || textLower.includes("plot")) detectedCaseType = "Land & Partition Suit";
      else if (textLower.includes("guilty") || textLower.includes("accused") || textLower.includes("penal code") || textLower.includes("sec")) detectedCaseType = "Criminal Offence";
      else if (textLower.includes("contract") || textLower.includes("agreement") || textLower.includes("arbitration")) detectedCaseType = "Commercial Matter";

      matchedSample = {
        metadata: {
          court: detectedCourt,
          citation: "BD-EXTRACTED-" + Math.floor(1000 + Math.random() * 9000) + "-2026",
          date: "Extracted: May 2026",
          judge: "Presiding Bench (Unspecified)",
          caseType: detectedCaseType,
          plaintiff: "Not Mapped",
          defendant: "Not Mapped",
          ratioDecidendi: "Custom text parsed. The NLP engine indicates key legal elements relating to " + detectedCaseType + " in Bangladesh. Verify with local Advocates.",
          holdings: "Parsed holding terms suggest local decree. Details require full context mapping.",
          ocrConfidence: "89.2% (Custom text)"
        }
      };
    }

    onCompleteCallback(matchedSample.metadata);
  }, 1600);
};

// ---------------------------------------------------------
// Project 1.2: Adjournment Predictor Logic
// ---------------------------------------------------------
window.predictAdjournments = function(params) {
  const pastAdj = parseInt(params.pastAdjournments) || 0;
  const workload = parseInt(params.benchWorkload) || 0;
  const attorneyDelay = parseInt(params.attorneyDelayRate) || 0;
  const ageDays = parseInt(params.caseAgeDays) || 0;
  const reason = params.delayReason || "other";

  // Calculate weighted adjournment risk probability based on Bangladeshi conditions
  let baseProb = 15; // Higher baseline in Bangladesh due to backlog
  
  baseProb += pastAdj * 5;
  baseProb += workload * 0.25;
  baseProb += attorneyDelay * 0.3;
  baseProb += ageDays * 0.01;

  // Reason multipliers tailored for Bangladesh
  if (reason === "hartal") baseProb += 15; // Strikes/political events
  else if (reason === "witness") baseProb += 10; // Witness not turning up
  else if (reason === "advocate") baseProb += 20; // Advocate busy in another court
  else if (reason === "power") baseProb += 5; // Power cuts/system down
  else if (reason === "leave") baseProb += 8; // Judge on leave

  const probability = Math.min(Math.round(baseProb), 99);

  let riskLevel = "Low";
  if (probability >= 75) riskLevel = "Critical";
  else if (probability >= 45) riskLevel = "Moderate";

  // Compile detailed insights
  const insights = [];
  if (attorneyDelay > 50) {
    insights.push(`Opposing Advocate has a high historical adjournment request rate (${attorneyDelay}%), which contributes significantly to delay risks.`);
  }
  if (pastAdj > 4) {
    insights.push(`This case has already been adjourned ${pastAdj} times. Prior delays indicate structural bottlenecks in hearings.`);
  }
  if (workload > 70) {
    insights.push(`The assigned Tribunal/Court represents a backlog zone (workload index: ${workload}%), leading to fewer open slots.`);
  }
  if (reason === "advocate") {
    insights.push(`Advocates citing scheduling conflicts in different benches (High Court vs. Lower Court) represent the single most common cause for delay in Dhaka.`);
  } else if (reason === "hartal") {
    insights.push(`Hartals, strikes, or administrative closures disrupt transportation, resulting in automatic adjourning of case lists.`);
  }

  if (insights.length === 0) {
    insights.push("No critical delay indicators detected. Standard procedural timelines apply.");
  }

  // Compile recommendations
  const recommendations = [];
  if (riskLevel === "Critical") {
    recommendations.push("Decline further voluntary adjournment requests under Order 17 Rule 1 CPC unless supported by exceptional medical certificates.");
    recommendations.push("Direct parties to submit written arguments and execute evidence commission (investigator) to prevent further delay.");
    recommendations.push("Recommend administrative transfer to a fast-track or special tribunal if workload remains above 80%.");
  } else if (riskLevel === "Moderate") {
    recommendations.push("Require advocates to submit written application sheets 24 hours prior to requesting adjournments.");
    recommendations.push("Impose compensatory costs (under Section 35A/35B CPC) for requests made on frivolous grounds.");
  } else {
    recommendations.push("Maintain standard scheduling docket queue.");
  }

  return {
    probability,
    riskLevel,
    insights,
    recommendations
  };
};

// ---------------------------------------------------------
// Project 1.3: Smart Docketing System Logic
// ---------------------------------------------------------
window.matchCaseToBench = function(text) {
  if (!text || text.trim().length < 10) {
    return {
      success: false,
      message: "Please enter petition details (at least 10 characters)."
    };
  }

  const textLower = text.toLowerCase();
  
  // Bench mappings - Localized for Bangladesh
  const benches = [
    {
      id: "bench_land",
      name: "Land Survey & Civil Court Bench",
      room: "Court Room 14 (District Judge Building, Dhaka)",
      workload: 85,
      keywords: ["land", "plot", "boundary", "partition", "lease", "deed", "title", "tenant", "landlord", "possession", "ejectment", "khatian", "heba", "cs", "sa", "rs", "bs", "dakhila", "mutation"]
    },
    {
      id: "bench_criminal",
      name: "Nari O Shishu Nirjatan Daman Tribunal",
      room: "Court Room 03 (Metropolitan Sessions Court, Dhaka)",
      workload: 92,
      keywords: ["bail", "penal code", "police", "arrest", "custody", "murder", "weapon", "assault", "guilty", "charge sheet", "accused", "victim", "rape", "women", "children", "dowry", "oppression"]
    },
    {
      id: "bench_cyber",
      name: "Cyber Security Tribunal Bangladesh",
      room: "Court Room 21 (Old High Court Building, Dhaka)",
      workload: 74,
      keywords: ["cyber", "facebook", "stalking", "harassment", "email", "online", "tweet", "whatsapp", "defamation", "identity fraud", "digital security", "csa", "dsa", "hacking"]
    },
    {
      id: "bench_commercial",
      name: "Commercial & Arbitration Division Bench",
      room: "Court Room 11 (High Court Division, Annex 08)",
      workload: 64,
      keywords: ["contract", "agreement", "corporate", "shareholder", "liquidated damages", "software", "breach", "payment", "arbitration", "contract act", "company", "bill of exchange"]
    },
    {
      id: "bench_family",
      name: "Family Court & Guardianship Bench",
      room: "Court Room 08 (Joint District Judge Building, Dhaka)",
      workload: 42,
      keywords: ["divorce", "marriage", "custody", "maintenance", "dower", "spousal", "child custody", "minor", "kabinnama"]
    }
  ];

  let bestBench = benches[benches.length - 1]; // general civil falls back to last or separate
  let maxMatches = 0;
  let matchedKeywords = [];

  // Match keywords to benches
  benches.forEach(bench => {
    const matches = bench.keywords.filter(kw => {
      if (textLower.includes(kw)) {
        matchedKeywords.push(kw);
        return true;
      }
      return false;
    });

    if (matches.length > maxMatches) {
      maxMatches = matches.length;
      bestBench = bench;
    }
  });

  // Calculate confidence score based on matches
  let confidence = 55 + (maxMatches * 10);
  confidence = Math.min(confidence, 98);

  // Fallback for general matches
  let finalBenchName = bestBench.name;
  let finalRoom = bestBench.room;
  let finalWorkload = bestBench.workload;
  let detectedType = bestBench.name.replace(" Bench", "").replace(" Court", "").replace(" Tribunal", "");

  if (maxMatches === 0) {
    finalBenchName = "General Civil & Administrative Bench";
    finalRoom = "Court Room 01 (Assistant Judge Court, Dhaka)";
    finalWorkload = 55;
    detectedType = "General Civil Dispute";
    confidence = 60;
  }

  // Generate queue position
  const queuePos = Math.floor(25 + Math.random() * 50); // Higher queues in Bangladesh
  const estDays = Math.ceil(queuePos * 1.5); // Longer delays

  return {
    success: true,
    detectedCategory: detectedType,
    recommendedBench: finalBenchName,
    courtRoom: finalRoom,
    benchWorkload: finalWorkload,
    confidence: confidence + "%",
    queuePosition: queuePos,
    estimatedDays: estDays,
    matchedKeywords: [...new Set(matchedKeywords)].slice(0, 5)
  };
};
