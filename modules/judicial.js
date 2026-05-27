/**
 * Analyzes case text to suggest Bangladeshi statutes, precedents, and calculate risk metrics.
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
  
  // Keyword mapping categories for Bangladesh
  const categories = {
    "Domestic Violence": ["spouse", "wife", "husband", "partner", "domestic", "abuse", "beat", "hit", "strike", "battery", "slapped", "kicked", "assaulted me", "choked", "relationship", "dowry", "torture", "joutuk"],
    "Cyberstalking": ["online", "tweet", "post", "harass", "threaten", "email", "instagram", "facebook", "message", "chat", "cyber", "internet", "texting", "whatsapp", "computer", "stalk", "monitor", "defame", "offensive picture"],
    "Sexual Assault": ["rape", "sexual", "abuse", "assault", "forced sex", "groped", "consent", "outrage", "modesty", "shame", "nari", "shishu"],
    "Fraud & Identity Theft": ["id", "identity", "social security", "card", "fake", "forged", "counterfeit", "fraud", "employment", "numbers", "stole my name", "khatian", "deed", "cheating", "heba", "mutation"]
  };

  // Determine Category matches
  let matchedCategory = "General Criminal Offence";
  let maxMatches = 0;

  for (const [category, keywords] of Object.entries(categories)) {
    const matches = keywords.filter(kw => textLower.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      matchedCategory = category;
    }
  }

  // Filter Statutes & Precedents based on the detected category in Bangladesh
  const suggestedStatutes = window.statutes.filter(s => {
    if (matchedCategory === "Domestic Violence" && s.code.includes("Domestic Violence Act")) return true;
    if (matchedCategory === "Cyberstalking" && s.code.includes("Cyber Security Act")) return true;
    if (matchedCategory === "Sexual Assault" && s.code.includes("Nari O Shishu")) return true;
    if (matchedCategory === "Fraud & Identity Theft" && s.code.includes("Cyber Security Act Sec. 24")) return true;
    return false;
  });

  // If no specific statute matches, add a Penal Code section as fallback
  if (suggestedStatutes.length === 0) {
    if (matchedCategory === "Domestic Violence") {
      suggestedStatutes.push(window.statutes.find(s => s.code.includes("Sec. 326")) || window.statutes[0]);
    }
  }

  const suggestedPrecedents = window.precedents.filter(p => p.category === matchedCategory);

  // Calculate Risk Score (reflecting Bangladesh threat categories, like acid, dowry violence, or physical torture)
  let riskScore = 20; // baseline
  const highRiskFactors = ["kill", "murder", "weapon", "gun", "knife", "suicide", "death", "strangle", "choke", "bullet", "die", "harm myself", "hospital", "broken bone", "acid", "dowry", "joutuk", "chopper", "ramda"];
  const mediumRiskFactors = ["threat", "stalk", "track", "force", "stole", "broke in", "punch", "slap", "hit", "flee", "hide", "hiding", "facebook post", "defame", "eve-teasing"];
  
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
  } else if (riskScore >= 45) {
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

  // Generate an intelligence summary paragraph adapted for Bangladesh
  let analysisText = "";
  if (matchedCategory === "Domestic Violence") {
    analysisText = `The incident details indicate severe domestic abuse, which violates Sections 10 and 11 of the Domestic Violence (Prevention and Protection) Act, 2010. If physical force was used, charges under Section 323 or 324/326 of the Penal Code, 1860 are applicable. Under the precedent in Shirin Akhter v. State, husbands and family members are strictly liable for physical cruelty in the home. We advise petitioning the local Executive Magistrate or Family Court immediately for a formal Protection and Residence Order.`;
  } else if (matchedCategory === "Cyberstalking") {
    analysisText = `The digital harassment and stalking pattern points directly to violations of Sections 24 and 25 of the Cyber Security Act, 2024 (previously Digital Security Act). Setting up fake profiles, online stalking, or eve-teasing via digital media exceeds free speech protections and is punishable under Section 509 of the Penal Code. Following the precedent in Cyber Tribunal Dhaka cases, digital screenshots and forensic logs are fully admissible. We recommend preserving all chat timelines.`;
  } else if (matchedCategory === "Sexual Assault") {
    analysisText = `The narrative contains elements violating Section 9 of the Nari O Shishu Nirjatan Daman Ain, 2000 (rape or attempted rape) or Section 10 (sexual harassment/modesty outrage). Per the landmark ruling in State v. Shukur Ali, the courts must prioritize victim protection, swift forensic examinations, and protect victim dignity during cross-examination. Immediate medical reporting at a One-Stop Crisis Center (OCC) is strongly advised.`;
  } else if (matchedCategory === "Fraud & Identity Theft") {
    analysisText = `The unauthorized transfer or creation of forged land documents (such as fake CS/SA/RS Khatians or registered Heba deeds) is a criminal offense under Section 419/420/467/468 of the Penal Code, 1860. Per the Appellate Division ruling in Ehsanul Kabir v. Bangladesh, unregistered land transfers are void, and mutation cannot establish ownership without a valid deed. Immediate filing of a criminal cheating case or a civil declaration suit is recommended.`;
  } else {
    analysisText = `A review of the provided statement indicates general criminal activity under the Penal Code, 1860. Further information is required to establish specific statutory violations. The case should be evaluated for local jurisdictional charges in District Magistrates or Metropolitan Courts.`;
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
 * Calculates a Bangladeshi sentencing penalty range and bail eligibility under CrPC.
 * Map the USSG parameters to Bangladeshi CrPC Schedule II rules.
 * @param {number} offenseIndex - Maps to specific Penal Code sections (1 to 8).
 * @param {number} historyPoints - Criminal record points (0 to 10).
 * @returns {object} - Calculated range.
 */
