# RoleReady AI 🎯

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://roleready-ai-lilac.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![SDG 8](https://img.shields.io/badge/UN%20SDG-8%20Decent%20Work-orange?style=flat-square)](https://sdgs.un.org/goals/goal8)
[![Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A browser-based skill-gap analyser and career roadmap tool for students preparing for entry-level tech roles. Choose from **8 in-demand roles**, select a **4, 8, or 12-week learning plan**, and get a skill radar, expert-voice gap analysis, prioritised roadmap, and MNC interview prep — all in the browser. No login, no database, no paid API required.

---

## 🔗 Live Demo

**[https://roleready-ai-lilac.vercel.app/](https://roleready-ai-lilac.vercel.app/)**

> Deployed on Vercel — goes live automatically on every push to main.

---



## ✨ What it does

- **4 role templates** — Java Backend Developer, Frontend Developer, Data Analyst, QA Automation Engineer
- **Skill self-assessment** — rate each skill on a 4-point scale (Not started → Can build)
- **Weighted coverage score** — high-priority skills count 3× more than low-priority ones
- **SVG radar chart** — visual overlay of your profile vs the role requirement
- **Priority gap list** — skills sorted by importance, each with a verified free resource link
- **Dynamic roadmap** — 4-week learning plan with tasks personalised to your top skill gaps
- **Portfolio project idea** — one concrete project per role with specific deliverables
- **Task progress** — check off tasks; state persists in `localStorage` across refreshes
- **Copy plan** — copy full gap list + roadmap to clipboard in one click
- **Save as PDF** — print-optimised layout via `window.print()`
- **Guidance** — local rule-based output by default; optional AI endpoint (Java/Tomcat) when configured

---

## 🧠 How the coverage score works

Each skill has a `required` level (1–3) and a `priority` (High / Medium / Low).

```
weight = High → 3,  Medium → 2,  Low → 1

partial_credit(skill) = min(your_level / required, 1) × weight

coverage % = round( Σ partial_credits / Σ weights × 100 )
```

This means a gap in Java & OOP (High priority) hurts the score three times more than a gap in Git (Low priority). All skills at 0 → 0%. All skills at or above required → 100%.

---

## 🚀 Run locally — no install needed

```bash
# just open the file
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

Or use VS Code Live Server / any static file server.

---

## ⚙️ Optional Java backend (AI guidance endpoint)

The guidance button works in the browser without a server. If you want it to call a real AI API:

**Requirements:** JDK 17, Maven 3.8+, Apache Tomcat 9.x

```bash
# 1. Build the WAR
cd 04_Source_Code/RoleReadyAI
mvn clean package

# 2. Set environment variables before starting Tomcat
export AI_API_KEY=your_key_here          # never hardcode this
export AI_MODEL=gpt-4o-mini
export AI_BASE_URL=https://api.openai.com/v1/chat/completions   # optional

# 3. Deploy
cp target/roleready-ai.war $CATALINA_HOME/webapps/
$CATALINA_HOME/bin/startup.sh

# 4. Open
open http://localhost:8080/roleready-ai/
```

> ⚠️ Never commit your API key. The servlet reads it from an environment variable only.

---

## 🏗️ Project structure

```
roleready-ai/
├── index.html          ← Full UI (single page)
├── styles.css          ← Dark theme, responsive, print styles
├── app.js              ← All logic: scoring, radar chart, roadmap, localStorage
├── pom.xml             ← Maven build config (optional Java backend)
├── src/
│   └── AiGuidanceServlet.java   ← Optional server-side AI endpoint
├── .github/
│   └── workflows/
│       └── ci.yml      ← GitHub Actions: runs Node tests on every push
└── README.md
```

---

## 🧪 Tests

```bash
node test_logic.js    # core logic: coverage formula, roadmap, guidance
node test_full.js     # full audit: DOM IDs, CSS classes, security, HTML structure
node test_v11.js      # v1.1 feature checks: radar, copy, print, categories
```

All 48+ automated checks pass. No browser required to run tests.

---

## 🛡️ Security notes

- No API key is ever placed in browser code or HTML
- The Java servlet reads credentials from server-side environment variables only
- No user data is sent anywhere in the browser-only version
- `localStorage` stores only task completion state (no personal info)

---

## 🎓 SDG alignment

This project is aligned with **UN Sustainable Development Goal 8 — Decent Work and Economic Growth**, which identifies skill-job mismatch as a barrier to youth employment. The tool is a learning aid; it does not predict hiring or guarantee employment.

References:
- UN SDG 8: https://sdgs.un.org/goals/goal8
- IBM SkillsBuild for Academia, Masterclass 5 training materials

---

## 📄 Limitations

- Skill templates are **sample data** — not official employer or IBM requirements
- Coverage % is **not a hiring probability**
- No live AI calls by default — requires configured server + API key
- `localStorage` resets if browser data is cleared

---

## 👤 Author

**Sarthak Sharma**
ABES Engineering College · IBM SkillsBuild Internship 2025

---

## 📝 License

[MIT](LICENSE) — free to use, modify and share with attribution.
