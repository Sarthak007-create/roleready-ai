# Changelog

All notable changes to RoleReady AI are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.0] — 2025-07-20

### Added
- 4 new roles: DevOps / Cloud Engineer, Full Stack Developer, Machine Learning Engineer, Cybersecurity Analyst
- Role options grouped by category (Backend / Frontend / Data / Infrastructure / Quality)
- Learning plan duration selector: 4 weeks (foundation), 8 weeks (deep build + interview prep), 12 weeks (master-level + MNC mock interviews)
- 4th metric card showing selected plan length
- 8-week plan adds: mock interview practice, open source reading, system design basics, GitHub profile polish
- 12-week plan adds: MNC company research, advanced topics, timed coding practice, full mock interview loop
- Expert-voice "why" text for every skill — written as advice from a 20+ year senior engineer
- Plan duration saved in score history (localStorage)

### Changed
- All skill "why" fields rewritten to be direct, specific, and honest — no generic advice
- Project descriptions upgraded with concrete requirements (test counts, deployment targets, specific tools)
- Roadmap tasks upgraded from generic to specific, actionable, professional-grade instructions
- Hero section updated to mention 8 roles and 3 plan durations
- Value strip updated to reflect expert guidance and flexible plan lengths
- `localStorage` key per role now also includes duration to avoid plan collisions

---

## [1.1.0] — 2025-07-14

### Added
- SVG radar chart rendered in pure JavaScript — no external library needed
- Skill categories (Core / Tools / Data / Quality) with visual group labels
- Verified resource links per skill (MDN, official docs, free courses)
- Structured four-week learning roadmap with per-task completion toggle
- Guidance output formats as a prioritised, readable list instead of raw text
- Copy-to-clipboard and Print/Save PDF buttons on the guidance panel
- Loading spinner during simulated guidance generation
- `aria-live` region so screen readers announce guidance updates
- `role=status` on the coverage indicator for accessibility

### Changed
- Coverage formula now uses per-skill weights (Core 1.5×, Tools 1.0×, Data 1.2×, Quality 1.1×)
- Roadmap tasks persist in `localStorage` — progress survives page refresh
- Reset button clears all ratings, roadmap state, and localStorage in one click
- Skill list rebuilds dynamically when the role selector changes

### Fixed
- Gap list no longer shows skills the user has already rated ≥ 4
- Coverage bar colour updates immediately on every slider interaction
- No DOM-missing errors when switching roles rapidly

---

## [1.0.0] — 2025-07-01

### Added
- Initial browser-only prototype
- Four target roles: Java Backend Developer, Frontend Developer, Data Analyst, QA Automation Engineer
- Self-rating sliders (1–5) for curated skill sets per role
- Skill-coverage percentage indicator
- Prioritised skill-gap list
- Static four-week roadmap outline
- Optional Java Servlet endpoint (requires server deployment + AI provider credentials)
- Maven `pom.xml` for WAR packaging
- `README.md`, MIT `LICENSE`, `FINAL_CHECK_REPORT.md`