window.calculateSentencing = function(offenseIndex, historyPoints) {
  const index = Math.max(1, Math.min(8, parseInt(offenseIndex) || 1));
  const points = Math.max(0, Math.min(10, parseInt(historyPoints) || 0));

  // Map of Offenses based on Penal Code, 1860 and CrPC Schedule II
  const offenses = [
    {
      section: "Sec. 509 Penal Code (Eve-teasing / Harassment)",
      range: "Up to 1 Year Imprisonment, or Fine, or Both",
      bailable: "Bailable",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Non-Compoundable",
      court: "Any Magistrate",
      baseProbation: true
    },
    {
      section: "Sec. 323 Penal Code (Voluntarily Causing Hurt)",
      range: "Up to 1 Year Imprisonment, or Fine BDT 1,000, or Both",
      bailable: "Bailable",
      cognizable: "Non-Cognizable",
      compoundable: "Compoundable",
      court: "Any Magistrate",
      baseProbation: true
    },
    {
      section: "Sec. 379 Penal Code (Theft / Plunder)",
      range: "Up to 3 Years Imprisonment, or Fine, or Both",
      bailable: "Non-Bailable",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Non-Compoundable",
      court: "Any Magistrate",
      baseProbation: false
    },
    {
      section: "Sec. 420 Penal Code (Cheating & Land Fraud)",
      range: "Up to 7 Years Imprisonment, and Fine",
      bailable: "Bailable (Often discretionary in practice)",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Compoundable (With court permission)",
      court: "Magistrate of 1st Class / Metropolitan Magistrate",
      baseProbation: true
    },
    {
      section: "Sec. 325 Penal Code (Voluntarily Causing Grievous Hurt)",
      range: "Up to 7 Years Imprisonment, and Fine",
      bailable: "Bailable",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Compoundable (With court permission)",
      court: "Magistrate of 1st Class / Court of Session",
      baseProbation: true
    },
    {
      section: "Sec. 326 Penal Code (Grievous Hurt by Deadly Weapons)",
      range: "Imprisonment for Life, or Up to 10 Years & Fine",
      bailable: "Non-Bailable",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Non-Compoundable",
      court: "Court of Sessions / Magistrate of 1st Class",
      baseProbation: false
    },
    {
      section: "Nari O Shishu Act Sec. 9(1) (Rape / Sexual Assault)",
      range: "Rigorous Imprisonment for Life, and Fine",
      bailable: "Non-Bailable (Strict custody)",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Non-Compoundable",
      court: "Nari O Shishu Nirjatan Daman Tribunal",
      baseProbation: false
    },
    {
      section: "Sec. 302 Penal Code (Murder / Homicide)",
      range: "Death Sentence, or Imprisonment for Life, and Fine",
      bailable: "Non-Bailable",
      cognizable: "Cognizable (Arrest without warrant)",
      compoundable: "Non-Compoundable",
      court: "Court of Sessions",
      baseProbation: false
    }
  ];

  const selectedOffense = offenses[index - 1];

  // Roman numbering representing Bail risk categories
  let categoryRoman = "Low Risk";
  if (points >= 7) {
    categoryRoman = "High Risk";
  } else if (points >= 4) {
    categoryRoman = "Moderate Risk";
  }

  // Calculate dynamic Bail probability percentage
  let bailChance = selectedOffense.bailable === "Bailable" ? 85 : 30;
  // Deduct based on criminal history / bail points
  bailChance -= points * 6;
  bailChance = Math.max(5, bailChance);

  // Translate to legal guidelines text
  const zoneText = `${selectedOffense.cognizable} | ${selectedOffense.bailable} | ${selectedOffense.compoundable}`;
  
  // Decide probation eligibility under Bangladeshi law
  let probationEligible = false;
  if (selectedOffense.baseProbation && points <= 4) {
    probationEligible = true;
  }

  return {
    offenseLevel: index,
    historyPoints: points,
    categoryRoman, // Holds Bail Risk Level
    range: selectedOffense.range, // Penal Code penalty description
    zone: zoneText, // CrPC Classifications
    probationEligible, // Probation availability
    sectionName: selectedOffense.section,
    courtName: selectedOffense.court,
    bailChance // Bail percentage
  };
};
