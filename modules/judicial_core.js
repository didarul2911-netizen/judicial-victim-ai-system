// Mapped Legacy PDF Judgments for Project 1.1 (Precedent Parser)
window.legacyJudgments = {
  sample1: {
    title: "Rahim Uddin v. Karim Ali (Land Property Title Dispute)",
    rawText: `IN THE COURT OF THE DISTRICT JUDGE AT DHAKA.
Title Suit No. 402 of 2012.
Rahim Uddin (Plaintiff) vs. Karim Ali (Respondent).
Date of Decision: 14th April 2015.
Presiding Judge: Judge A. K. M. Rahman.

--- JUDGMENT ---
This suit was instituted for declaration of title and recovery of possession of the schedule land measuring 12 decimals under CS Plot 1024, Khatian 85. The plaintiff asserts ownership through registered sale deed No. 3409 dated 12/05/1978 from original owner. The respondent Karim Ali claims oral tenancy and continuous possession since 1990 without partition.

Upon hearing both parties and examining evidence, this court finds that CS Plot 1024 was indeed transferred to the plaintiff in 1978. Under Land Law principles, possession follows registered title. An oral lease cannot defeat a registered deed of title unless supported by tenancy receipts, which the respondent failed to produce.

Order:
The suit is decreed in favor of the plaintiff. It is declared that the plaintiff Rahim Uddin has clear title. Respondent is directed to deliver peaceful possession of the suit property within 60 days of this decree, failing which plaintiff is at liberty to recover through court execution.`,
    metadata: {
      court: "District Court of Dhaka",
      citation: "TS-402-2012-DHAKA",
      date: "April 14, 2015",
      judge: "Judge A. K. M. Rahman",
      caseType: "Land & Property Suit",
      plaintiff: "Rahim Uddin",
      defendant: "Karim Ali",
      ratioDecidendi: "Possession follows title. In disputes between a registered deed owner and an oral possessor, the registered title prevails unless a legal tenancy or adverse possession is established by documentary evidence.",
      holdings: "Title declared for Plaintiff. Defendant ordered to vacate and deliver possession within 60 days.",
      ocrConfidence: "96.4%"
    }
  },
  sample2: {
    title: "State v. John Doe (Criminal Assault Section 326)",
    rawText: `IN THE COURT OF SESSION FOR THE WESTERN DISTRICT.
Sessions Case No. 89 of 2018.
State (Prosecution) vs. John Doe (Accused).
Date of Decision: 8th October 2019.
Presiding Judge: Justice Sarah Williams.

--- JUDGMENT ---
The accused John Doe is charged with offenses under Section 324 and 326 of the Penal Code for causing grievous hurt with a lethal weapon (knife) to complainant James Smith on the night of August 14, 2018, at the Metro Transit Plaza.

The defense argues self-defense, claiming Smith provoked the physical altercation. The prosecution produced three eyewitnesses, including security guard Marcus Vance, who testified that the accused pulled out a pocketknife after a verbal dispute and struck the victim twice. Complainant suffered a 4-inch deep laceration to the abdominal wall, verified by medical officer report Ex-B.

This court holds that the claim of self-defense is unsustainable. The retaliatory action by Doe using a deadly weapon far exceeded any proportional threat. Eye-witness testimony corroborated by instant medical records is sufficient to prove guilt beyond reasonable doubt.

Order:
Accused John Doe is found guilty of the charge under Section 326 of the Penal Code. He is sentenced to 3 years of rigorous imprisonment and a fine of $1,000, default of which adds 3 months simple custody.`,
    metadata: {
      court: "Sessions Court of Western District",
      citation: "SC-89-2018-WEST",
      date: "October 8, 2019",
      judge: "Justice Sarah Williams",
      caseType: "Criminal Assault",
      plaintiff: "State (Prosecution)",
      defendant: "John Doe",
      ratioDecidendi: "Right to private defense is strictly defensive, not punitive. Retaliatory force using a weapon is disproportionate if the threat does not warrant a reasonable apprehension of death or grievous bodily harm.",
      holdings: "Accused convicted under Section 326 Penal Code. Sentenced to 3 years rigorous imprisonment and $1,000 fine.",
      ocrConfidence: "98.1%"
    }
  },
  sample3: {
    title: "Apex Technologies v. Matrix Solutions (Contractual Arbitration)",
    rawText: `IN THE HIGH COURT DIVISION (COMMERCIAL BENCH).
Company Matter No. 115 of 2020.
Apex Technologies Ltd. (Petitioner) vs. Matrix Software Solutions Inc. (Respondent).
Date of Decision: 22nd July 2021.
Presiding Judge: Justice M. H. Kamal.

--- JUDGMENT ---
This petition is filed for enforcement of liquidated damages of $120,000 arising from a breach of software infrastructure service levels. Under the Service Agreement dated 10/10/2019, milestone delivery of the cloud database system was scheduled for 01/03/2020.

The respondent claims the delay was excusable under force majeure due to staff shortages. The petitioner produced communications showing Matrix Software had diverted staff to a separate higher-value project, and had missed three successive warnings prior to contract termination.

This court finds that force majeure does not cover voluntary business reallocation of staffing resources. Time was explicitly made of the essence in the delivery schedule under Clause 14. Matrix Software's failure to meet deadlines without a valid excuse constitutes a material breach, triggering the liquidated damages clause.

Order:
The petition is allowed. Respondent Matrix Software Solutions Inc. is directed to pay Apex Technologies Ltd. the sum of $120,000 within 45 days, plus interest at 6% per annum from the date of default.`,
    metadata: {
      court: "High Court Division (Commercial Bench)",
      citation: "CM-115-2020-HCD",
      date: "July 22, 2021",
      judge: "Justice M. H. Kamal",
      caseType: "Breach of Contract",
      plaintiff: "Apex Technologies Ltd.",
      defendant: "Matrix Software Solutions Inc.",
      ratioDecidendi: "Business resource reallocation does not qualify as Force Majeure. Where contracts explicitly define 'time is of the essence', failure to meet milestone deadlines constitutes a material breach triggering agreed liquidated damages.",
      holdings: "Petition allowed. Respondent ordered to pay $120,000 in liquidated damages within 45 days plus 6% interest.",
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
    { delay: 150, msg: "[OCR Engine] Initializing page scans..." },
    { delay: 300, msg: "[OCR Engine] Page 1 aligned. Running layout analysis..." },
    { delay: 450, msg: "[Layout Analyzer] Detected headers, case numbers, and signature stamps." },
    { delay: 600, msg: "[OCR Engine] Converting legacy pixel matrix to Unicode text..." },
    { delay: 750, msg: "[OCR Engine] Scan complete (Confidence level: 98%). Starting legal NLP extraction..." },
    { delay: 900, msg: "[Entity Extractor] Identifying Presiding Court, Judge, and Party Names..." },
    { delay: 1050, msg: "[NLP Classifier] Matching legal keywords with penal/civil codes..." },
    { delay: 1200, msg: "[Summary Generator] Synthesizing holdings and legal 'Ratio Decidendi'..." },
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
    } else if (textLower.includes("john doe") || textLower.includes("sessions case no. 89")) {
      matchedSample = window.legacyJudgments.sample2;
    } else if (textLower.includes("apex technologies") || textLower.includes("matrix software")) {
      matchedSample = window.legacyJudgments.sample3;
    } else {
      // General fall-back matching rules for custom pasted text
      let detectedCourt = "Unknown Jurisdiction Court";
      if (textLower.includes("high court")) detectedCourt = "High Court Division";
      else if (textLower.includes("district")) detectedCourt = "District Court";
      else if (textLower.includes("supreme")) detectedCourt = "Supreme Court";

      let detectedCaseType = "General Civil Case";
      if (textLower.includes("suit") || textLower.includes("land") || textLower.includes("property")) detectedCaseType = "Land & Civil Suit";
      else if (textLower.includes("guilty") || textLower.includes("accused") || textLower.includes("penal code")) detectedCaseType = "Criminal Matter";
      else if (textLower.includes("contract") || textLower.includes("agreement") || textLower.includes("liquidated")) detectedCaseType = "Commercial Matter";

      matchedSample = {
        metadata: {
          court: detectedCourt,
          citation: "EXTRACTED-" + Math.floor(1000 + Math.random() * 9000) + "-2026",
          date: "Extracted: May 2026",
          judge: "Presiding Bench (Unspecified)",
          caseType: detectedCaseType,
          plaintiff: "Not Mapped",
          defendant: "Not Mapped",
          ratioDecidendi: "Custom text parsed. The NLP engine indicates key legal elements relating to " + detectedCaseType + ". Details should be cross-verified by legal counsel.",
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

  // Calculate weighted adjournment risk probability
  let baseProb = 10;
  
  baseProb += pastAdj * 4.5;
  baseProb += workload * 0.25;
  baseProb += attorneyDelay * 0.35;
  baseProb += ageDays * 0.015;

  // Reason multipliers
  if (reason === "witness") baseProb += 12;
  else if (reason === "attorney") baseProb += 18;
  else if (reason === "document") baseProb += 8;
  else if (reason === "bench") baseProb += 5;

  const probability = Math.min(Math.round(baseProb), 99);

  let riskLevel = "Low";
  if (probability >= 70) riskLevel = "Critical";
  else if (probability >= 40) riskLevel = "Moderate";

  // Compile detailed insights
  const insights = [];
  if (attorneyDelay > 50) {
    insights.push(`Representing counsel has a high historical adjournment request rate (${attorneyDelay}%), which contributes significantly to the probability score.`);
  }
  if (pastAdj > 4) {
    insights.push(`This case has already been adjourned ${pastAdj} times. Prior delays indicate an ongoing procedural blockage.`);
  }
  if (workload > 70) {
    insights.push(`The assigned Bench represents a critical backlog zone (workload index: ${workload}%), leading to fewer open slots for hearings.`);
  }
  if (reason === "attorney") {
    insights.push(`Counsel scheduling conflicts represent the single most common justification for delays in this jurisdiction.`);
  }

  if (insights.length === 0) {
    insights.push("No critical delay indicators detected. Standard procedural timelines apply.");
  }

  // Compile recommendations
  const recommendations = [];
  if (riskLevel === "Critical") {
    recommendations.push("Deny further voluntary adjournment motions unless supported by severe medical affidavits.");
    recommendations.push("Initiate a mandatory pre-trial status conference within 14 days.");
    recommendations.push("Schedule backup court date availability (over-booking threshold).");
  } else if (riskLevel === "Moderate") {
    recommendations.push("Request written justification sheets from attorneys 48 hours prior to any adjournment request.");
    recommendations.push("Flag case file for administrative review by the Head clerk.");
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
  
  // Bench mappings
  const benches = [
    {
      id: "bench_land",
      name: "Land, Property & Boundary Disputes Bench",
      room: "Court Room 14 (Division Bench II)",
      workload: 85,
      keywords: ["land", "plot", "boundary", "partition", "lease", "deed", "title", "tenant", "landlord", "possession", "ejectment", "khatian"]
    },
    {
      id: "bench_criminal",
      name: "Criminal Trial & Bail Appeals Bench",
      room: "Court Room 03 (Division Bench I)",
      workload: 92,
      keywords: ["bail", "penal code", "police", "arrest", "custody", "murder", "weapon", "assault", "guilty", "charge sheet", "accused", "victim"]
    },
    {
      id: "bench_commercial",
      name: "Commercial Matters & Corporate Dispute Bench",
      room: "Court Room 21 (Single Bench III)",
      workload: 64,
      keywords: ["contract", "agreement", "corporate", "shareholder", "liquidated damages", "software", "apex", "dispute", "breach", "payment", "arbitration"]
    },
    {
      id: "bench_family",
      name: "Family Court & Matrimonial Disputes Bench",
      room: "Court Room 08 (Single Bench I)",
      workload: 42,
      keywords: ["divorce", "marriage", "custody", "maintenance", "alimony", "child", "dower", "spousal", "domestic", "minor"]
    },
    {
      id: "bench_tax",
      name: "Revenue, Taxation & Customs Bench",
      room: "Court Room 11 (Division Bench IV)",
      workload: 76,
      keywords: ["tax", "taxation", "customs", "duty", "revenue", "audit", "excise", "vat", "assessment", "income tax"]
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
  let detectedType = bestBench.name.replace(" Bench", "");

  if (maxMatches === 0) {
    finalBenchName = "General Civil & Administrative Bench";
    finalRoom = "Court Room 01 (Single Bench II)";
    finalWorkload = 55;
    detectedType = "General Civil Dispute";
    confidence = 60;
  }

  // Generate queue position
  const queuePos = Math.floor(15 + Math.random() * 30);
  const estDays = Math.ceil(queuePos * 0.6);

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
