'use strict';

// proficiency levels — 0 to 3
const LEVELS = [
  { value: 0, label: 'Not started' },
  { value: 1, label: 'Basic' },
  { value: 2, label: 'Comfortable' },
  { value: 3, label: 'Can build' }
];

// ── Role data ────────────────────────────────────────────────────
// Each skill has: name, required (1-3), priority, category, resource, why
// "why" is written from a senior engineer's perspective — honest, direct, no fluff
const ROLES = {

  'java-backend': {
    title: 'Java Backend Developer',
    tag:   'Backend',
    skills: [
      { name: 'Java & OOP',               required: 3, priority: 'High',   category: 'Core',    resource: 'https://docs.oracle.com/javase/tutorial/',                why: 'Every Java interview starts here. If your OOP fundamentals are shaky, you will struggle to explain your own code. Spend real time here — not just reading, actually writing classes, interfaces, and inheritance chains from scratch.' },
      { name: 'Collections & exceptions', required: 2, priority: 'High',   category: 'Core',    resource: 'https://docs.oracle.com/javase/tutorial/collections/',    why: 'In 10 years of reviewing student code, the most common bug I see is wrong collection choice — ArrayList when you need a HashSet, HashMap with no null check. Understand time complexity of each collection type.' },
      { name: 'SQL & database design',    required: 2, priority: 'High',   category: 'Data',    resource: 'https://sqlbolt.com/',                                    why: 'You will write SQL every single day. JOINs, GROUP BY, indexes, and knowing when NOT to use a subquery — these separate candidates who get hired from those who don\'t.' },
      { name: 'JDBC / JPA basics',        required: 2, priority: 'High',   category: 'Data',    resource: 'https://docs.oracle.com/javase/tutorial/jdbc/',           why: 'Raw JDBC teaches you what ORM tools are actually abstracting. Even if you use Spring Data JPA on the job, you need to know what happens underneath when a query runs slow.' },
      { name: 'HTTP & REST APIs',         required: 2, priority: 'High',   category: 'Tools',   resource: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', why: 'I once rejected a candidate because they couldn\'t explain the difference between PUT and PATCH. Status codes, headers, idempotency — know these cold.' },
      { name: 'Spring Boot',              required: 2, priority: 'High',   category: 'Tools',   resource: 'https://spring.io/quickstart',                            why: 'It is the industry standard for Java backends. You don\'t need to know every annotation, but you must be able to wire up a REST controller, connect a DB, and handle exceptions properly.' },
      { name: 'Testing (JUnit + Mockito)',required: 2, priority: 'Medium', category: 'Quality', resource: 'https://junit.org/junit5/docs/current/user-guide/',        why: 'Untested code is unfinished code — full stop. At minimum, write unit tests for your service layer. Mockito for mocking dependencies. This is not optional in any serious team.' },
      { name: 'Git & GitHub',             required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://learngitbranching.js.org/',                       why: 'Your commit history is your work diary. Clean commits with good messages show discipline. Feature branches, pull requests, rebasing — these are daily tools, not optional extras.' }
    ],
    project: {
      title: 'Task Management REST API',
      description: 'Build a production-grade REST API: CRUD for tasks, user assignment, filter by status/priority, pagination. Use Spring Boot + H2 (swap to MySQL easily), JPA repositories, proper exception handling with custom error responses, input validation (@Valid), and at least 5 JUnit + Mockito tests. Deploy to Railway or Render free tier. Write a Postman collection.',
      tags: ['Java', 'Spring Boot', 'JPA', 'REST API', 'JUnit', 'Mockito']
    }
  },

  'frontend': {
    title: 'Frontend Developer',
    tag:   'Frontend',
    skills: [
      { name: 'HTML semantics & SEO',           required: 2, priority: 'High',   category: 'Core',    resource: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',  why: 'A senior reviewer can spot bad HTML in 30 seconds. Divs-for-everything is a red flag. Use the right element — article, section, nav, main, aside. It matters for accessibility, SEO, and maintainability.' },
      { name: 'CSS layout (Flex + Grid)',        required: 2, priority: 'High',   category: 'Core',    resource: 'https://flexboxfroggy.com/',                           why: 'I still see candidates who use float for layout in 2024. Flexbox for one-dimensional, Grid for two-dimensional — know when to use each. Media queries must be second nature.' },
      { name: 'JavaScript fundamentals',        required: 3, priority: 'High',   category: 'Core',    resource: 'https://javascript.info/',                             why: 'Closures, event loop, promises, async/await, this binding — these come up in every frontend interview. Frameworks change; JS fundamentals stay. Build things in vanilla JS before you touch React.' },
      { name: 'DOM & events',                   required: 2, priority: 'High',   category: 'Core',    resource: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', why: 'If you cannot build a working dropdown, modal, or form validator in plain JS, you do not yet understand the DOM. React is just a layer on top of this.' },
      { name: 'React fundamentals',             required: 2, priority: 'High',   category: 'Tools',   resource: 'https://react.dev/learn',                              why: 'Components, props, state, useEffect, lifting state up — these are the minimum. If you cannot explain why a component re-renders, you will introduce subtle bugs that are very hard to trace.' },
      { name: 'API integration (fetch/axios)',  required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', why: 'Handling loading, error, and empty states is what separates a student project from a real one. Anyone can fetch data and display it. Handling failures gracefully is the real skill.' },
      { name: 'Accessibility (WCAG basics)',    required: 2, priority: 'Medium', category: 'Quality', resource: 'https://web.dev/learn/accessibility/',                 why: 'Keyboard navigation, ARIA labels, colour contrast — I run Lighthouse on every candidate\'s project. A score below 80 is an automatic conversation about attention to detail.' },
      { name: 'Git & GitHub',                   required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://learngitbranching.js.org/',                    why: 'Same as any role — but for frontend, I also want to see you know how to resolve merge conflicts and write meaningful commit messages. Not just "fixed stuff".' }
    ],
    project: {
      title: 'Accessible Study Planner (React)',
      description: 'A task planner with filters (All / Today / Overdue / Done), due-date sorting, priority tags, and localStorage persistence. Built in React with hooks only — no class components. WCAG 2.1 AA compliant: keyboard nav, focus management, ARIA live regions, contrast ratio ≥ 4.5:1. Run Lighthouse and include the score in README. Deploy to Vercel.',
      tags: ['React', 'CSS Grid', 'WCAG', 'Lighthouse', 'localStorage', 'Vercel']
    }
  },

  'data-analyst': {
    title: 'Data Analyst',
    tag:   'Data',
    skills: [
      { name: 'SQL queries & joins',      required: 3, priority: 'High',   category: 'Core',    resource: 'https://sqlbolt.com/',                              why: 'In every data analyst interview I\'ve run, the SQL round eliminates 60% of candidates. Complex joins, window functions (ROW_NUMBER, LAG, LEAD), CTEs, and query optimisation. Not optional.' },
      { name: 'Python fundamentals',      required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.learnpython.org/',                      why: 'Python is how you automate the boring parts — cleaning 50k rows, scheduling reports, building reusable pipelines. You don\'t need to be a software engineer, but you must be comfortable writing loops, functions, and reading someone else\'s code.' },
      { name: 'Pandas & data cleaning',  required: 2, priority: 'High',   category: 'Core',    resource: 'https://pandas.pydata.org/docs/getting_started/',   why: 'Real data is always messy. Missing values, wrong types, duplicates, inconsistent formats. I once spent 3 days cleaning one dataset. Pandas is your primary weapon — know groupby, merge, pivot_table, apply.' },
      { name: 'Descriptive statistics',  required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.khanacademy.org/math/statistics-probability', why: 'Mean vs median vs mode is not enough. You need to understand distributions, outlier detection (IQR method), correlation vs causation, and when a metric is statistically significant vs just noise.' },
      { name: 'Data visualisation',      required: 2, priority: 'High',   category: 'Tools',   resource: 'https://matplotlib.org/stable/tutorials/',          why: 'The chart is the last mile of analysis. A bad chart can make correct data misleading. Learn when to use bar vs line vs scatter vs heatmap. Simplicity beats complexity — remove every element that doesn\'t carry information.' },
      { name: 'Spreadsheet analysis',    required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://edu.gcfglobal.org/en/excel/',               why: 'Like it or not, Excel and Google Sheets are still used daily in most companies. PivotTables, VLOOKUP/XLOOKUP, and basic macros — a lot of business decisions still start in a spreadsheet.' },
      { name: 'Dashboard storytelling',  required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://www.tableau.com/learn/training',            why: 'Data without a story is just numbers. A dashboard should answer a specific question for a specific audience. Before building it, write the question you\'re answering. Then build only what answers that question.' },
      { name: 'Git & documentation',     required: 1, priority: 'Low',    category: 'Quality', resource: 'https://learngitbranching.js.org/',                 why: 'An analysis no one else can reproduce is worthless. Version control your notebooks, write a README that explains the dataset, methodology, and conclusions. Future-you will thank current-you.' }
    ],
    project: {
      title: 'Student Performance Insights Dashboard',
      description: 'Analyse a public Kaggle dataset (student performance or similar). Clean with Pandas, answer 5 specific business questions using SQL and/or Python, build visualisations with Matplotlib/Seaborn, and publish a Jupyter notebook with clear markdown explanations between cells. Create a one-page summary dashboard in Tableau Public or Google Looker Studio. Write conclusions a non-technical reader can understand.',
      tags: ['Python', 'Pandas', 'SQL', 'Matplotlib', 'Jupyter', 'Tableau']
    }
  },

  'qa-automation': {
    title: 'QA Automation Engineer',
    tag:   'QA',
    skills: [
      { name: 'Testing fundamentals',     required: 3, priority: 'High',   category: 'Core',    resource: 'https://www.guru99.com/software-testing.html',  why: 'I\'ve seen automation engineers who couldn\'t explain the difference between functional and non-functional testing. Understand the testing pyramid — unit tests are cheapest, E2E tests are most expensive. Know when to use what.' },
      { name: 'Test case design',         required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.guru99.com/test-case.html',          why: 'Equivalence partitioning, boundary value analysis, decision tables — these techniques turn intuition into systematic coverage. A good test case has exactly one reason to fail. Learn to write them before you automate them.' },
      { name: 'Java or Python basics',    required: 2, priority: 'High',   category: 'Core',    resource: 'https://www.learnpython.org/',                   why: 'Automation is programming. If you can\'t write a loop, a function, or handle an exception, you cannot write reliable automation. Start with Python — it\'s faster to learn and Pytest is excellent.' },
      { name: 'Selenium / Playwright',    required: 2, priority: 'High',   category: 'Tools',   resource: 'https://playwright.dev/docs/intro',              why: 'Playwright has largely overtaken Selenium for new projects — it\'s faster, more reliable, and handles modern JS-heavy apps better. But understand Selenium too, because most existing codebases still use it.' },
      { name: 'Web locators & DOM',       required: 2, priority: 'High',   category: 'Tools',   resource: 'https://developer.chrome.com/docs/devtools/',    why: 'Brittle locators are the #1 cause of flaky tests. Prefer data-testid attributes or ARIA roles over CSS class selectors that change with every UI redesign. Open DevTools and inspect before writing a single locator.' },
      { name: 'API testing (Postman)',    required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://learning.postman.com/',                  why: 'API tests are 10x faster and more stable than UI tests. Test the API layer first — status codes, response schema, error cases. If the API works, half your problems are solved before the UI is even built.' },
      { name: 'SQL basics',              required: 1, priority: 'Medium', category: 'Data',    resource: 'https://sqlbolt.com/',                           why: 'After a test action, verify the database directly — not just the UI. A UI can show "success" while the DB has wrong data. Basic SELECT with WHERE and JOIN is enough.' },
      { name: 'Bug reports & Git',       required: 2, priority: 'Medium', category: 'Quality', resource: 'https://learngitbranching.js.org/',              why: 'A bug report without reproduction steps, expected vs actual behaviour, and environment details is useless. Write bug reports as if the developer is remote and has zero context. Because they usually are.' }
    ],
    project: {
      title: 'Web App Regression Test Suite',
      description: 'Write 20+ structured manual test cases for SauceDemo or a similar demo site. Automate the login happy path, 2 negative scenarios, and the checkout flow in Playwright (Python or JS). Generate an HTML report with screenshots on failure. Set up a GitHub Actions CI job that runs your suite on push. Document flaky test findings and your mitigation strategy.',
      tags: ['Playwright', 'Pytest', 'GitHub Actions', 'HTML report', 'CI/CD']
    }
  },

  'devops': {
    title: 'DevOps / Cloud Engineer',
    tag:   'DevOps',
    skills: [
      { name: 'Linux & shell scripting',  required: 3, priority: 'High',   category: 'Core',    resource: 'https://linuxjourney.com/',                      why: 'Everything in DevOps runs on Linux. File permissions, processes, cron jobs, pipes, grep, awk — you need to be fluent. I\'ve seen DevOps candidates who didn\'t know how to check what\'s listening on a port. That\'s a red flag.' },
      { name: 'Docker & containerisation',required: 3, priority: 'High',   category: 'Tools',   resource: 'https://docs.docker.com/get-started/',           why: 'Containers are the atomic unit of modern deployment. Write real Dockerfiles — multi-stage builds, non-root users, .dockerignore. Understand layers and why image size matters. This comes up in every DevOps interview.' },
      { name: 'CI/CD pipelines',          required: 2, priority: 'High',   category: 'Tools',   resource: 'https://docs.github.com/en/actions',             why: 'A pipeline is not just "run tests on push". It\'s build → test → security scan → push image → deploy → notify. Design yours end-to-end. GitHub Actions is fine to start; understand the concepts and Jenkins/GitLab CI become easy.' },
      { name: 'Cloud basics (AWS/GCP)',   required: 2, priority: 'High',   category: 'Tools',   resource: 'https://aws.amazon.com/getting-started/',        why: 'You don\'t need to know every service. EC2, S3, IAM, VPC, and one managed DB service — understand these deeply. Know what "least privilege" means for IAM. Cost awareness matters too; I\'ve seen students rack up $300 bills on free tier.' },
      { name: 'Kubernetes basics',        required: 2, priority: 'High',   category: 'Tools',   resource: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', why: 'K8s is complex, but the core concepts are learnable: pods, deployments, services, config maps. You don\'t need to be a cluster administrator — you need to be able to deploy an app and debug why a pod keeps crashing.' },
      { name: 'Infrastructure as Code',   required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://developer.hashicorp.com/terraform/intro',why: 'Terraform is the standard. Clicking through a cloud console is not repeatable or reviewable. Learn to write a basic VPC + EC2 + RDS stack in Terraform. Understand state files and why you should never edit them manually.' },
      { name: 'Monitoring & logging',     required: 2, priority: 'Medium', category: 'Quality', resource: 'https://prometheus.io/docs/introduction/overview/', why: 'An incident at 2am is your fault if you had no alerts set up. Prometheus + Grafana is the open source standard. Understand the four golden signals: latency, traffic, errors, saturation.' },
      { name: 'Git & branching strategy', required: 2, priority: 'Medium', category: 'Quality', resource: 'https://learngitbranching.js.org/',              why: 'GitOps is a real pattern now — your infra changes go through pull requests just like your code. Understand trunk-based development vs GitFlow and when to use each.' }
    ],
    project: {
      title: 'Containerised App with Full CI/CD Pipeline',
      description: 'Take any simple web app (even a static site), write a proper multi-stage Dockerfile, push it to Docker Hub or GitHub Container Registry via GitHub Actions, and deploy it to a free cloud tier (Railway, Render, or EC2 free tier). Add a health check endpoint, set up a basic Prometheus scrape config, and write a runbook describing how to roll back a bad deployment.',
      tags: ['Docker', 'GitHub Actions', 'AWS/GCP', 'Terraform', 'Prometheus', 'CI/CD']
    }
  },

  'fullstack': {
    title: 'Full Stack Developer',
    tag:   'Full Stack',
    skills: [
      { name: 'JavaScript (ES6+)',              required: 3, priority: 'High',   category: 'Core',    resource: 'https://javascript.info/',                        why: 'Full stack means JS on both sides. Async/await, modules, destructuring, spread — these must be automatic. If you\'re looking up how to use a Promise in an interview, it shows a gap in your foundation.' },
      { name: 'React or Vue (frontend)',        required: 2, priority: 'High',   category: 'Core',    resource: 'https://react.dev/learn',                         why: 'Pick one and go deep. React is more common in MNC job descriptions right now. Understand the component lifecycle, state management (useState, useReducer, Context), and why you should not abuse useEffect.' },
      { name: 'Node.js + Express (backend)',    required: 2, priority: 'High',   category: 'Core',    resource: 'https://expressjs.com/en/starter/hello-world.html', why: 'The JS full stack story runs on Node. Express is minimal — which is good for learning. Build middleware, route handlers, error handlers, and understand the request lifecycle from TCP connection to response.' },
      { name: 'SQL or MongoDB',                 required: 2, priority: 'High',   category: 'Data',    resource: 'https://sqlbolt.com/',                            why: 'You need at least one relational and one document DB in your toolkit. SQL for structured data with complex relationships. MongoDB for flexible schemas and rapid prototyping. Know the trade-offs, not just the syntax.' },
      { name: 'REST API design',                required: 2, priority: 'High',   category: 'Tools',   resource: 'https://restfulapi.net/',                         why: 'Versioning (/api/v1/), resource naming (nouns not verbs), correct status codes, pagination, error response shape — these define whether your API is pleasant or painful to use. Design it for the consumer, not the implementer.' },
      { name: 'Authentication (JWT/sessions)',  required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://jwt.io/introduction/',                   why: 'Auth is where most security bugs live. Understand JWTs — what\'s in them, what\'s not, why you don\'t store sensitive data in the payload, and why you need to handle token expiry properly. Never store passwords in plain text.' },
      { name: 'CSS & responsive design',        required: 2, priority: 'Medium', category: 'Core',    resource: 'https://flexboxfroggy.com/',                      why: 'Full stack doesn\'t mean "backend with ugly frontend". Your UI needs to work on a phone. Flexbox and Grid are not hard — spend one weekend and you\'ll be set.' },
      { name: 'Git, deployment & DevOps basics',required: 2, priority: 'Medium', category: 'Quality', resource: 'https://learngitbranching.js.org/',              why: 'A full stack developer who can\'t deploy their own app is only half done. Vercel/Railway/Render make it free and easy. Your portfolio project must have a live URL — a GitHub repo alone is not enough.' }
    ],
    project: {
      title: 'Full Stack Note-Taking App',
      description: 'A note app with user auth (JWT), CRUD for notes, tags, and search. React frontend, Node/Express backend, MongoDB or PostgreSQL. Deployed with frontend on Vercel and backend on Railway. Include rate limiting, input sanitisation, proper .env handling, and a Lighthouse score ≥ 85. Write API documentation (even a simple README with curl examples is fine).',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vercel', 'Railway']
    }
  },

  'ml-engineer': {
    title: 'Machine Learning Engineer',
    tag:   'ML / AI',
    skills: [
      { name: 'Python (NumPy / Pandas)',    required: 3, priority: 'High',   category: 'Core',    resource: 'https://numpy.org/learn/',                        why: 'ML is applied math, and NumPy is how you do applied math in Python. Vectorised operations, broadcasting, matrix multiplication — if you\'re still using for-loops to compute dot products, you need to revisit this.' },
      { name: 'Statistics & probability',   required: 3, priority: 'High',   category: 'Core',    resource: 'https://www.khanacademy.org/math/statistics-probability', why: 'Bayes\' theorem, distributions (normal, Bernoulli, Poisson), hypothesis testing, p-values — an ML engineer who can\'t interpret a confusion matrix or explain what AUC-ROC actually measures is building models by guesswork.' },
      { name: 'Scikit-learn (ML pipeline)', required: 2, priority: 'High',   category: 'Tools',   resource: 'https://scikit-learn.org/stable/user_guide.html', why: 'Before deep learning, understand the classical models: regression, decision trees, random forests, SVM, k-means. Know when to use which. scikit-learn\'s pipeline API forces you to think about preprocessing → model → evaluation as one thing.' },
      { name: 'Deep learning basics',       required: 2, priority: 'High',   category: 'Tools',   resource: 'https://www.fast.ai/',                            why: 'Feedforward networks, backpropagation, activation functions, overfitting and regularisation — these are not just theory. Build a small neural net from scratch at least once before using PyTorch/TensorFlow. fast.ai is the best practical starting point I know.' },
      { name: 'Feature engineering',        required: 2, priority: 'High',   category: 'Core',    resource: 'https://pandas.pydata.org/docs/getting_started/', why: 'Garbage in, garbage out. Feature engineering usually contributes more to model performance than algorithm choice. Encoding, scaling, handling missing values, creating interaction features — this is where the real work is.' },
      { name: 'Model evaluation & tuning',  required: 2, priority: 'High',   category: 'Core',    resource: 'https://scikit-learn.org/stable/modules/cross_validation.html', why: 'Accuracy is almost always the wrong metric. Learn precision, recall, F1, ROC-AUC, and when each matters. Cross-validation and hyperparameter tuning (GridSearchCV, optuna) are standard practice — not optional extras.' },
      { name: 'Data visualisation (plots)', required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://seaborn.pydata.org/',                     why: 'You need to communicate your findings. A Jupyter notebook full of numbers with no plots is unreadable. Seaborn and Matplotlib are enough — learn to show distribution, correlation, and model performance visually.' },
      { name: 'Git & experiment tracking',  required: 2, priority: 'Medium', category: 'Quality', resource: 'https://mlflow.org/docs/latest/index.html',      why: 'An ML experiment you can\'t reproduce is a wasted experiment. Use MLflow or Weights & Biases to track hyperparameters, metrics, and model versions. Future-you needs to know what you tried and what worked.' }
    ],
    project: {
      title: 'End-to-End Classification Pipeline',
      description: 'Pick a public dataset (Titanic, Heart Disease, or similar). Do proper EDA, handle missing values and outliers, engineer at least 3 features, train and compare 4 models (logistic regression, random forest, gradient boosting, and one more), tune the best with cross-validation, evaluate with precision/recall/AUC, and deploy as a simple Streamlit or Gradio app. Write a conclusion section explaining which model you chose and why.',
      tags: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn', 'MLflow', 'Streamlit']
    }
  },

  'cybersecurity': {
    title: 'Cybersecurity Analyst',
    tag:   'Security',
    skills: [
      { name: 'Networking fundamentals',   required: 3, priority: 'High',   category: 'Core',    resource: 'https://www.professormesser.com/network-plus/n10-008/n10-008-training-course/', why: 'TCP/IP, DNS, HTTP/S, TLS handshake, subnetting, firewalls, VPNs — if you don\'t understand how data moves through a network, you can\'t understand how it gets compromised. This is non-negotiable.' },
      { name: 'OWASP Top 10 web vulns',    required: 3, priority: 'High',   category: 'Core',    resource: 'https://owasp.org/www-project-top-ten/',          why: 'SQL injection, XSS, broken authentication, IDOR, SSRF — these cause the majority of real breaches. Read the OWASP Top 10 until you can explain each vulnerability, how to exploit it in a lab, and exactly how to fix it in code.' },
      { name: 'Linux & command line',      required: 2, priority: 'High',   category: 'Core',    resource: 'https://linuxjourney.com/',                       why: 'Security tools run on Linux. Log analysis, file permissions, process monitoring, network tools (netstat, ss, tcpdump) — you need to be comfortable at the command line. Most attack surfaces are Linux servers.' },
      { name: 'Vulnerability scanning',    required: 2, priority: 'High',   category: 'Tools',   resource: 'https://nmap.org/book/toc.html',                  why: 'Nmap, Nikto, Burp Suite Community Edition — know how to use them in a legal, lab context. Understanding what a scanner finds and why it flags something is more important than knowing every flag. Set up a home lab (VirtualBox + Kali + DVWA).' },
      { name: 'SIEM & log analysis',       required: 2, priority: 'High',   category: 'Tools',   resource: 'https://www.elastic.co/what-is/siem',             why: 'Security Operations Centers run on SIEM platforms (Splunk, Elastic SIEM). You need to know how to query logs, correlate events, and distinguish a false positive from a real threat. Splunk has a free training program — use it.' },
      { name: 'Incident response basics',  required: 2, priority: 'Medium', category: 'Core',    resource: 'https://www.sans.org/white-papers/incident-handlers-handbook/', why: 'When a breach happens, panic is the enemy. Preparation, identification, containment, eradication, recovery, lessons learned — know the PICERL framework and practice applying it to scenarios. SANS has excellent free resources.' },
      { name: 'Python for security',       required: 2, priority: 'Medium', category: 'Tools',   resource: 'https://automatetheboringstuff.com/',             why: 'Scripting repetitive tasks — parsing logs, running automated scans, writing simple network tools — is a daily activity in security roles. You don\'t need to be a developer, but basic Python is expected.' },
      { name: 'Compliance & frameworks',   required: 1, priority: 'Low',    category: 'Quality', resource: 'https://www.nist.gov/cyberframework',            why: 'NIST CSF, ISO 27001, GDPR basics — these matter more as you grow in your career. For an entry-level role, understand what a framework is and why organisations follow them. One day you\'ll be writing security policies based on these.' }
    ],
    project: {
      title: 'Home Lab Vulnerability Assessment Report',
      description: 'Set up a home lab with VirtualBox + Kali Linux + DVWA (Damn Vulnerable Web App) or TryHackMe. Conduct a structured vulnerability assessment: scan with Nmap, exploit two OWASP Top 10 vulnerabilities in the lab environment, document your findings in a professional pen test report (executive summary, findings, CVSS scores, remediation steps). Includes a 1-page risk matrix. Never scan systems you don\'t own.',
      tags: ['Kali Linux', 'Nmap', 'Burp Suite', 'OWASP', 'CVSS', 'Pen Test Report']
    }
  }

};

// ── Plan duration options ────────────────────────────────────────
const DURATIONS = [
  { value: '4',  label: '4 weeks',  desc: 'Foundation sprint — cover the critical gaps fast' },
  { value: '8',  label: '8 weeks',  desc: 'Solid build — go deep + start interview prep' },
  { value: '12', label: '12 weeks', desc: 'Master-level — build, practice, mock interviews' }
];

// ── DOM refs ────────────────────────────────────────────────────
const form        = document.getElementById('profileForm');
const roleSelect  = document.getElementById('roleSelect');
const skillInputs = document.getElementById('skillInputs');
let lastResult = null;

// ── Skill input rendering ───────────────────────────────────────
function renderSkillInputs() {
  const role = ROLES[roleSelect.value];
  skillInputs.innerHTML = '';

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
  const roleKey  = roleSelect.value;
  const role     = ROLES[roleKey];
  const hours    = Math.max(2, Math.min(40, Number(document.getElementById('hoursInput').value) || 2));
  const duration = Number(document.getElementById('durationSelect').value);

  const skills = role.skills.map((skill, i) => ({
    ...skill,
    current: Number(document.getElementById(`skill-${i}`).value)
  }));

  const weight        = p => p === 'High' ? 3 : p === 'Medium' ? 2 : 1;
  const totalWeight   = skills.reduce((s, sk) => s + weight(sk.priority), 0);
  const coveredWeight = skills.reduce((s, sk) => s + Math.min(sk.current / sk.required, 1) * weight(sk.priority), 0);
  const coverage      = Math.round((coveredWeight / totalWeight) * 100);

  const gaps = skills
    .filter(sk => sk.current < sk.required)
    .map(sk => ({ ...sk, gap: sk.required - sk.current }))
    .sort((a, b) => weight(b.priority) - weight(a.priority) || b.gap - a.gap);

  return { roleKey, role, hours, duration, skills, coverage, gaps };
}

// ── Radar chart ─────────────────────────────────────────────────
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

  let svg = `<svg viewBox="0 0 240 240" class="radar-svg" aria-label="Skill radar chart" role="img">`;
  [0.33, 0.67, 1].forEach(f => {
    const pts = skills.map((_, i) => pt(i, f).join(',')).join(' ');
    svg += `<polygon points="${pts}" class="radar-grid"/>`;
  });

  skills.forEach((sk, i) => {
    const [x1, y1] = pt(i, 0);
    const [x2, y2] = pt(i, 1);
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="radar-spoke"/>`;

    const [lx, ly] = pt(i, 1.18);
    const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle';
    const label = sk.name.length > 14 ? sk.name.slice(0, 13) + '…' : sk.name;
    svg += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" class="radar-label">${label}</text>`;
  });

  const reqFracs = skills.map(sk => sk.required / 3);
  svg += poly(reqFracs, 'radar-required');

  const actFracs = skills.map(sk => sk.current / 3);
  svg += poly(actFracs, 'radar-actual');

  skills.forEach((sk, i) => {
    const [dx, dy] = pt(i, sk.current / 3);
    svg += `<circle cx="${dx}" cy="${dy}" r="4" class="radar-dot"/>`;
  });

  svg += `</svg>`;
  return svg;
}

// ── Roadmap builder — 3 depths ───────────────────────────────────
// 4 weeks: cover critical gaps fast, project setup
// 8 weeks: go deeper, add interview prep from week 5
// 12 weeks: master the role, mock interviews, portfolio polish
function buildRoadmap(result) {
  const { gaps, hours, duration, role } = result;
  const pick = i => gaps.length ? gaps[i % gaps.length].name : 'your strongest skill';
  const proj = role.project.title;
  const hpw  = `~${Math.max(1, Math.round(hours / (duration / 4)))}h`;

  const weeks4 = [
    {
      title: 'Week 1', meta: hpw, focus: pick(0),
      tasks: [
        `Study ${pick(0)} — read the official docs, not just a tutorial. Write a 5-line summary in your own words after every section.`,
        `Do two short exercises for ${pick(0)}. Note every point where you got stuck — those are your actual gaps.`,
        `Map out what you already know vs what needs real practice. Be brutally honest.`,
        `Set up a GitHub repo for "${proj}". Commit a basic folder structure and README with just the project goal.`
      ]
    },
    {
      title: 'Week 2', meta: hpw, focus: pick(1),
      tasks: [
        `Move to ${pick(1)} — close your notes and explain the core concept out loud. Where you stumble, that\'s what to study.`,
        `Build a small working example that combines ${pick(0)} and ${pick(1)}. Push it to GitHub with a meaningful commit message.`,
        `Test with one normal input and one edge case — document both results in a comment.`,
        `Review Week 1 material for 20 minutes. Spaced repetition works.`
      ]
    },
    {
      title: 'Week 3', meta: hpw, focus: proj,
      tasks: [
        `Implement the first core feature of "${proj}" using ${pick(0)}. It doesn\'t have to be perfect — working is the goal.`,
        `Add input validation and a meaningful error message for at least one failure case.`,
        `Self-review: read your code as if you\'re a new team member. What\'s confusing? Fix it.`,
        `Record a 1-minute screen demo of the feature working. Forces you to actually finish it.`
      ]
    },
    {
      title: 'Week 4', meta: hpw, focus: 'Ship it',
      tasks: [
        `Finish the main workflow of "${proj}" end-to-end. A working app beats a perfect half-built one.`,
        `Write the README: setup steps, what it does, how to run it, known limitations. Write it for a stranger.`,
        `Deploy the project live (Vercel, Railway, Render — pick one). A live URL is worth 10× a GitHub repo link.`,
        `Re-rate your skills honestly. Set one specific target for the next month.`
      ]
    }
  ];

  const weeks8extra = [
    {
      title: 'Week 5', meta: hpw, focus: 'Interview prep begins',
      tasks: [
        `Research the top 20 interview questions for ${role.title}. Write your answers — not bullet points, full sentences.`,
        `Implement ${pick(2)} from scratch. No copy-paste. Close all references first, then open them when you\'re stuck.`,
        `Do a mock interview with a friend or record yourself answering 3 technical questions. Watch it back. It\'s uncomfortable. Do it anyway.`,
        `Review "${proj}" code: add proper error handling, remove dead code, and make sure it runs cleanly on a fresh clone.`
      ]
    },
    {
      title: 'Week 6', meta: hpw, focus: 'Depth over breadth',
      tasks: [
        `Pick your weakest skill from the gap list and spend the whole week on it. Depth matters more than ticking boxes.`,
        `Find one open source project related to ${role.title} on GitHub. Read the code. Understand how a professional structures it.`,
        `Write a technical blog post (even a short one) about something you learned. Teaching is the best test of understanding.`,
        `Add a second feature to "${proj}". It should demonstrate a different skill from the first feature.`
      ]
    },
    {
      title: 'Week 7', meta: hpw, focus: 'System design basics',
      tasks: [
        `Learn the basics of system design for your role: how would you scale "${proj}" to 10,000 users? What breaks first?`,
        `Practice explaining your project in 2 minutes: problem, your solution, one technical challenge, what you\'d do differently.`,
        `Do 5 practice problems on HackerRank or LeetCode (Easy level). The goal is comfort, not speed.`,
        `Get feedback on your project from one other person — classmate, senior student, or online community.`
      ]
    },
    {
      title: 'Week 8', meta: hpw, focus: 'Ready to apply',
      tasks: [
        `Polish your GitHub profile: good profile README, pinned repos, consistent commit history. Recruiters look at this.`,
        `Apply to 3 internships even if you don\'t feel 100% ready. Interviews are practice. Rejection is data.`,
        `Do a full mock interview end-to-end: intro, 2 technical questions, one project walkthrough, questions for them.`,
        `Write down 3 things you\'d build next. Momentum matters more than perfection.`
      ]
    }
  ];

  const weeks12extra = [
    {
      title: 'Week 9', meta: hpw, focus: 'MNC interview patterns',
      tasks: [
        `Study how top MNCs (Google, Amazon, Microsoft, Infosys, TCS) structure their ${role.title} interviews. Each company has a pattern — find it.`,
        `Practise the STAR method (Situation, Task, Action, Result) for 5 behavioural questions. MNCs weight these heavily.`,
        `Build a second portfolio project — smaller, but targeting a different skill area. Two projects > one perfect project.`,
        `Connect with 3 people on LinkedIn who are ${role.title}s at companies you want to work at. Message them with a specific, respectful question.`
      ]
    },
    {
      title: 'Week 10', meta: hpw, focus: 'Advanced topics',
      tasks: [
        `Go beyond the basics: learn one advanced topic in your role (e.g. design patterns, distributed systems, advanced SQL window functions, ML ops).`,
        `Contribute to one open source project — even a documentation fix counts. It shows initiative.`,
        `Do a timed mock test: 45 minutes, 3 medium-difficulty problems. Time pressure changes everything.`,
        `Update your resume with specific, quantified achievements from your projects.`
      ]
    },
    {
      title: 'Week 11', meta: hpw, focus: 'Company research',
      tasks: [
        `Pick 5 target companies. Research their tech stack, engineering blog, recent news, and Glassdoor interview reviews.`,
        `Prepare company-specific answers: "Why us?" "What do you know about our product?" These matter more than candidates think.`,
        `Practice live coding: use VS Code with no autocomplete for 1 hour. Replicate the actual interview environment.`,
        `Review all your projects end-to-end. For each: what would you change? What was the hardest decision? Be ready to discuss both.`
      ]
    },
    {
      title: 'Week 12', meta: hpw, focus: 'Final polish — you are ready',
      tasks: [
        `Do a complete mock interview loop: HR screen → technical round → project walkthrough → system design → Q&A. Record it.`,
        `Polish every project on your GitHub: clean README, live demo link, no console errors, mobile responsive.`,
        `Write a personal "engineering philosophy" statement — 3 sentences on how you approach problems. Sounds silly, but it helps enormously in interviews.`,
        `Apply to 10 roles. The best preparation from this point is real interviews. Go get them.`
      ]
    }
  ];

  if (duration === 4)  return weeks4;
  if (duration === 8)  return [...weeks4, ...weeks8extra];
  return [...weeks4, ...weeks8extra, ...weeks12extra];
}

// ── DOM helper ───────────────────────────────────────────────────
function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls)               node.className    = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

// ── Score history ────────────────────────────────────────────────
function saveHistory(result) {
  const key = 'roleready-history';
  let history = [];
  try { history = JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) { history = []; }
  history.unshift({
    role:     result.role.title,
    coverage: result.coverage,
    gaps:     result.gaps.length,
    duration: result.duration,
    date:     new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  });
  history = history.slice(0, 5);
  try { localStorage.setItem(key, JSON.stringify(history)); } catch (_) {}
  return history;
}

function renderHistory(history) {
  const block = document.getElementById('historyBlock');
  const list  = document.getElementById('historyList');
  if (!history.length) { block.style.display = 'none'; return; }
  block.style.display = '';
  list.innerHTML = '';
  history.forEach((h, i) => {
    const row  = el('div', 'history-row');
    const badge = i === 0 ? '<span class="history-now">latest</span>' : '';
    row.innerHTML = `
      <span class="history-role">${h.role}</span>
      <span class="history-meta">${h.date} · ${h.gaps} gap${h.gaps !== 1 ? 's' : ''} · ${h.duration || 4}wk plan</span>
      <span class="history-cov">${h.coverage}% ${badge}</span>`;
    list.appendChild(row);
  });
}

// ── LinkedIn share ───────────────────────────────────────────────
function shareOnLinkedIn(result) {
  const text = encodeURIComponent(
    `Just analysed my skill gaps for ${result.role.title} using RoleReady AI — scored ${result.coverage}% coverage with a ${result.duration}-week roadmap to close the gaps. Built as part of IBM SkillsBuild Internship 2025. #SDG8 #IBMSkillsBuild #StudentDev`
  );
  const url = encodeURIComponent('https://roleready-ai-lilac.vercel.app');
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank', 'noopener');
}

// ── Main render ──────────────────────────────────────────────────
function renderAnalysis(result) {
  lastResult = result;

  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('resultsContent').classList.remove('hidden');

  // live hero score update
  const heroScore = document.getElementById('heroScore');
  const heroBar   = document.getElementById('heroBar');
  const heroLabel = document.getElementById('heroScoreLabel');
  if (heroScore) {
    heroScore.innerHTML = `${result.coverage}<span>%</span>`;
    heroBar.style.width  = `${result.coverage}%`;
    heroLabel.textContent = result.gaps.length
      ? `${result.gaps.length} gap${result.gaps.length > 1 ? 's' : ''} to close — keep going!`
      : 'All requirements met!';
  }

  renderHistory(saveHistory(result));

  document.getElementById('resultRole').textContent = result.role.title;
  document.getElementById('resultSummary').textContent = result.gaps.length
    ? `${result.gaps.length} skill gap${result.gaps.length > 1 ? 's' : ''} found. A ${result.duration}-week plan has been built — tackle the high-priority items first and apply every skill in your project.`
    : 'Your self-ratings meet all requirements for this template. Cross-check against real job postings and start building.';

  document.getElementById('coverageValue').textContent = `${result.coverage}%`;
  document.getElementById('coverageBar').style.width   = `${result.coverage}%`;
  document.getElementById('gapValue').textContent      = String(result.gaps.length);
  document.getElementById('hoursValue').textContent    = `${result.hours}h`;
  document.getElementById('durationValue').textContent = `${result.duration}wk`;

  document.getElementById('radarChart').innerHTML = buildRadar(result.skills);

  // gap list
  const gapList = document.getElementById('gapList');
  gapList.innerHTML = '';
  const topGaps = result.gaps.slice(0, 6);
  if (!topGaps.length) {
    gapList.appendChild(el('p', 'ai-intro', 'No gaps against this template. Cross-check with real job postings — requirements shift.'));
  }
  topGaps.forEach(sk => {
    const row     = el('div', 'gap-item');
    const info    = el('div', 'gap-info');
    const nameRow = el('div', 'gap-name-row');
    nameRow.append(el('b', '', sk.name));
    if (sk.resource) {
      const link = document.createElement('a');
      link.href = sk.resource; link.target = '_blank'; link.rel = 'noreferrer';
      link.className = 'resource-link';
      link.textContent = 'Free resource ↗';
      nameRow.appendChild(link);
    }
    info.appendChild(nameRow);
    info.appendChild(el('small', 'gap-levels', `Need: ${LEVELS[sk.required].label}  ·  You: ${LEVELS[sk.current].label}`));
    info.appendChild(el('p', 'gap-why', sk.why));
    const badge = el('span', `priority${sk.priority === 'Medium' ? ' medium' : sk.priority === 'Low' ? ' low' : ''}`, sk.priority);
    row.append(info, badge);
    gapList.appendChild(row);
  });

  // roadmap
  const roadmapList = document.getElementById('roadmapList');
  roadmapList.innerHTML = '';
  const weeks    = buildRoadmap(result);
  const storeKey = `roleready-tasks-${result.roleKey}-${result.duration}`;
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

  // plan duration label
  const planLabel = document.getElementById('planDurationLabel');
  if (planLabel) {
    const dOpt = DURATIONS.find(d => String(d.value) === String(result.duration));
    planLabel.textContent = dOpt ? `${dOpt.label} plan — ${dOpt.desc}` : `${result.duration}-week plan`;
  }

  // project card
  document.getElementById('projectTitle').textContent       = result.role.project.title;
  document.getElementById('projectDescription').textContent = result.role.project.description;
  const tagsEl = document.getElementById('projectTags');
  tagsEl.innerHTML = '';
  result.role.project.tags.forEach(t => tagsEl.appendChild(el('span', '', t)));

  // reset guidance panel
  document.getElementById('guidanceOutput').innerHTML = '';
  document.getElementById('guidanceOutput').classList.add('hidden');
  document.getElementById('guidanceButton').disabled = false;
}

// ── Progress bar ─────────────────────────────────────────────────
function updateProgress() {
  const all  = [...document.querySelectorAll('.task-line input[type="checkbox"]')];
  const done = all.filter(cb => cb.checked).length;
  document.getElementById('taskProgressText').textContent = `${done} of ${all.length} tasks done`;
  document.getElementById('taskProgressBar').style.width  = all.length ? `${Math.round(done / all.length * 100)}%` : '0%';
}

// ── Local guidance — senior engineer voice ───────────────────────
function localGuidance(result) {
  const { role, gaps, hours, duration } = result;

  if (!gaps.length) {
    return {
      intro: `Your self-ratings already meet the ${role.title} template — here is what a senior engineer would tell you next.`,
      points: [
        'Validate against 3 real entry-level job postings right now — requirements shift faster than templates do. You may find gaps this tool didn\'t catch.',
        `Start the portfolio project: "${role.project.title}". A live deployed URL is worth more than any self-rating. Recruiters click links.`,
        'Get one skill independently assessed — a timed coding test, a mock interview, or a code review from someone more senior. Self-ratings are optimistic by nature.',
        'Your GitHub commit history matters. Consistent, meaningful commits over weeks are more convincing than 50 commits in one night.'
      ],
      note: 'Local rule-based guidance · not a live AI response · advice based on 20+ years of hiring experience patterns.'
    };
  }

  const topGap    = gaps[0];
  const secondGap = gaps[1];
  const wkPlan    = duration >= 12 ? 'your 12-week plan' : duration >= 8 ? 'your 8-week plan' : 'your 4-week plan';

  const points = [
    `Your biggest gap is ${topGap.name}. This is ${topGap.priority}-priority because: ${topGap.why}`,
    secondGap ? `After that, ${secondGap.name} needs attention. ${secondGap.why}` : `Once ${topGap.name} is solid, revisit the remaining gaps in priority order.`,
    `With ${hours}h/week across ${wkPlan}: spend roughly 40% of your time reading/watching, 40% building something that uses the skill, and 20% reviewing what you actually understood. Most students get this backwards — they read more when they\'re stuck instead of building.`,
    `Every exercise goes on GitHub — even 20-line scripts. Your commit graph is a silent signal. Empty graphs say "I read about it but didn\'t build anything."`,
    duration >= 8 ? `From week 5 of your plan, start mock interviews. Most candidates need 6–8 mock attempts before they stop freezing on live questions. Start early.` : `Once you finish this 4-week sprint, immediately start an 8-week plan. The ${role.title} role is competitive — foundation knowledge alone is not enough.`
  ];

  return {
    intro: `Here is what an experienced ${role.title} would tell you right now — no sugar-coating:`,
    points,
    note: 'Local rule-based guidance · not a live AI response · advice based on real hiring patterns.'
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

// ── AI guidance request ──────────────────────────────────────────
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
        duration:     lastResult.duration,
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

// ── Copy plan ────────────────────────────────────────────────────
function copyPlan() {
  if (!lastResult) return;
  const { role, coverage, gaps, duration } = lastResult;
  const weeks = buildRoadmap(lastResult);

  let text = `RoleReady AI — ${role.title} (${duration}-week plan)\nSkill Coverage: ${coverage}%\n\n`;
  text += `TOP GAPS:\n`;
  gaps.slice(0, 5).forEach((sk, i) => {
    text += `${i + 1}. ${sk.name} [${sk.priority}] — need: ${LEVELS[sk.required].label}, you: ${LEVELS[sk.current].label}\n`;
  });
  text += `\n${duration.toUpperCase()}-WEEK PLAN:\n`;
  weeks.forEach(w => {
    text += `\n${w.title} (~${w.meta}):\n`;
    w.tasks.forEach((t, i) => { text += `  ${i + 1}. ${t}\n`; });
  });
  text += `\nProject: ${role.project.title}\n${role.project.description}\n`;
  text += `\nGenerated by RoleReady AI · SDG 8 · roleready-ai-lilac.vercel.app`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyPlanBtn');
    btn.textContent = 'Copied! ✓';
    setTimeout(() => { btn.textContent = 'Copy plan'; }, 2000);
  }).catch(() => {
    alert('Could not access clipboard. Try copying manually.');
  });
}

// ── Print ────────────────────────────────────────────────────────
function printPlan() { window.print(); }

// ── Event wiring ─────────────────────────────────────────────────
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
document.getElementById('shareBtn').addEventListener('click', () => { if (lastResult) shareOnLinkedIn(lastResult); });

renderSkillInputs();
