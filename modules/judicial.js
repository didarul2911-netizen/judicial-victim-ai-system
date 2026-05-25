/**
 * Analyzes case text to suggest statutes, precedents, and calculate risk metrics.
 * @param {string} text - Case details or description.
 * @returns {object} - Analysis results.
 */
window.analyzeCase = function(text) {
  if (!text || text.trim().length < 10) {
    return {
      success: false,
      message: "Please enter a detailed case description (at least 10 characters)."
    };
  }

  const textLower = text.toLowerCase();
  
  // Keyword mapping categories
  const categories = {
    "Domestic Violence": ["spouse", "wife", "husband", "partner", "domestic", "abuse", "beat", "hit", "strike", "battery", "slapped", "kicked", "assaulted me", "choked", "relationship"],
    "Cyberstalking": ["online", "tweet", "post", "harass", "threaten", "email", "instagram", "facebook", "message", "chat", "cyber", "internet", "texting", "whatsapp", "computer", "stalk", "monitor"],
    "Sexual Assault": ["rape", "sexual", "abuse", "assault", "marital", "coerce", "sodomy", "intoxicated", "forced sex", "groped", "consent"],
    "Fraud & Identity Theft": ["id", "identity", "social security", "card", "fake", "forged", "counterfeit", "fraud", "immigration", "employment", "numbers", "stole my name", "bank details"]
  };

  // Determine Category matches
  let matchedCategory = "General Criminal Offense";
  let maxMatches = 0;

  for (const [category, keywords] of Object.entries(categories)) {
    const matches = keywords.filter(kw => textLower.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      matchedCategory = category;
    }
  }

  // Filter Statutes & Precedents based on the detected category
  const suggestedStatutes = window.statutes.filter(s => {
    if (matchedCategory === "Domestic Violence" && s.code.includes("113")) return true;
    if (matchedCategory === "Cyberstalking" && s.code.includes("2261A")) return true;
    if (matchedCategory === "Sexual Assault" && s.code.includes("2242")) return true;
    if (matchedCategory === "Fraud & Identity Theft" && s.code.includes("1028A")) return true;
    return false;
  });

  const suggestedPrecedents = window.precedents.filter(p => p.category === matchedCategory);

  // Calculate Risk Score
  let riskScore = 15; // baseline
  const highRiskFactors = ["kill", "murder", "weapon", "gun", "knife", "suicide", "death", "strangle", "choke", "bullet", "die", "harm myself", "hospital", "broken bone"];
  const mediumRiskFactors = ["threat", "stalk", "track", "force", "stole", "broke in", "punch", "slap", "hit", "flee", "hide", "hiding"];
  
  highRiskFactors.forEach(factor => {
    if (textLower.includes(factor)) riskScore += 25;
  });
  
  mediumRiskFactors.forEach(factor => {
    if (textLower.includes(factor)) riskScore += 10;
  });

  riskScore = Math.min(riskScore, 100);

  let riskLevel = "Low";
  if (riskScore >= 75) {
    riskLevel = "High";
  } else if (riskScore >= 40) {
    riskLevel = "Medium";
  }

  // Entity Mock Extraction
  const entities = {
    victim: "Reported Victim",
    offender: "Unspecified/Alleged Offender",
    medium: "In-Person Contact"
  };

  if (matchedCategory === "Cyberstalking") {
    entities.medium = "Digital Platforms";
    const platforms = ["twitter", "facebook", "instagram", "email", "whatsapp", "text"];
    for (const plat of platforms) {
      if (textLower.includes(plat)) {
        entities.medium = plat.charAt(0).toUpperCase() + plat.slice(1);
        break;
      }
    }
  }

  // Generate an intelligence summary paragraph
  let analysisText = "";
  if (matchedCategory === "Domestic Violence") {
    analysisText = `Based on the case details, the indicators point strongly to a cycle of intimate partner violence. The alleged conduct matches elements of 18 U.S.C. § 113 (Assault), specifically regarding physical contact and offensive behavior within the relationship. Under the precedent set by United States v. Castleman, the presence of offensive physical contact meets the threshold of domestic violence, even if severe physical injury is not documented. It is advised to file for a restraining order immediately (referencing State v. Carter to establish the history of abuse).`;
  } else if (matchedCategory === "Cyberstalking") {
    analysisText = `The digital footprints described in this report indicate a pattern of severe online harassment violating 18 U.S.C. § 2261A. The sender's intent appears to be intimidation causing substantial emotional distress. While United States v. Cassidy protects general public criticism, the targeted nature and threatening content of these posts exceed First Amendment protections and fall under actionable cyberstalking as supported by United States v. Ackell. We recommend compiling screenshots and metadata of all communications.`;
  } else if (matchedCategory === "Sexual Assault") {
    analysisText = `The details align with components of 18 U.S.C. § 2242 (Sexual Abuse). The narrative details coercion and lack of voluntary consent. In accordance with People v. Liberta, marital exemptions do not apply, and spousal status does not constitute consent. Priority focus should be placed on secure evidence collection and securing forensic exams.`;
  } else if (matchedCategory === "Fraud & Identity Theft") {
    analysisText = `The unauthorized acquisition and utilization of personal credentials constitute a federal offense under 18 U.S.C. § 1028A (Aggravated Identity Theft). Per Flores-Figueroa v. United States, the prosecution must substantiate that the defendant possessed specific knowledge that the credentials belonged to an actual person. Immediate credit freezes and dispute logs are recommended to mitigate exposure.`;
  } else {
    analysisText = `A review of the provided statement indicates general criminal activity. Further information is required to establish specific statutory violations. The case should be evaluated for local jurisdictional charges.`;
  }

  return {
    success: true,
    category: matchedCategory,
    statutes: suggestedStatutes,
    precedents: suggestedPrecedents,
    riskScore,
    riskLevel,
    entities,
    analysisText
  };
};

