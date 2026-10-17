# Changelog

All notable changes to RoleReady AI are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
