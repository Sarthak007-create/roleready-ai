'use strict';

// =============================================================
//  Full automated test for RoleReady AI
//  Runs without a browser using Node.js stubs.
// =============================================================

const fs = require('fs');
const path = require('path');

// Support both layouts: GitHub Pages root and Maven src/main/webapp
const MAVEN_BASE = path.join(__dirname, 'src/main/webapp');
const BASE = fs.existsSync(path.join(MAVEN_BASE, 'index.html')) ? MAVEN_BASE : __dirname;
const html = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8');
const js   = fs.readFileSync(path.join(BASE, 'app.js'),    'utf8');
const css  = fs.readFileSync(path.join(BASE, 'styles.css'),'utf8');

let failures = 0;
function pass(msg) { console.log('  PASS  ' + msg); }
function fail(msg) { console.error('  FAIL  ' + msg); failures++; }
function section(title) { console.log('\n── ' + title + ' ──'); }

// ── 1. DOM ID cross-check ─────────────────────────────────────
section('1. DOM ID cross-check (app.js → index.html)');

const idsInJs   = [...js.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]);
const idsInHtml = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
const uniqueJs  = [...new Set(idsInJs)];

uniqueJs.forEach(id => {
  if (idsInHtml.includes(id)) pass(`id="${id}" found in HTML`);
  else                        fail(`id="${id}" used in app.js but MISSING from index.html`);
});

// ── 2. Security — no secrets in client files ─────────────────
section('2. Security: no API key / secret in client files');

