'use strict';

// minimal DOM stubs so we can test pure logic without a browser
const roleSelect = { value: 'java-backend' };
const document = {
  getElementById: function(id) {
    if (id === 'hoursInput') return { value: '10' };
    return { value: '1' };
  }
};

// paste the data + logic from app.js --------------------------------

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
      { name: 'Java & OOP',               required: 3, priority: 'High',   why: 'Core.' },
      { name: 'Collections & exceptions',  required: 2, priority: 'High',   why: 'Robust logic.' },
      { name: 'SQL & database design',     required: 2, priority: 'High',   why: 'Persistent data.' },
      { name: 'JDBC',                      required: 2, priority: 'High',   why: 'Java to DB.' },
      { name: 'HTTP & REST APIs',          required: 2, priority: 'High',   why: 'REST.' },
      { name: 'Spring Boot',               required: 2, priority: 'High',   why: 'Framework.' },
      { name: 'Testing fundamentals',      required: 2, priority: 'Medium', why: 'Tests.' },
      { name: 'Git & GitHub',              required: 2, priority: 'Medium', why: 'VCS.' }
    ],
    project: { title: 'Task Management REST API', description: 'Build it.', tags: ['Java', 'REST API', 'SQL', 'Testing'] }
  },
  'frontend': {
    title: 'Frontend Developer',
    skills: [
      { name: 'HTML semantics',                    required: 2, priority: 'High',   why: 'Structure.' },
      { name: 'CSS layout & responsive design',    required: 2, priority: 'High',   why: 'Responsive.' },
      { name: 'JavaScript fundamentals',           required: 3, priority: 'High',   why: 'JS core.' },
      { name: 'DOM & events',                      required: 2, priority: 'High',   why: 'Interaction.' },
      { name: 'API integration',                   required: 2, priority: 'High',   why: 'Fetch.' },
      { name: 'React fundamentals',                required: 2, priority: 'Medium', why: 'React.' },
      { name: 'Accessibility basics',              required: 2, priority: 'Medium', why: 'a11y.' },
      { name: 'Git & GitHub',                      required: 2, priority: 'Medium', why: 'VCS.' }
    ],
    project: { title: 'Accessible Study Planner', description: 'Build it.', tags: ['HTML/CSS', 'JavaScript', 'Responsive UI', 'Accessibility'] }
  },
  'data-analyst': {
    title: 'Data Analyst',
    skills: [
      { name: 'Spreadsheet analysis',    required: 2, priority: 'High',   why: 'Excel.' },
      { name: 'SQL queries',             required: 3, priority: 'High',   why: 'SQL daily.' },
      { name: 'Python fundamentals',     required: 2, priority: 'High',   why: 'Automate.' },
      { name: 'Pandas & data cleaning',  required: 2, priority: 'High',   why: 'Cleaning.' },
      { name: 'Descriptive statistics',  required: 2, priority: 'High',   why: 'Stats.' },
      { name: 'Data visualization',      required: 2, priority: 'Medium', why: 'Charts.' },
      { name: 'Dashboard storytelling',  required: 2, priority: 'Medium', why: 'Insight.' },
      { name: 'Git & documentation',     required: 1, priority: 'Low',    why: 'Docs.' }
    ],
    project: { title: 'Student Performance Insights', description: 'Build it.', tags: ['SQL', 'Python', 'Visualization', 'Insights'] }
  },
  'qa-automation': {
    title: 'QA Automation Engineer',
    skills: [
      { name: 'Testing fundamentals',       required: 3, priority: 'High',   why: 'Basis.' },
      { name: 'Test case design',           required: 2, priority: 'High',   why: 'Cases.' },
      { name: 'Java or Python basics',      required: 2, priority: 'High',   why: 'Code.' },
      { name: 'Web locators & DOM',         required: 2, priority: 'High',   why: 'Locators.' },
      { name: 'Selenium or similar tool',   required: 2, priority: 'High',   why: 'Selenium.' },
      { name: 'API testing',                required: 2, priority: 'Medium', why: 'API.' },
      { name: 'SQL basics',                 required: 1, priority: 'Medium', why: 'DB check.' },
      { name: 'Bug reports & Git',          required: 2, priority: 'Medium', why: 'Reports.' }
    ],
    project: { title: 'Web App Regression Test Suite', description: 'Build it.', tags: ['Test cases', 'Browser automation', 'API', 'Reporting'] }
  }
};

