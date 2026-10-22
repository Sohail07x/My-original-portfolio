import { Project, JournalEntry, ExplorationItem, SkillCategory, CareerGoal } from '../types';

import smartwafImg from '../assets/images/smartwaf_security_1792697485772.jpg';
import edtechImg from '../assets/images/edtech_adaptive_learning_1792697486205.jpg';
import architectureImg from '../assets/images/urban_architecture_1792695261909.jpg';
import brandIdentityImg from '../assets/images/brand_identity_1792695262593.jpg';
import abstractExplorationImg from '../assets/images/abstract_exploration_1792695262259.jpg';

export const HLS_VIDEO_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const USER_INFO = {
  name: 'Mahammad Sohail',
  initials: 'MS',
  title: 'Computer Science Student | Aspiring AI/ML Developer | Software Developer',
  tagline:
    'Building practical software and AI/ML projects, exploring research, and developing technology ideas that solve real-world problems.',
  email: 'jalalmahammadsohail@gmail.com',
  phone: '7382643588',
  phoneFormatted: '+91 73826 43588',
  githubUrl: 'https://github.com/Sohail07x',
  githubUser: 'Sohail07x',
  linkedinUrl: 'https://www.linkedin.com/in/jalalmahammadsohail',
  location: 'Hyderabad / India',
  roles: ['AI/ML Developer', 'Software Developer', 'CS Student', 'Tech Researcher'],
  bioParagraphs: [
    "I'm a Computer Science student passionate about software development, Artificial Intelligence, and Machine Learning. I enjoy exploring technical concepts, building practical projects, and learning how technology can solve meaningful real-world challenges.",
    "My current focus is strengthening my programming and development skills, working on AI/ML-based projects, and exploring research opportunities. I value continuous learning, creative problem-solving, and turning ideas into working prototypes.",
    "I'm looking for opportunities to learn from experienced developers, contribute to meaningful projects, and grow through internships and collaborative work.",
  ],
  education: {
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    status: 'Undergraduate Student',
    focus: 'Software Engineering, AI/ML, and Cybersecurity',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java/Python)',
      'Database Management Systems & SQL',
      'Machine Learning Foundations',
      'Web Application Fundamentals',
      'Operating Systems & Networks',
    ],
    researchInterests: [
      'Artificial Intelligence & Machine Learning',
      'Inclusive EdTech & Adaptive Learning Platforms',
      'Web Security & Anomaly Detection Systems',
      'Real-world Applied Problem Solving',
    ],
  },
};

