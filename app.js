'use strict';

// proficiency levels — 0 to 3
const LEVELS = [
  { value: 0, label: 'Not started' },
  { value: 1, label: 'Basic' },
  { value: 2, label: 'Comfortable' },
  { value: 3, label: 'Can build' }
];

// role data — skills grouped by category, each with a free resource link
const ROLES = {
  'java-backend': {
    title: 'Java Backend Developer',
    skills: [
      // Core language
      { name: 'Java & OOP',              required: 3, priority: 'High',   category: 'Core',  resource: 'https://docs.oracle.com/javase/tutorial/',           why: 'Java and OOP are the core of backend development — most of the work happens here.' },
      { name: 'Collections & exceptions', required: 2, priority: 'High',   category: 'Core',  resource: 'https://docs.oracle.com/javase/tutorial/collections/', why: 'You need these to write logic that handles real data without crashing.' },
      // Data
      { name: 'SQL & database design',   required: 2, priority: 'High',   category: 'Data',  resource: 'https://sqlbolt.com/',                                why: 'Backend apps almost always read/write from a database.' },
      { name: 'JDBC',                    required: 2, priority: 'High',   category: 'Data',  resource: 'https://docs.oracle.com/javase/tutorial/jdbc/',       why: 'How Java actually talks to a relational database.' },
      // Frameworks & tools
      { name: 'HTTP & REST APIs',        required: 2, priority: 'High',   category: 'Tools', resource: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', why: 'Most backend services expose or consume REST endpoints.' },
      { name: 'Spring Boot',             required: 2, priority: 'High',   category: 'Tools', resource: 'https://spring.io/quickstart',                        why: 'Very common in internship projects — worth getting familiar with.' },
      // Quality
      { name: 'Testing (JUnit basics)',  required: 2, priority: 'Medium', category: 'Quality',resource: 'https://junit.org/junit5/docs/current/user-guide/',   why: 'Writing at least basic tests shows you care about code quality.' },
      { name: 'Git & GitHub',            required: 2, priority: 'Medium', category: 'Tools', resource: 'https://learngitbranching.js.org/',                   why: 'Every team uses version control, no exceptions.' }
    ],
    project: {
      title: 'Task Management REST API',
      description: 'Build a REST API to create, update, filter and complete tasks. Add DB persistence with H2/MySQL, input validation, proper error responses (4xx/5xx), and a Postman collection. Write at least 3 JUnit tests.',
      tags: ['Java', 'Spring Boot', 'SQL', 'REST API', 'JUnit']
    }
  },

  'frontend': {
    title: 'Frontend Developer',
    skills: [
      { name: 'HTML semantics',                 required: 2, priority: 'High',   category: 'Core',    resource: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', why: 'Good HTML structure is the base of every web page.' },
      { name: 'CSS layout & responsive design', required: 2, priority: 'High',   category: 'Core',    resource: 'https://flexboxfroggy.com/',                          why: 'The UI should work on phones too, not just desktop.' },
      { name: 'JavaScript fundamentals',        required: 3, priority: 'High',   category: 'Core',    resource: 'https://javascript.info/',                            why: 'You need solid JS to handle state, events and UI logic.' },
      { name: 'DOM & events',                   required: 2, priority: 'High',   category: 'Core',    resource: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents', why: 'This is how JS makes the page actually interactive.' },
      { name: 'API integration (fetch)',        required: 2, priority: 'High',   category: 'Tools',   resource: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', why: 'Most frontends fetch data from a backend at some point.' },
      { name: 'React fundamentals',             required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://react.dev/learn',                             why: 'React is the most common library in job descriptions right now.' },
      { name: 'Accessibility (a11y)',           required: 2, priority: 'Medium', category: 'Quality', resource: 'https://web.dev/learn/accessibility/',                why: 'Keyboard navigation and screen reader basics matter in every team.' },
      { name: 'Git & GitHub',                   required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://learngitbranching.js.org/',                   why: 'Needed for any team project or open source contribution.' }
    ],
    project: {
      title: 'Accessible Study Planner',
      description: 'A task planner with filters (All / Today / Done), due-date sorting, localStorage persistence, keyboard navigation, and WCAG-compliant colour contrast. Write a Lighthouse accessibility report in the README.',
      tags: ['HTML/CSS', 'JavaScript', 'Responsive', 'a11y', 'Lighthouse']
    }
  },

  'data-analyst': {
    title: 'Data Analyst',
    skills: [
      { name: 'SQL queries & joins',       required: 3, priority: 'High',   category: 'Core',    resource: 'https://sqlbolt.com/',                    why: 'You will write SQL every single day as an analyst.' },
      { name: 'Python fundamentals',       required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.learnpython.org/',             why: 'Python automates repetitive cleaning and reporting steps.' },
      { name: 'Pandas & data cleaning',   required: 2, priority: 'High',   category: 'Core',    resource: 'https://pandas.pydata.org/docs/getting_started/', why: 'Real datasets are messy — cleaning them is half the job.' },
      { name: 'Descriptive statistics',   required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.khanacademy.org/math/statistics-probability', why: 'Mean, median, variance — you need to know when to use which.' },
      { name: 'Spreadsheet analysis',     required: 2, priority: 'High',   category: 'Tools',   resource: 'https://edu.gcfglobal.org/en/excel/',     why: 'A lot of analysis still starts in Excel or Google Sheets.' },
      { name: 'Data visualisation',       required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://matplotlib.org/stable/tutorials/', why: 'A chart that tells the story clearly is more useful than the numbers alone.' },
      { name: 'Dashboard storytelling',   required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://www.tableau.com/learn/training',  why: 'The goal is insight, not just a pretty graph.' },
      { name: 'Git & documentation',      required: 1, priority: 'Low',    category: 'Quality', resource: 'https://learngitbranching.js.org/',       why: 'Makes your analysis reproducible for others (and future you).' }
    ],
    project: {
      title: 'Student Performance Insights',
      description: 'Analyse a public dataset (e.g. Kaggle student performance), clean it with Pandas, answer 5 business questions with SQL or Python, visualise findings with Matplotlib/Seaborn, and publish a Jupyter notebook with conclusions.',
      tags: ['Python', 'Pandas', 'SQL', 'Matplotlib', 'Jupyter']
    }
  },

  'qa-automation': {
    title: 'QA Automation Engineer',
    skills: [
      { name: 'Testing fundamentals',      required: 3, priority: 'High',   category: 'Core',    resource: 'https://www.guru99.com/software-testing.html', why: 'Without understanding what to test and why, automation is just noise.' },
      { name: 'Test case design',          required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.guru99.com/test-case.html',        why: 'Good test cases cover normal, boundary and failure paths.' },
      { name: 'Java or Python basics',     required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.learnpython.org/',                  why: 'You need a programming language to write automation scripts.' },
      { name: 'Web locators & DOM',        required: 2, priority: 'High',   category: 'Tools',   resource: 'https://developer.chrome.com/docs/devtools/',   why: 'Automation tools need to find page elements reliably.' },
      { name: 'Selenium / Playwright',     required: 2, priority: 'High',   category: 'Tools',   resource: 'https://www.selenium.dev/documentation/',       why: 'Browser automation is the core skill for UI test engineers.' },
      { name: 'API testing (Postman)',     required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://learning.postman.com/',                 why: 'API tests are faster and more stable than UI tests.' },
      { name: 'SQL basics',               required: 1, priority: 'Medium', category: 'Data',    resource: 'https://sqlbolt.com/',                          why: 'Useful for verifying database state after test actions.' },
      { name: 'Bug reports & Git',        required: 2, priority: 'Medium', category: 'Quality', resource: 'https://learngitbranching.js.org/',             why: 'A bug report nobody can reproduce is wasted time.' }
    ],
    project: {
      title: 'Web App Regression Test Suite',
      description: 'Write 15+ manual test cases for a demo site (e.g. SauceDemo), automate the login happy path + 2 failure scenarios in Selenium/Playwright, generate an HTML report, and document flaky test findings in a README.',
      tags: ['Selenium', 'Postman', 'Test cases', 'HTML report', 'CI-ready']
    }
  }
};

// ── DOM refs ────────────────────────────────────────────────────
const form        = document.getElementById('profileForm');
const roleSelect  = document.getElementById('roleSelect');
const skillInputs = document.getElementById('skillInputs');
let lastResult = null;

// ── Skill input rendering ───────────────────────────────────────
function renderSkillInputs() {
  const role = ROLES[roleSelect.value];
  skillInputs.innerHTML = '';

  // group by category
  const cats = {};
  role.skills.forEach((sk, i) => {
    if (!cats[sk.category]) cats[sk.category] = [];
    cats[sk.category].push({ ...sk, index: i });
  });

  Object.entries(cats).forEach(([cat, skills]) => {
    const grp = document.createElement('div');
    grp.className = 'skill-group';

    const hdr = document.createElement('p');
    hdr.className = 'skill-group-label';
    hdr.textContent = cat;
    grp.appendChild(hdr);

    skills.forEach(skill => {
      const row = document.createElement('div');
      row.className = 'skill-row';

      const lbl = document.createElement('label');
      lbl.className = 'skill-name';
      lbl.htmlFor = `skill-${skill.index}`;
      lbl.textContent = skill.name;

      const sel = document.createElement('select');
      sel.className = 'skill-level';
      sel.id   = `skill-${skill.index}`;
      sel.name = `skill-${skill.index}`;
      sel.setAttribute('aria-label', `${skill.name} proficiency`);

      LEVELS.forEach(lvl => {
        const opt = document.createElement('option');
        opt.value = String(lvl.value);
        opt.textContent = lvl.label;
        sel.appendChild(opt);
      });
      sel.value = '0';
      row.append(lbl, sel);
      grp.appendChild(row);
    });

    skillInputs.appendChild(grp);
  });

  document.getElementById('skillCount').textContent = `${role.skills.length} skills`;
}

// ── Profile reading + coverage formula ─────────────────────────
function readProfile() {
  const roleKey = roleSelect.value;
  const role    = ROLES[roleKey];
  const hours   = Math.max(2, Math.min(40, Number(document.getElementById('hoursInput').value) || 2));

  const skills = role.skills.map((skill, i) => ({
    ...skill,
    current: Number(document.getElementById(`skill-${i}`).value)
  }));

  // weighted coverage: High=3x, Medium=2x, Low=1x
  // a gap in a core skill hurts more than a gap in a minor one
  const weight = p => p === 'High' ? 3 : p === 'Medium' ? 2 : 1;
  const totalWeight   = skills.reduce((s, sk) => s + weight(sk.priority), 0);
  const coveredWeight = skills.reduce((s, sk) => s + Math.min(sk.current / sk.required, 1) * weight(sk.priority), 0);
  const coverage = Math.round((coveredWeight / totalWeight) * 100);

  const gaps = skills
    .filter(sk => sk.current < sk.required)
    .map(sk => ({ ...sk, gap: sk.required - sk.current }))
    .sort((a, b) => weight(b.priority) - weight(a.priority) || b.gap - a.gap);

  return { roleKey, role, hours, skills, coverage, gaps };
}

// ── Radar chart (plain SVG, no library) ────────────────────────
function buildRadar(skills) {
  const N = skills.length;
  const cx = 120, cy = 120, r = 90;
  const angle = i => (Math.PI * 2 * i / N) - Math.PI / 2;

  const pt = (i, frac) => {
    const a = angle(i);
    return [cx + frac * r * Math.cos(a), cy + frac * r * Math.sin(a)];
  };

  const poly = (fracs, cls) => {
    const pts = fracs.map((f, i) => pt(i, f).join(',')).join(' ');
    return `<polygon points="${pts}" class="${cls}"/>`;
  };

  // grid rings
  let svg = `<svg viewBox="0 0 240 240" class="radar-svg" aria-label="Skill radar chart" role="img">`;
  [0.33, 0.67, 1].forEach(f => {
    const pts = skills.map((_, i) => pt(i, f).join(',')).join(' ');
    svg += `<polygon points="${pts}" class="radar-grid"/>`;
  });

  // spokes + labels
  skills.forEach((sk, i) => {
    const [x1, y1] = pt(i, 0);
    const [x2, y2] = pt(i, 1);
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="radar-spoke"/>`;

    const [lx, ly] = pt(i, 1.18);
    const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle';
    // shorten label if too long
    const label = sk.name.length > 14 ? sk.name.slice(0, 13) + '…' : sk.name;
    svg += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" class="radar-label">${label}</text>`;
  });

  // required polygon
  const reqFracs = skills.map(sk => sk.required / 3);
  svg += poly(reqFracs, 'radar-required');

  // actual polygon
  const actFracs = skills.map(sk => sk.current / 3);
  svg += poly(actFracs, 'radar-actual');

  // dots on actual
  skills.forEach((sk, i) => {
    const [dx, dy] = pt(i, sk.current / 3);
    svg += `<circle cx="${dx}" cy="${dy}" r="4" class="radar-dot"/>`;
  });

  svg += `</svg>`;
  return svg;
}

// ── Roadmap builder ─────────────────────────────────────────────
function buildRoadmap(result) {
  const { gaps, hours } = result;
  const pick = i => gaps.length ? gaps[i % gaps.length].name : 'your current skills';
  const proj = result.role.project.title;

  const weeks = [
    [
      `Study ${pick(0)} — read one good resource and write a 5-line summary in your own words.`,
      `Complete two short exercises for ${pick(0)} and note every point you got stuck on.`,
      `List what you already understand vs what still needs practice.`,
      `Set up a GitHub repo for ${proj} and commit a basic project structure.`
    ],
    [
      `Move to ${pick(1)} — explain the core idea out loud without looking at notes.`,
      `Build a small example combining ${pick(0)} and ${pick(1)}. Push it to GitHub.`,
      `Test with one normal input and one edge/failure case — document both results.`,
      `Fix bugs, add a short comment explaining the trickiest part.`
    ],
    [
      `Implement the first real feature of ${proj} using ${pick(0)}.`,
      `Add input validation and a clear error message for at least one failure case.`,
      `Do a self-review: would a stranger understand this code without explanation?`,
      `Record a 1-minute screen demo of the feature working.`
    ],
    [
      `Finish the main workflow of ${proj} end-to-end.`,
      `Write a README: setup steps, what it does, how to test it, known limitations.`,
      `Rehearse a 2-minute project explanation — include one technical trade-off you made.`,
      `Re-rate your skills honestly and set the next target to improve.`
    ]
  ];

  return weeks.map((tasks, w) => ({
    title: `Week ${w + 1}`,
    meta:  `~${Math.max(1, Math.round(hours / 4))}h`,
    focus: pick(w),
    tasks
  }));
}

// ── Small DOM helper ────────────────────────────────────────────
function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls)               node.className   = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

// ── Main render ─────────────────────────────────────────────────
function renderAnalysis(result) {
  lastResult = result;

  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('resultsContent').classList.remove('hidden');

  document.getElementById('resultRole').textContent = result.role.title;
  document.getElementById('resultSummary').textContent = result.gaps.length
    ? `${result.gaps.length} skill gap${result.gaps.length > 1 ? 's' : ''} found. Tackle the high-priority ones first and apply each one in your project.`
    : 'Your self-ratings match all requirements. Validate against real job postings and start building your portfolio project.';

  document.getElementById('coverageValue').textContent = `${result.coverage}%`;
  document.getElementById('coverageBar').style.width   = `${result.coverage}%`;
  document.getElementById('gapValue').textContent      = String(result.gaps.length);
  document.getElementById('hoursValue').textContent    = `${result.hours}h`;

  // radar chart
  document.getElementById('radarChart').innerHTML = buildRadar(result.skills);

  // gap list with resource links
  const gapList = document.getElementById('gapList');
  gapList.innerHTML = '';
  const topGaps = result.gaps.slice(0, 6);
  if (!topGaps.length) {
    gapList.appendChild(el('p', 'ai-intro', 'No gaps against this template. Cross-check with real job postings to confirm nothing is missing.'));
  }
  topGaps.forEach(sk => {
    const row  = el('div', 'gap-item');
    const info = el('div', 'gap-info');
    const nameRow = el('div', 'gap-name-row');
    nameRow.append(el('b', '', sk.name));
    if (sk.resource) {
      const link = document.createElement('a');
      link.href = sk.resource;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.className = 'resource-link';
      link.textContent = 'Free resource ↗';
      nameRow.appendChild(link);
    }
    info.appendChild(nameRow);
    info.appendChild(el('small', 'gap-levels', `Need: ${LEVELS[sk.required].label}  ·  You: ${LEVELS[sk.current].label}`));
    info.appendChild(el('p', 'gap-why', sk.why));
    const badge = el('span', `priority${sk.priority === 'Medium' ? ' medium' : sk.priority === 'Low' ? ' low' : ''}`, `${sk.priority}`);
    row.append(info, badge);
    gapList.appendChild(row);
  });

  // roadmap
  const roadmapList = document.getElementById('roadmapList');
  roadmapList.innerHTML = '';
  const weeks    = buildRoadmap(result);
  const storeKey = `roleready-tasks-${result.roleKey}`;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (_) { saved = {}; }

  weeks.forEach((week, wi) => {
    const card = el('div', 'roadmap-week');
    const head = el('div', 'week-head');
    const headLeft = el('div', 'week-head-left');
    headLeft.append(el('b', '', week.title), el('span', 'week-focus', week.focus));
    head.append(headLeft, el('span', 'week-meta', week.meta));
    const list = el('div', 'task-list');

    week.tasks.forEach((task, ti) => {
      const id    = `${wi}-${ti}`;
      const label = el('label', `task-line${saved[id] ? ' completed' : ''}`);
      const cb    = document.createElement('input');
      cb.type    = 'checkbox';
      cb.checked = Boolean(saved[id]);

      cb.addEventListener('change', () => {
        label.classList.toggle('completed', cb.checked);
        saved[id] = cb.checked;
        try { localStorage.setItem(storeKey, JSON.stringify(saved)); } catch (_) {}
        updateProgress();
      });

      label.append(cb, el('span', '', task));
      list.appendChild(label);
    });

    card.append(head, list);
    roadmapList.appendChild(card);
  });
  updateProgress();

  // project idea
  document.getElementById('projectTitle').textContent       = result.role.project.title;
  document.getElementById('projectDescription').textContent = result.role.project.description;
  const tagsEl = document.getElementById('projectTags');
  tagsEl.innerHTML = '';
  result.role.project.tags.forEach(t => tagsEl.appendChild(el('span', '', t)));

  // reset guidance
  document.getElementById('guidanceOutput').innerHTML = '';
  document.getElementById('guidanceOutput').classList.add('hidden');
  document.getElementById('guidanceButton').disabled = false;
}

// ── Progress bar ────────────────────────────────────────────────
function updateProgress() {
  const all  = [...document.querySelectorAll('.task-line input[type="checkbox"]')];
  const done = all.filter(cb => cb.checked).length;
  document.getElementById('taskProgressText').textContent = `${done} of ${all.length} tasks done`;
  document.getElementById('taskProgressBar').style.width  = all.length ? `${Math.round(done / all.length * 100)}%` : '0%';
}

// ── Local guidance fallback ──────────────────────────────────────
function localGuidance(result) {
  if (!result.gaps.length) {
    return {
      intro: `Your self-ratings already meet the ${result.role.title} template.`,
      points: [
        'Validate against 2–3 real entry-level job postings — requirements shift over time.',
        'Start the portfolio project now — a live GitHub repo is stronger than ratings alone.',
        'Consider getting one skill independently assessed (mock interview, coding challenge, etc.).'
      ],
      note: 'Local rule-based guidance · not a live AI response.'
    };
  }
  return {
    intro: `Top areas to focus on for ${result.role.title}:`,
    points: result.gaps.slice(0, 3).map(
      (sk, i) => `${i + 1}. ${sk.name} — ${sk.why}`
    ).concat([
      `With ${result.hours}h/week: spend ~40% reading, ~40% building, ~20% reviewing what you actually understood.`,
      'Push every exercise to GitHub, even small ones — it builds your commit history.'
    ]),
    note: 'Local rule-based guidance · not a live AI response.'
  };
}

function renderGuidance(obj) {
  const out = document.getElementById('guidanceOutput');
  out.innerHTML = '';

  const intro = el('p', 'guidance-intro', obj.intro);
  const list  = document.createElement('ul');
  list.className = 'guidance-list';
  obj.points.forEach(pt => {
    const li = document.createElement('li');
    li.textContent = pt;
    list.appendChild(li);
  });
  const note = el('p', 'guidance-note', obj.note);
  out.append(intro, list, note);
  out.classList.remove('hidden');
}

// ── AI guidance request ─────────────────────────────────────────
async function requestGuidance() {
  if (!lastResult) return;

  const btn    = document.getElementById('guidanceButton');
  const output = document.getElementById('guidanceOutput');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Loading…';
  output.classList.add('hidden');

  try {
    const res = await fetch('api/ai-guidance', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role:         lastResult.role.title,
        hoursPerWeek: lastResult.hours,
        gaps:         lastResult.gaps.map(g => ({ name: g.name, priority: g.priority, reason: g.why })),
        project:      lastResult.role.project.title
      })
    });
    if (!res.ok) throw new Error('no server');
    const data = await res.json();
    if (data && data.ok && typeof data.guidance === 'string') {
      renderGuidance({
        intro:  `AI guidance for ${lastResult.role.title}:`,
        points: data.guidance.split('\n').filter(l => l.trim()),
        note:   'Source: configured AI service.'
      });
    } else {
      throw new Error('not configured');
    }
  } catch (_) {
    renderGuidance(localGuidance(lastResult));
  }

  btn.disabled = false;
  btn.innerHTML = 'Refresh guidance <span aria-hidden="true">✦</span>';
}

// ── Copy plan to clipboard ──────────────────────────────────────
function copyPlan() {
  if (!lastResult) return;
  const { role, coverage, gaps } = lastResult;
  const weeks = buildRoadmap(lastResult);

  let text = `RoleReady AI — ${role.title}\nSkill Coverage: ${coverage}%\n\n`;
  text += `TOP GAPS:\n`;
  gaps.slice(0, 5).forEach((sk, i) => {
    text += `${i + 1}. ${sk.name} [${sk.priority}] — need: ${LEVELS[sk.required].label}, you: ${LEVELS[sk.current].label}\n`;
  });
  text += `\n4-WEEK PLAN:\n`;
  weeks.forEach(w => {
    text += `\n${w.title} (~${w.meta}):\n`;
    w.tasks.forEach((t, i) => { text += `  ${i + 1}. ${t}\n`; });
  });
  text += `\nProject: ${role.project.title}\n${role.project.description}\n`;
  text += `\nGenerated by RoleReady AI · SDG 8`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyPlanBtn');
    btn.textContent = 'Copied! ✓';
    setTimeout(() => { btn.textContent = 'Copy plan'; }, 2000);
  }).catch(() => {
    alert('Could not access clipboard. Try copying manually.');
  });
}

// ── Print / save as PDF ─────────────────────────────────────────
function printPlan() {
  window.print();
}

// ── Event wiring ────────────────────────────────────────────────
roleSelect.addEventListener('change', renderSkillInputs);

form.addEventListener('submit', e => {
  e.preventDefault();
  renderAnalysis(readProfile());
  document.getElementById('resultsContent').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('resetButton').addEventListener('click', () => {
  form.reset();
  renderSkillInputs();
  lastResult = null;
  document.getElementById('resultsContent').classList.add('hidden');
  document.getElementById('emptyState').classList.remove('hidden');
});

document.getElementById('guidanceButton').addEventListener('click', requestGuidance);
document.getElementById('copyPlanBtn').addEventListener('click', copyPlan);
document.getElementById('printPlanBtn').addEventListener('click', printPlan);

renderSkillInputs();