function readProfile() {
  const roleKey = roleSelect.value;
  const role    = ROLES[roleKey];
  const hours   = Math.max(2, Math.min(40, Number(document.getElementById('hoursInput').value) || 2));
  const skills = role.skills.map((skill, i) => ({
    ...skill,
    current: Number(document.getElementById(`skill-${i}`).value)
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

// ---- TESTS ----
let pass = true;
function check(cond, msg) {
  if (!cond) { console.error('FAIL: ' + msg); pass = false; }
}

// all four roles
['java-backend', 'frontend', 'data-analyst', 'qa-automation'].forEach(key => {
  roleSelect.value = key;
  document.getElementById = id => {
    if (id === 'hoursInput') return { value: '10' };
    return { value: '1' };
  };
  const r = readProfile();
  check(typeof r.coverage === 'number' && r.coverage >= 0 && r.coverage <= 100,
    'coverage OOB for ' + key + ': ' + r.coverage);
  const rm = buildRoadmap(r);
  check(rm.length === 4, 'roadmap not 4 weeks for ' + key);
  rm.forEach((w, wi) => check(w.tasks.length === 4, 'week ' + (wi + 1) + ' missing tasks for ' + key));
  console.log('PASS role=' + key + ' coverage=' + r.coverage + '% gaps=' + r.gaps.length + ' roadmap=4wk');
});

// zero gap (all skills at required level)
roleSelect.value = 'java-backend';
document.getElementById = id => {
  if (id === 'hoursInput') return { value: '10' };
  const m = id.match(/skill-(\d+)/);
  if (m) return { value: String(ROLES['java-backend'].skills[+m[1]].required) };
  return { value: '0' };
};
const zero = readProfile();
check(zero.gaps.length === 0, 'expected 0 gaps, got ' + zero.gaps.length);
check(zero.coverage === 100, 'expected 100% coverage, got ' + zero.coverage);
console.log('PASS zero-gap case: coverage=' + zero.coverage + '%');

// coverage extremes for frontend
roleSelect.value = 'frontend';
document.getElementById = id => { if (id === 'hoursInput') return { value: '8' }; return { value: '0' }; };
const allZero = readProfile();
check(allZero.coverage === 0, 'all-zero should be 0%, got ' + allZero.coverage);

roleSelect.value = 'frontend';
document.getElementById = id => {
  if (id === 'hoursInput') return { value: '8' };
  const m = id.match(/skill-(\d+)/);
  if (m) return { value: String(ROLES['frontend'].skills[+m[1]].required) };
  return { value: '0' };
};
const allFull = readProfile();
check(allFull.coverage === 100, 'all-full should be 100%, got ' + allFull.coverage);
console.log('PASS coverage extremes: 0% and 100%');

// gap sorting: High before Medium before Low
roleSelect.value = 'data-analyst';
document.getElementById = id => { if (id === 'hoursInput') return { value: '8' }; return { value: '0' }; };
const da = readProfile();
const order = { High: 0, Medium: 1, Low: 2 };
let sorted = true;
for (let i = 1; i < da.gaps.length; i++) {
  if (order[da.gaps[i].priority] < order[da.gaps[i-1].priority]) { sorted = false; break; }
}
check(sorted, 'gaps not sorted High > Medium > Low: ' + da.gaps.map(g => g.priority).join(', '));
console.log('PASS gap sort: ' + da.gaps.map(g => g.priority).join(', '));

// localGuidance both branches
const gapGuide = localGuidance({ role: ROLES['java-backend'], gaps: [ROLES['java-backend'].skills[0]], hours: 8 });
check(gapGuide.includes('rule-based'), 'localGuidance gap branch missing rule-based label');
const noGapGuide = localGuidance({ role: ROLES['java-backend'], gaps: [], hours: 8 });
check(noGapGuide.includes('sample template'), 'localGuidance no-gap branch missing disclaimer');
console.log('PASS localGuidance both branches');

if (pass) {
  console.log('\nALL CHECKS PASSED');
} else {
  process.exit(1);
}