export const CAREER_GOALS: CareerGoal[] = [
  {
    id: 'internships',
    title: 'Internships & Practical Development',
    description:
      'Contribute to production-grade codebases, learn software design patterns under senior engineers, and gain hands-on industrial development experience.',
    badge: 'Immediate Priority',
  },
  {
    id: 'ai-ml-fundamentals',
    title: 'AI/ML & Core Engineering Mastery',
    description:
      'Deepen mathematical understanding of machine learning algorithms, statistical data analysis, and scalable backend architectures.',
    badge: 'Technical Growth',
  },
  {
    id: 'applied-research',
    title: 'Exploratory & Applied Research',
    description:
      'Author technical literature reviews, experiment with inclusive adaptive learning tools, and prototype novel security mechanisms.',
    badge: 'Academic Curiosity',
  },
  {
    id: 'startup-ideas',
    title: 'Purpose-Driven Startup Concepts',
    description:
      'Validate technological ideas that address underserved friction points in education, productivity, and cyber defense.',
    badge: 'Long-term Vision',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming Languages',
    description: 'Foundational problem solving and systems programming',
    skills: [
      { name: 'Python', level: 'Proficient', note: 'Primary language for ML, scripting, and Flask web backends' },
      { name: 'Java', level: 'Familiar', note: 'Object-oriented programming, data structures, and core syntax' },
      { name: 'C', level: 'Familiar', note: 'Memory concepts, pointers, and foundational algorithms' },
      { name: 'C++', level: 'Familiar', note: 'Object-oriented programming and competitive problem solving' },
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & Data Science',
    description: 'Data analysis, statistical modeling, and ML heuristics',
    skills: [
      { name: 'AI/ML Fundamentals', level: 'Proficient', note: 'Supervised learning, classification, regression, model evaluation' },
      { name: 'NumPy', level: 'Proficient', note: 'Multidimensional array operations and numerical computation' },
      { name: 'Pandas', level: 'Proficient', note: 'Dataframe manipulation, data cleaning, and feature engineering' },
      { name: 'Scikit-learn', level: 'Familiar', note: 'Model training pipelines, Random Forest, decision boundaries' },
      { name: 'Generative AI', level: 'Developing / Exploring', note: 'Prompt engineering, LLM interfaces, and multimodal experiments' },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Responsive user interfaces and lightweight backend services',
    skills: [
      { name: 'HTML5', level: 'Proficient', note: 'Semantic markup, accessibility standards, and document structure' },
      { name: 'CSS3 / Tailwind', level: 'Proficient', note: 'Modern layouts, flexbox, grid, and kinetic UI animations' },
      { name: 'Flask', level: 'Familiar', note: 'Micro-web framework for ML inference APIs and prototype backends' },
      { name: 'Web Fundamentals', level: 'Proficient', note: 'HTTP methods, DOM manipulation, client-server models, REST' },
      { name: 'JavaScript / React', level: 'Familiar', note: 'Component architecture, state management, and interactive SPAs' },
    ],
  },
  {
    id: 'tools-research',
    title: 'Tools & Research',
    description: 'Version control, database queries, and research methodology',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient', note: 'Branching, commits, pull requests, collaboration workflows' },
      { name: 'SQL', level: 'Familiar', note: 'Relational schema design, SELECT queries, JOINs, aggregations' },
      { name: 'Technical Writing', level: 'Proficient', note: 'Project documentation, system architecture notes, and READMEs' },
      { name: 'Literature Reviews', level: 'Proficient', note: 'Synthesizing academic papers, comparative research analysis' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'smartwaf-firewall',
    title: 'SmartWAF — Web Application Firewall',
    category: 'AI/ML Cybersecurity',
    year: '2026',
    image: smartwafImg,
    description:
      'An educational Web Application Firewall prototype engineered to inspect incoming HTTP payloads, extract linguistic and statistical features, and identify SQL Injection and XSS attacks using Random Forest classification.',
    role: 'Lead Developer & ML Researcher',
    client: 'Academic Security Prototype',
    colSpan: 'md:col-span-7',
    aspect: 'aspect-[16/10] md:aspect-auto md:min-h-[460px]',
    tags: ['Python', 'Flask', 'Scikit-learn', 'Random Forest', 'HTML/CSS'],
    metrics: '94.2% Test Accuracy · Educational Prototype',
    liveUrl: 'https://github.com/Sohail07x',
    githubUrl: 'https://github.com/Sohail07x/SmartWAF',
    statusNote: 'Educational prototype; not production-validated.',
    architecture: [
      '1. HTTP Request Ingestion: Intercepts client payload via Flask middleware.',
      '2. Feature Extraction: Calculates string entropy, keyword frequency (OR, UNION, SELECT, <script>), character ratios, and payload length.',
      '3. ML Model Evaluation: Pre-trained Scikit-learn Random Forest classifier predicts threat likelihood probability.',
      '4. Action Dispatcher: Blocks anomalous requests with HTTP 403, logs audit trails, or forwards clean traffic with HTTP 200.',
    ],
    sampleInputsOutputs: [
      {
        input: "GET /api/users?id=' OR 1=1 --",
        detectedType: 'SQL Injection (SQLi)',
        output: 'Threat Score: 0.98 · Malicious pattern matched',
        action: 'Blocked (HTTP 403)',
      },
      {
        input: "POST /comments body=<script>alert('xss')</script>",
        detectedType: 'Cross-Site Scripting (XSS)',
        output: 'Threat Score: 0.95 · Suspicious script tag detected',
        action: 'Blocked (HTTP 403)',
      },
      {
        input: 'GET /dashboard?view=analytics&page=2',
        detectedType: 'Benign Traffic',
        output: 'Threat Score: 0.02 · Clean parameters',
        action: 'Allowed (HTTP 200)',
      },
    ],
    testCases: [
      'Tested against synthetic SQLi and XSS payloads collected from public SecLists datasets.',
      'Evaluated across 1,000+ benign web requests to measure false positive rate (~5.1%).',
      'Demonstrated resilient detection against common raw injection attacks.',
    ],
    limitations: [
      'Educational prototype; not validated for mission-critical enterprise production environments.',
      'Heavily obfuscated or multi-layer encoded payloads (e.g. hex/unicode variations) can bypass current regex tokenizers.',
      'Inference throughput not optimized for high-volume DDoS stream processing.',
    ],
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    category: 'Web Engineering & UI Craft',
    year: '2026',
    image: brandIdentityImg,
    description:
      'A responsive dark portfolio built with React, Vite, Tailwind CSS, TypeScript, GSAP kinetic animations, and Framer Motion. Engineered to showcase professional milestones, skills, and interactive project deep dives.',
    role: 'Frontend Architect & Designer',
    client: 'Personal Project',
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-auto md:min-h-[460px]',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    metrics: '100% Responsive · Zero Jitter Layout',
    liveUrl: 'https://github.com/Sohail07x',
    githubUrl: 'https://github.com/Sohail07x/portfolio',
    statusNote: 'Live Production Website & Source Repository.',
    architecture: [
      'Single-page architecture with component isolation and modular data contracts.',
      'GSAP ScrollTrigger driven parallax and Framer Motion spring interactions.',
      'HLS video streaming integration with automatic codec capability detection.',
      'Forced dark aesthetic adhering to strict 60-30-10 color distribution guidelines.',
    ],
    testCases: [
      'Cross-device layout verification across 375px mobile, 768px tablet, and 1440px desktop viewports.',
      'Keyboard accessibility and focus management on all interactive dialogs.',
      'Instant interactive search and modal states with zero dead clicks.',
    ],
    limitations: [
      'Video playback relies on user bandwidth and hardware acceleration.',
    ],
  },
  {
    id: 'adaptive-learning-edtech',
    title: 'Adaptive Learning Knowledge Graph',
    category: 'EdTech & AI Research',
    year: '2026',
    image: edtechImg,
    description:
      'An applied research prototype exploring inclusive EdTech. Uses knowledge graph dependency networks and learner performance modeling to recommend personalized remedial learning paths for students struggling with STEM concepts.',
    role: 'Researcher & Developer',
    client: 'Academic Exploratory Research',
    colSpan: 'md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-auto md:min-h-[460px]',
    tags: ['Python', 'AI/ML', 'Knowledge Graphs', 'NumPy', 'Data Analysis'],
    metrics: 'Adaptive Concept Trajectories · Research Prototype',
    liveUrl: 'https://github.com/Sohail07x',
    githubUrl: 'https://github.com/Sohail07x',
    statusNote: 'Research prototype in active exploration.',
    architecture: [
      'Knowledge Graph DAG defining conceptual prerequisite chains across mathematics and computer science.',
      'Student Mastery Scoring model updating probabilistically on exercise feedback.',
      'Pathfinder algorithm highlighting the minimum prerequisite gap when a student falters.',
    ],
    testCases: [
      'Simulated 50 learner trajectories through calculus and algorithmic prerequisites.',
      'Measured reduction in student cognitive overload when broken into sub-concept micro-lessons.',
    ],
    limitations: [
      'Currently reliant on manually curated concept graphs rather than automated NLP graph extraction.',
    ],
  },
  {
    id: 'network-anomaly-detector',
    title: 'Cyber Traffic Anomaly Classifier',
    category: 'Data Science & Threat Intel',
    year: '2025',
    image: architectureImg,
    description:
      'A machine learning pipeline developed to analyze network packet logs, flag anomalous traffic bursts, and identify potential reconnaissance scanning before full exploitation attempts.',
    role: 'Data Engineer & Analyst',
    client: 'Self-Directed Study',
    colSpan: 'md:col-span-7',
    aspect: 'aspect-[16/10] md:aspect-auto md:min-h-[460px]',
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    metrics: 'Statistical Outlier Filtering · Exploratory',
    liveUrl: 'https://github.com/Sohail07x',
    githubUrl: 'https://github.com/Sohail07x',
    statusNote: 'Exploratory data analysis notebook & pipeline.',
    architecture: [
      'Data preprocessing pipeline cleaning raw CSV connection logs and standardizing timestamp intervals.',
      'Feature engineering extracting inter-arrival packet intervals and destination port entropy.',
      'Isolation Forest and K-Means clustering for unsupervised anomaly tagging.',
    ],
    testCases: [
      'Tested against benchmark network intrusion datasets with synthetic port-scan injections.',
    ],
    limitations: [
      'Batch log processing only; streaming real-time Kafka integration is a planned roadmap goal.',
    ],
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'smartwaf-lessons',
    title: 'Building a Web Application Firewall from Scratch: Lessons in ML Threat Detection',
    image: smartwafImg,
    readTime: '6 min read',
    date: 'Oct 2026',
    category: 'Security & ML',
    excerpt:
      'Reflections on building SmartWAF with Python, Flask, and Random Forests — why static regex rules fall short and where lightweight ML classifiers shine.',
  },
  {
    id: 'adaptive-learning-vision',
    title: 'Adaptive Learning Networks: How AI Can Empower Diverse Student Paces',
    image: edtechImg,
    readTime: '5 min read',
    date: 'Sep 2026',
    category: 'EdTech Research',
    excerpt:
      'Exploring how concept prerequisite graphs prevent student disengagement in computer science education through real-time feedback loops.',
  },
  {
    id: 'cs-student-journey',
    title: 'From Fundamentals to Prototypes: My Journey as a CS Undergrad',
    image: abstractExplorationImg,
    readTime: '4 min read',
    date: 'Aug 2026',
    category: 'Growth & Reflection',
    excerpt:
      'Why building practical projects alongside university coursework is the most effective way to turn theoretical concepts into intuitive engineering muscle.',
  },
  {
    id: 'honest-developer-skills',
    title: 'The Value of Transparent Skill Assessment in Early-Stage Software Development',
    image: brandIdentityImg,
    readTime: '5 min read',
    date: 'Jul 2026',
    category: 'Career & Craft',
    excerpt:
      'Distinguishing between concepts you have mastered versus technologies you are actively exploring — and why recruiters respect authentic humility.',
  },
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'smartwaf-decision-surface',
    title: 'SmartWAF Decision Boundary',
    category: 'Model Architecture',
    image: smartwafImg,
    rotation: '-rotate-2',
    aspect: 'aspect-square',
    tools: 'Scikit-learn / Matplotlib',
  },
  {
    id: 'edtech-concept-dag',
    title: 'Prerequisite Knowledge DAG',
    category: 'EdTech Research',
    image: edtechImg,
    rotation: 'rotate-3',
    aspect: 'aspect-square',
    tools: 'NetworkX / Graph Theory',
  },
  {
    id: 'brutalist-interface',
    title: 'Kinetic UI Interaction Prototype',
    category: 'Frontend Craft',
    image: brandIdentityImg,
    rotation: '-rotate-1',
    aspect: 'aspect-square',
    tools: 'React / GSAP / Tailwind',
  },
  {
    id: 'anomaly-heatmap',
    title: 'Network Packet Anomaly Heatmap',
    category: 'Data Science',
    image: architectureImg,
    rotation: 'rotate-2',
    aspect: 'aspect-square',
    tools: 'Pandas / Seaborn',
  },
  {
    id: 'token-entropy-study',
    title: 'Payload Token Entropy Metric',
    category: 'Cybersecurity',
    image: smartwafImg,
    rotation: '-rotate-3',
    aspect: 'aspect-square',
    tools: 'Python String Analytics',
  },
  {
    id: 'neural-fluid-study',
    title: 'Generative AI Experimentation',
    category: 'Exploratory Tech',
    image: abstractExplorationImg,
    rotation: 'rotate-1',
    aspect: 'aspect-square',
    tools: 'Python / Gemini API',
  },
];

export const STATS = [
  {
    value: '4+',
    label: 'Core Focus Areas',
    detail: 'Software Engineering, AI/ML Applications, Web Application Security, and Inclusive EdTech.',
  },
  {
    value: '10+',
    label: 'Practical Technologies',
    detail: 'From Python, Flask, and Scikit-learn to Java, C/C++, SQL, Git, and Modern Web Stacks.',
  },
  {
    value: '100%',
    label: 'Dedication to Impact',
    detail: 'Committed to continuous learning, collaborative growth, and turning ideas into functioning prototypes.',
  },
];