/**
 * Filters the precedent database.
 * @param {string} query - Case-insensitive text query.
 * @param {string} category - Category filter.
 * @returns {Array} - Matching precedents.
 */
window.searchPrecedents = function(query = "", category = "") {
  const queryLower = query.toLowerCase().trim();
  
  return window.precedents.filter(p => {
    const matchesCategory = !category || p.category === category;
    
    const matchesQuery = !queryLower || 
      p.title.toLowerCase().includes(queryLower) ||
      p.citation.toLowerCase().includes(queryLower) ||
      p.synopsis.toLowerCase().includes(queryLower) ||
      p.keywords.some(kw => kw.toLowerCase().includes(queryLower)) ||
      p.statutes.some(st => st.toLowerCase().includes(queryLower));

    return matchesCategory && matchesQuery;
  });
};

/**
 * Calculates a mock Federal sentencing guideline range.
 * @param {number} offenseLevel - Offense level (1 to 43).
 * @param {number} historyPoints - Criminal History points.
 * @returns {object} - Calculated range.
 */
window.calculateSentencing = function(offenseLevel, historyPoints) {
  offenseLevel = Math.max(1, Math.min(43, parseInt(offenseLevel) || 1));
  historyPoints = Math.max(0, parseInt(historyPoints) || 0);

  // Convert history points to US Sentencing Guidelines category (I to VI)
  let categoryNum = 1;
  let categoryRoman = "I";

  if (historyPoints >= 13) {
    categoryNum = 6;
    categoryRoman = "VI";
  } else if (historyPoints >= 10) {
    categoryNum = 5;
    categoryRoman = "V";
  } else if (historyPoints >= 7) {
    categoryNum = 4;
    categoryRoman = "IV";
  } else if (historyPoints >= 4) {
    categoryNum = 3;
    categoryRoman = "III";
  } else if (historyPoints >= 2) {
    categoryNum = 2;
    categoryRoman = "II";
  }

  // Base range calculation modeled on federal guidelines matrix rules
  // Level 1-8 are typically Zone A (Probation or 0-6 months)
  let lowEnd = 0;
  let highEnd = 0;

  if (offenseLevel <= 3) {
    lowEnd = 0;
    highEnd = 6;
  } else if (offenseLevel <= 8) {
    lowEnd = Math.max(0, (offenseLevel - 4) * 2);
    highEnd = offenseLevel + categoryNum * 2;
  } else {
    // Standard escalating formula to approximate sentencing table
    const baseVal = Math.pow(offenseLevel, 1.5) * 0.75;
    const modifier = 1 + (categoryNum - 1) * 0.18;
    
    lowEnd = Math.round(baseVal * modifier);
    highEnd = Math.round(lowEnd * 1.25) + categoryNum;
  }

  // Special Cap for 43 (Life)
  if (offenseLevel >= 43) {
    return {
      offenseLevel,
      historyPoints,
      categoryRoman,
      range: "Life Imprisonment",
      zone: "Zone D (Mandatory Confinement)",
      probationEligible: false
    };
  }

  const rangeString = `${lowEnd} - ${highEnd} Months`;
  let zone = "Zone D";
  let probationEligible = false;

  if (lowEnd === 0 && highEnd <= 6) {
    zone = "Zone A (Probation Eligible)";
    probationEligible = true;
  } else if (offenseLevel <= 11 && categoryNum === 1) {
    zone = "Zone B (Home Detention/Community Confinement Eligible)";
    probationEligible = true;
  } else if (offenseLevel <= 12 && categoryNum <= 2) {
    zone = "Zone C (Split Sentence Eligible)";
  }

  return {
    offenseLevel,
    historyPoints,
    categoryRoman,
    range: rangeString,
    zone,
    probationEligible
  };
};
