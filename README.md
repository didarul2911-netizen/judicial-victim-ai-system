# Judicial Intelligence & Victim Support System (EquiLaw & JustiSafe)

An advanced AI-powered portal designed to bridge the gap between judicial decision support and trauma-informed survivor care. This high-fidelity interactive prototype runs entirely in-browser, making it 100% private, secure, and offline.

---

## 🌟 Portals & Feature Modules

### 1. EquiLaw AI (Judicial Intelligence Database)
Designed for judges, prosecutors, public defenders, and legal researchers.
- **AI Case Analyzer**: Input a narrative testimony or incident brief. The client-side parser detects the offense category, maps federal statutes (Title 18), displays relevant Supreme Court precedents, and scores safety/violence risk.
- **Precedent & Statute Explorer**: Filter and search through landmark cases (e.g., *United States v. Castleman*, *United States v. Cassidy*) and statutory clauses.
- **Sentencing Guidelines Estimator**: Interactive sliders for Offense Level (1-43) and Criminal History Category (I-VI) calculate custodial guidelines and probation eligibility based on the advisory federal sentencing grid.

### 2. JustiSafe (Victim Support & Referral System)
Designed with a secure, trauma-informed layout for survivors of relationship abuse, cyberstalking, and sexual assault.
- **Trauma-Informed Support Chat**: An empathetic AI chatbot offering guidance, supportive replies, and quick answers depending on survivors' safety concerns.
- **Crisis Referral Directory**: Dynamic listing and filtering of emergency shelters, pro-bono legal aids, counseling centers, and national hotlines.
- **Interactive Safety Planner**: A situational questionnaire generating customized safety checklists (e.g., child-safety steps, digital privacy checklists, escaping safety measures) that survivors can download.
- **Incident Documenter**: A secure form allowing survivors to record incident logs, witness details, and evidence pathways. Updates a live, formal print sheet preview in real-time, allowing secure offline text file downloads or direct printing.

---

## 🔒 Security & Privacy Features

- **Local Execution**: All processes, forms, calculators, and chats run 100% client-side in the browser. No data is sent to external servers, protecting user safety and data privacy.
- **Emergency Quick Exit**: A persistent, red **Emergency Exit** button (also bound to the **Escape / ESC** key) immediately clears all form fields and redirects the active browser tab to Google.

---

## 🚀 How to Run the Project

### Option A: Direct Open (Zero Prerequisites - Recommended)
1. Navigate to the project directory:
   `C:\Users\didarul.islam\.gemini\antigravity\scratch\judicial-victim-ai-system\`
2. Double-click the **`index.html`** file to open it in any web browser (Chrome, Edge, Firefox, Safari).
3. No local servers are required! The application is configured to run locally without CORS issues.

### Option B: Local Web Server (If Node/npm is installed on your system)
1. Open a terminal in the project directory.
2. Install Vite:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:3000`.