const secretPatterns = [
  { pat: /sk-[a-zA-Z0-9]{20,}/,   label: 'OpenAI-style key in app.js' },
  { pat: /AI_API_KEY\s*=/,         label: 'API key assignment in app.js' },
  { pat: /Bearer\s+[a-zA-Z0-9]/,  label: 'Bearer token in app.js' },
];
secretPatterns.forEach(({ pat, label }) => {
  if (pat.test(js))   fail(label);
  else                pass('No ' + label);
});
if (/api.key|apikey|secret/i.test(html) && !/Don't enter sensitive/i.test(html))
  fail('Possible secret reference in index.html');
else
  pass('No secrets in index.html');

// ── 3. Accessibility basics ───────────────────────────────────
section('3. Accessibility basics');

if (html.includes('lang="en"'))          pass('html[lang] set');
else                                      fail('html[lang] missing');

if (html.includes('aria-live'))          pass('aria-live region present');
else                                      fail('aria-live missing');

if (html.includes('role="status"'))      pass('role=status on guidanceOutput');
else                                      fail('role=status missing on guidanceOutput');

if (html.includes('aria-label'))         pass('aria-label attributes present');
else                                      fail('aria-label missing');

if (html.includes('type="submit"'))      pass('submit button has type');
else                                      fail('submit button missing type');

// ── 4. CSS class spot-check (classes used in JS exist in CSS) ─
section('4. CSS class spot-check');

// Classes added dynamically in app.js
const jsClasses = ['skill-row','skill-name','skill-level','gap-item','roadmap-week',
                   'week-head','task-list','task-line','completed','project-tags',
                   'guidance-output','hidden'];
jsClasses.forEach(cls => {
  if (css.includes('.' + cls) || cls === 'hidden') pass('.' + cls + ' defined or is utility');
  else                                              fail('.' + cls + ' used in app.js but not found in CSS');
});

// ── 5. Logic tests (pure functions) ──────────────────────────
section('5. Logic unit tests');

// Minimal stubs
const roleSelectStub = { value: 'java-backend' };
let getByIdFn = id => {
  if (id === 'hoursInput') return { value: '10' };
  return { value: '1' };
};
const documentStub = { getElementById: id => getByIdFn(id) };
const localStorageStub = {
  _data: {},
  getItem(k)    { return this._data[k] !== undefined ? this._data[k] : null; },
  setItem(k, v) { this._data[k] = v; }
};

// Pure-logic data — mirrors app.js exactly (kept in sync manually)
const LEVELS = [
  { value: 0, label: 'Not started' },
  { value: 1, label: 'Basic' },
  { value: 2, label: 'Comfortable' },
  { value: 3, label: 'Can build' }
];

const ROLES = {
  'java-backend': {
    title: 'Java Backend Developer',
    skills: [
      { name: 'Java & OOP',               required: 3, priority: 'High',   why: 'Java and OOP are the core of backend development — most of the work happens here.' },
      { name: 'Collections & exceptions',  required: 2, priority: 'High',   why: 'You need these to write logic that handles real data without crashing.' },
      { name: 'SQL & database design',     required: 2, priority: 'High',   why: 'Backend apps almost always read/write from a database.' },
      { name: 'JDBC',                      required: 2, priority: 'High',   why: 'How Java actually talks to a relational database.' },
      { name: 'HTTP & REST APIs',          required: 2, priority: 'High',   why: 'Most backend services expose or consume REST endpoints.' },
      { name: 'Spring Boot',               required: 2, priority: 'High',   why: 'Very common in internship projects — worth getting familiar with.' },
      { name: 'Testing fundamentals',      required: 2, priority: 'Medium', why: 'Writing at least basic tests shows you care about code quality.' },
      { name: 'Git & GitHub',              required: 2, priority: 'Medium', why: 'Every team uses version control, no exceptions.' }
    ],
    project: { title: 'Task Management REST API', description: 'Build a simple REST API.', tags: ['Java', 'REST API', 'SQL', 'Testing'] }
  },
  'frontend': {
    title: 'Frontend Developer',
    skills: [
      { name: 'HTML semantics',                    required: 2, priority: 'High',   why: 'Good HTML structure is the base of every web page.' },
      { name: 'CSS layout & responsive design',    required: 2, priority: 'High',   why: 'The UI should work on phones too, not just desktop.' },
      { name: 'JavaScript fundamentals',           required: 3, priority: 'High',   why: 'You need solid JS to handle state, events and UI logic.' },
      { name: 'DOM & events',                      required: 2, priority: 'High',   why: 'This is how JS makes the page actually interactive.' },
      { name: 'API integration',                   required: 2, priority: 'High',   why: 'Most frontends fetch data from a backend at some point.' },
      { name: 'React fundamentals',                required: 2, priority: 'Medium', why: 'React is the most common library in job descriptions right now.' },
      { name: 'Accessibility basics',              required: 2, priority: 'Medium', why: 'Keyboard navigation and screen reader basics are worth knowing.' },
      { name: 'Git & GitHub',                      required: 2, priority: 'Medium', why: 'Needed for any team project or open source contribution.' }
    ],
    project: { title: 'Accessible Study Planner', description: 'Make a task planner.', tags: ['HTML/CSS', 'JavaScript', 'Responsive UI', 'Accessibility'] }
  },
  'data-analyst': {
    title: 'Data Analyst',
    skills: [
      { name: 'Spreadsheet analysis',    required: 2, priority: 'High',   why: 'A lot of analysis still starts in Excel or Google Sheets.' },
      { name: 'SQL queries',             required: 3, priority: 'High',   why: 'You will write SQL every single day as an analyst.' },
      { name: 'Python fundamentals',     required: 2, priority: 'High',   why: 'Python automates the repetitive cleaning and reporting steps.' },
      { name: 'Pandas & data cleaning',  required: 2, priority: 'High',   why: 'Real datasets are messy — cleaning them is half the job.' },
      { name: 'Descriptive statistics',  required: 2, priority: 'High',   why: 'Mean, median, variance — you need to know when to use which.' },
      { name: 'Data visualization',      required: 2, priority: 'Medium', why: 'A chart that tells the story clearly is more useful than the numbers alone.' },
      { name: 'Dashboard storytelling',  required: 2, priority: 'Medium', why: 'The goal is insight, not just a pretty graph.' },
      { name: 'Git & documentation',     required: 1, priority: 'Low',    why: 'Makes your analysis reproducible for others (and future you).' }
    ],
    project: { title: 'Student Performance Insights', description: 'Pick a dataset.', tags: ['SQL', 'Python', 'Visualization', 'Insights'] }
  },
  'qa-automation': {
    title: 'QA Automation Engineer',
    skills: [
      { name: 'Testing fundamentals',       required: 3, priority: 'High',   why: 'Without understanding what to test and why, automation is just noise.' },
      { name: 'Test case design',           required: 2, priority: 'High',   why: 'Good test cases cover normal, boundary and failure paths.' },
      { name: 'Java or Python basics',      required: 2, priority: 'High',   why: 'You need code to write automation scripts.' },
      { name: 'Web locators & DOM',         required: 2, priority: 'High',   why: 'Automation tools need to find elements on the page reliably.' },
      { name: 'Selenium or similar tool',   required: 2, priority: 'High',   why: 'Selenium is still widely used in QA teams for browser automation.' },
      { name: 'API testing',                required: 2, priority: 'Medium', why: 'Testing the API layer is faster and more stable than UI tests.' },
      { name: 'SQL basics',                 required: 1, priority: 'Medium', why: 'Useful for checking whether the database actually got updated correctly.' },
      { name: 'Bug reports & Git',          required: 2, priority: 'Medium', why: 'A bug report nobody can reproduce is a waste of time.' }
    ],
    project: { title: 'Web App Regression Test Suite', description: 'Write test cases.', tags: ['Test cases', 'Browser automation', 'API', 'Reporting'] }
  }
};

function readProfile() {
  const roleKey = roleSelectStub.value;
  const role    = ROLES[roleKey];
  const hours   = Math.max(2, Math.min(40, Number(documentStub.getElementById('hoursInput').value) || 2));
  const skills  = role.skills.map((skill, i) => ({
    ...skill,
    current: Number(documentStub.getElementById(`skill-${i}`).value)
  }));
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

function buildRoadmap(result) {
  const { gaps, hours } = result;
  const pick = i => gaps.length ? gaps[i % gaps.length].name : 'your current skills';
  const proj = result.role.project.title;
  const weeks = [
    [
      `Read up on ${pick(0)} — one good resource, write a short summary in your own words.`,
      `Do two small exercises for ${pick(0)} and note where you got confused.`,
      `List what you already know vs what still feels unclear.`,
      `Set up a project folder and write down what you want to build for ${proj}.`
    ],
    [
      `Move to ${pick(1)} — try to explain the main idea to someone else (or just out loud).`,
      `Build a small example that uses both ${pick(0)} and ${pick(1)} together.`,
      `Test it with one normal input and one weird/edge case.`,
      `Fix any errors and add a few lines of notes on what you learned.`
    ],
    [
      `Add a feature to ${proj} that uses ${pick(0)}.`,
      `Put in some basic validation or error handling for the role.`,
      `Ask a classmate to review it or go through it yourself with fresh eyes.`,
      `Take a screenshot or short screen recording and note what still doesn't work.`
    ],
    [
      `Finish the main feature of ${proj} and walk through the whole flow once.`,
      `Write a README — setup steps, what it does, how to test it, known issues.`,
      `Practice explaining the project in two minutes and name one trade-off you made.`,
      `Re-rate the skills you worked on and pick the next thing to improve.`
    ]
  ];
  return weeks.map((tasks, w) => ({
    title: `Week ${w + 1}`,
    meta:  `${Math.max(1, Math.round(hours / 4))}h / week`,
    focus: pick(w),
    tasks
  }));
}

function localGuidance(result) {
  if (!result.gaps.length) {
    return `Your self-ratings already match the ${result.role.title} template. Try to validate this against one or two real job postings, then focus on building the portfolio project to show what you know. Note: this is a sample template, not an official employer checklist.`;
  }
  const top = result.gaps.slice(0, 3)
    .map((sk, i) => `${i + 1}. ${sk.name} (${sk.priority.toLowerCase()} priority) — ${sk.why}`)
    .join('\n');
  return `Here are the top areas to focus on for ${result.role.title}:\n${top}\n\nWith ${result.hours}h a week, try to split the time: some reading, some hands-on exercises, and some work on your project. Review what you actually understood each week.\n\n(This is local rule-based guidance from the sample template, not a live AI response.)`;
}

// 5a — all four roles at skill level 1
['java-backend', 'frontend', 'data-analyst', 'qa-automation'].forEach(key => {
  roleSelectStub.value = key;
  getByIdFn = id => {
    if (id === 'hoursInput') return { value: '10' };
    return { value: '1' };
  };
  const r = readProfile();

  if (r.coverage >= 0 && r.coverage <= 100)
    pass(`[${key}] coverage in range: ${r.coverage}%`);
  else
    fail(`[${key}] coverage out of range: ${r.coverage}%`);

  const rm = buildRoadmap(r);
  if (rm.length === 4)
    pass(`[${key}] roadmap = 4 weeks`);
  else
    fail(`[${key}] roadmap wrong week count: ${rm.length}`);

  rm.forEach((w, wi) => {
    if (w.tasks.length === 4)
      pass(`[${key}] week ${wi+1} has 4 tasks`);
    else
      fail(`[${key}] week ${wi+1} task count wrong: ${w.tasks.length}`);
  });

  if (r.gaps.length > 0)
    pass(`[${key}] gaps detected when all skills = Basic: ${r.gaps.length} gaps`);
  else
    fail(`[${key}] expected gaps at skill=1 but got 0`);
});

// 5b — zero-gap case (all skills at required level)
section('5b. Zero-gap case (all skills met)');
roleSelectStub.value = 'java-backend';
getByIdFn = id => {
  if (id === 'hoursInput') return { value: '10' };
  const m = id.match(/skill-(\d+)/);
  if (m) return { value: String(ROLES['java-backend'].skills[+m[1]].required) };
  return { value: '0' };
};
const zeroResult = readProfile();
if (zeroResult.gaps.length === 0) pass('gaps = 0 when all skills meet required');
else                               fail('expected 0 gaps, got ' + zeroResult.gaps.length);
if (zeroResult.coverage === 100)  pass('coverage = 100% when all skills met');
else                               fail('expected 100%, got ' + zeroResult.coverage + '%');

const zeroGuide = localGuidance(zeroResult);
if (zeroGuide.includes('sample template')) pass('zero-gap guidance has disclaimer');
else                                        fail('zero-gap guidance missing disclaimer');

// 5c — coverage extremes
section('5c. Coverage extremes');
roleSelectStub.value = 'frontend';
getByIdFn = () => ({ value: '0' });
const allZero = readProfile();
if (allZero.coverage === 0) pass('all-zero skills → 0% coverage');
else                         fail('all-zero skills → ' + allZero.coverage + '% (expected 0)');

roleSelectStub.value = 'frontend';
getByIdFn = id => {
  const m = id.match(/skill-(\d+)/);
  if (m) return { value: String(ROLES['frontend'].skills[+m[1]].required) };
  return { value: '0' };
};
const allFull = readProfile();
if (allFull.coverage === 100) pass('all-max skills → 100% coverage');
else                           fail('all-max skills → ' + allFull.coverage + '% (expected 100)');

// 5d — gap sort order
section('5d. Gap sort order');
roleSelectStub.value = 'data-analyst';
getByIdFn = () => ({ value: '0' });
const daResult = readProfile();
const priorityOrder = { High: 0, Medium: 1, Low: 2 };
let sortOk = true;
for (let i = 1; i < daResult.gaps.length; i++) {
  if (priorityOrder[daResult.gaps[i].priority] < priorityOrder[daResult.gaps[i-1].priority]) {
    sortOk = false;
    break;
  }
}
if (sortOk) pass('gaps sorted High → Medium → Low: ' + daResult.gaps.map(g => g.priority).join(', '));
else         fail('gap sort order wrong: ' + daResult.gaps.map(g => g.priority).join(', '));

// 5e — localGuidance gap branch
section('5e. Guidance fallback');
const gapGuide = localGuidance({
  role: ROLES['java-backend'],
  gaps: [ROLES['java-backend'].skills[0]],
  hours: 10
});
if (gapGuide.includes('rule-based'))      pass('gap guidance says "rule-based"');
else                                        fail('gap guidance missing "rule-based" label');
if (gapGuide.includes('not a live AI'))   pass('gap guidance says "not a live AI response"');
else                                        fail('gap guidance missing AI disclaimer');

// 5f — localStorage simulation (save + restore)
section('5f. localStorage save/restore simulation');
roleSelectStub.value = 'java-backend';
getByIdFn = () => ({ value: '1' });
const r = readProfile();
const storeKey = `roleready-tasks-${r.roleKey}`;
const saved = {};
saved['0-0'] = true;
saved['1-2'] = true;
try {
  localStorageStub.setItem(storeKey, JSON.stringify(saved));
  const restored = JSON.parse(localStorageStub.getItem(storeKey) || '{}');
  if (restored['0-0'] === true && restored['1-2'] === true)
    pass('localStorage save + restore works correctly');
  else
    fail('localStorage restore returned wrong values');
} catch(e) {
  fail('localStorage error: ' + e.message);
}

// 5g — partial coverage (half-rated skills)
section('5g. Partial coverage (mixed ratings)');
roleSelectStub.value = 'java-backend';
getByIdFn = id => {
  const m = id.match(/skill-(\d+)/);
  if (m) {
    const sk = ROLES['java-backend'].skills[+m[1]];
    // give exactly half the required level (floored)
    return { value: String(Math.floor(sk.required / 2)) };
  }
  return { value: '8' }; // hoursInput
};
const partial = readProfile();
if (partial.coverage > 0 && partial.coverage < 100)
  pass(`partial rating → ${partial.coverage}% (between 0 and 100)`);
else
  fail(`partial rating → ${partial.coverage}% (expected between 0 and 100)`);

// 5h — hours clamping
section('5h. Hours clamping (min=2, max=40)');
getByIdFn = id => {
  if (id === 'hoursInput') return { value: '999' };
  return { value: '1' };
};
const highHours = readProfile();
if (highHours.hours === 40) pass('hours clamped to max 40');
else                         fail('hours not clamped: got ' + highHours.hours);

getByIdFn = id => {
  if (id === 'hoursInput') return { value: '0' };
  return { value: '1' };
};
const lowHours = readProfile();
if (lowHours.hours === 2) pass('hours clamped to min 2');
else                       fail('hours not clamped to min: got ' + lowHours.hours);

// 5i — roadmap meta uses clamped hours
section('5i. Roadmap hours meta');
getByIdFn = id => {
  if (id === 'hoursInput') return { value: '8' };
  return { value: '1' };
};
roleSelectStub.value = 'frontend';
const rm8 = buildRoadmap(readProfile());
// with 8h/week → max(1, round(8/4)) = 2h/week
if (rm8[0].meta === '2h / week') pass('roadmap meta = "2h / week" for 8h input');
else                               fail('roadmap meta wrong: got "' + rm8[0].meta + '"');

// 5j — no-gap roadmap still builds with 4 weeks
section('5j. Roadmap builds even with no gaps');
roleSelectStub.value = 'java-backend';
getByIdFn = id => {
  const m = id.match(/skill-(\d+)/);
  if (m) return { value: String(ROLES['java-backend'].skills[+m[1]].required) };
  return { value: '8' };
};
const rmNoGap = buildRoadmap(readProfile());
if (rmNoGap.length === 4)     pass('roadmap has 4 weeks even with 0 gaps');
else                           fail('roadmap wrong with 0 gaps: ' + rmNoGap.length + ' weeks');
rmNoGap.forEach((w, wi) => {
  if (w.tasks.length === 4) pass(`  no-gap week ${wi+1} has 4 tasks`);
  else                       fail(`  no-gap week ${wi+1} task count: ${w.tasks.length}`);
});
// tasks should say "your current skills" not reference undefined
if (rmNoGap[0].tasks[0].includes('your current skills'))
  pass('no-gap roadmap tasks reference "your current skills"');
else
  fail('no-gap roadmap tasks text wrong: ' + rmNoGap[0].tasks[0]);

// ── 6. HTML structure checks ──────────────────────────────────
section('6. HTML structure checks');

const requiredIds = [
  'profileForm','roleSelect','hoursInput','skillInputs','skillCount',
  'emptyState','resultsContent','resultRole','resultSummary',
  'coverageValue','coverageBar','gapValue','hoursValue',
  'gapList','roadmapList','taskProgressText','taskProgressBar',
  'projectTitle','projectDescription','projectTags',
  'guidanceButton','guidanceOutput','resetButton'
];
requiredIds.forEach(id => {
  if (idsInHtml.includes(id)) pass(`required id="${id}" present`);
  else                         fail(`required id="${id}" MISSING from HTML`);
});

// hidden class on resultsContent at page load
if (html.includes('id="resultsContent" class="results-content hidden"'))
  pass('resultsContent starts hidden');
else
  fail('resultsContent should start with class "hidden"');

// guidanceOutput starts hidden
if (html.includes('id="guidanceOutput" class="guidance-output hidden"'))
  pass('guidanceOutput starts hidden');
else
  fail('guidanceOutput should start with class "hidden"');

// script tag at end of body
if (html.match(/<script src="app\.js"><\/script>\s*<\/body>/))
  pass('script tag at end of body');
else
  fail('script tag not at end of body');

// viewport meta
if (html.includes('name="viewport"'))
  pass('viewport meta present');
else
  fail('viewport meta missing');

// ── 7. No inline event handlers ──────────────────────────────
section('7. No inline event handlers in HTML');
if (/\bon\w+\s*=/.test(html)) fail('inline event handler found in HTML');
else                           pass('no inline event handlers');

// ── 8. pom.xml sanity ────────────────────────────────────────
section('8. pom.xml sanity');
const pom = fs.readFileSync(path.join(__dirname, 'pom.xml'), 'utf8');
if (pom.includes('<packaging>war</packaging>'))   pass('packaging = war');
else                                               fail('packaging != war');
if (pom.includes('javax.servlet'))                pass('servlet-api dependency present');
else                                               fail('servlet-api missing');
if (pom.includes('gson'))                         pass('gson dependency present');
else                                               fail('gson dependency missing');
if (pom.includes('<maven.compiler.release>17'))   pass('Java 17 compiler target');
else                                               fail('compiler release not 17');
if (pom.includes('<failOnMissingWebXml>false'))   pass('failOnMissingWebXml=false (no web.xml needed)');
else                                               fail('failOnMissingWebXml not set');

// ── 9. Servlet sanity ────────────────────────────────────────
section('9. AiGuidanceServlet.java sanity');
const servlet = fs.readFileSync(
  path.join(__dirname, 'src/main/java/com/roleready/servlet/AiGuidanceServlet.java'), 'utf8');
if (servlet.includes('System.getenv("AI_API_KEY")'))
  pass('API key read from env variable');
else
  fail('API key not read from env — possible hardcoded key risk');
if (!servlet.includes('"sk-'))            pass('no hardcoded API key in servlet');
else                                       fail('hardcoded API key found in servlet');
if (servlet.includes('Thread.currentThread().interrupt()'))
  pass('InterruptedException handled correctly');
else
  fail('InterruptedException not re-interrupted');
if (servlet.includes('Cache-Control'))    pass('Cache-Control: no-store header set');
else                                       fail('Cache-Control header missing');

// ── SUMMARY ──────────────────────────────────────────────────
console.log('\n' + '═'.repeat(50));
if (failures === 0) {
  console.log('  ALL TESTS PASSED  (' + failures + ' failures)');
} else {
  console.log('  ' + failures + ' TEST(S) FAILED — see FAIL lines above');
}
console.log('═'.repeat(50));
if (failures > 0) process.exit(1);
