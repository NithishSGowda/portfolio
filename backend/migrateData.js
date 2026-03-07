import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Models
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  github: String,
  demo: String,
  featured: Boolean,
  image: String,
  fullDescription: String,
  features: [String],
  technologies: [String],
  workflow: [String]
}, { timestamps: true });

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  location: String,
  period: String,
  grade: String,
  highlights: [String]
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  category: String,
  skills: [{ name: String, level: Number }]
}, { timestamps: true });

const certificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  date: String,
  credentialId: String,
  description: String,
  link: String,
  image: String
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
  title: String,
  type: String,
  category: String,
  date: String,
  description: String,
  details: String,
  position: String,
  images: [String],
  certificate: String,
  ticket: String
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
const Education = mongoose.model('Education', educationSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Certification = mongoose.model('Certification', certificationSchema);
const Event = mongoose.model('Event', eventSchema);

// Data
const projects = [
  {
    title: 'Cerberus Scanner',
    description: 'AI-powered website vulnerability scanner that analyzes websites and automatically generates comprehensive security reports with actionable mitigation steps.',
    tech: ['Python', 'React', 'Google Studio API'],
    github: 'https://github.com/NithishSGowda/cerberus-scanner',
    demo: 'details',
    featured: true,
    image: '/image.png',
    fullDescription: 'Cerberus Scanner is a cybersecurity tool designed to analyze websites and identify potential security vulnerabilities. The project focuses on automating the process of scanning web applications for common security issues and providing clear insights into detected threats.',
    features: [
      'Website Security Scanning - Scans target website URL and analyzes responses',
      'Vulnerability Detection - Checks for XSS, missing headers, misconfigurations',
      'Automated Analysis - Processes HTTP responses automatically',
      'Security Reporting - Produces structured vulnerability reports',
      'Developer Friendly - Helps understand and fix security issues'
    ],
    technologies: ['Python', 'Requests Library', 'BeautifulSoup', 'HTML/CSS', 'Git & GitHub'],
    workflow: [
      'Target Input - User provides website URL',
      'Website Request - Sends HTTP requests and collects data',
      'Security Checks - Analyzes headers, structure, configurations',
      'Vulnerability Detection - Identifies security issues',
      'Result Generation - Categorizes and presents findings'
    ]
  },
  {
    title: 'AI Security Copilot',
    description: 'Intelligent AI system designed to explain detected code vulnerabilities, recommend precise fixes, and educate developers on secure coding practices in real-time.',
    tech: ['Python', 'Streamlit', 'Ollama Local Model', 'Cybersecurity'],
    github: 'https://github.com/NithishSGowda/ai-security-copilot',
    demo: 'details',
    featured: true,
    image: '/ai-security-copilot.png',
    fullDescription: 'AI Security Copilot is an intelligent cybersecurity platform that combines Artificial Intelligence with automated security analysis to help identify vulnerabilities, analyze threats, and provide security recommendations for web applications and systems.',
    features: [
      'AI-Based Security Analysis - Uses AI models to analyze and explain vulnerabilities',
      'Website Vulnerability Scanning - Automated security checks on target URLs',
      'Threat Explanation Engine - Explains how attackers might exploit vulnerabilities',
      'Security Recommendations - Suggests improvements and mitigation strategies',
      'Interactive Security Dashboard - Web-based interface for monitoring scans',
      'Automated Security Reporting - Generates structured security reports'
    ],
    technologies: ['Python', 'LLMs', 'Flask', 'HTML/CSS/JavaScript', 'Requests', 'BeautifulSoup'],
    workflow: [
      'Target Input - User enters website URL into dashboard',
      'Automated Scanning - System analyzes website responses',
      'Vulnerability Detection - Checks for XSS, headers, misconfigurations',
      'AI Analysis - AI explains vulnerabilities and exploitation methods',
      'Security Recommendations - Generates mitigation steps and best practices'
    ]
  },
  {
    title: 'ESP32 Captive Portal Game',
    description: 'IoT project that creates a WiFi access point with a captive portal hosting a browser-based Tic Tac Toe game.',
    tech: ['C++', 'ESP32', 'HTML/CSS/JS', 'IoT'],
    github: '#',
    demo: 'details',
    featured: false,
    image: '/esp32-game.png',
    fullDescription: 'ESP32 Captive Portal Game is an innovative IoT project that demonstrates how a microcontroller can host a web application through a captive portal.',
    features: [
      'WiFi Access Point Creation - ESP32 broadcasts its own wireless network',
      'Captive Portal Redirection - Automatically redirects connected users',
      'Browser-Based Game - Tic Tac Toe game built with HTML/CSS/JS',
      'Embedded Web Server - Lightweight web server runs on ESP32',
      'Fully Standalone System - Operates without external servers'
    ],
    technologies: ['C++', 'ESP32', 'HTML', 'CSS', 'JavaScript', 'IoT Networking'],
    workflow: [
      'WiFi Setup - ESP32 creates WiFi access point',
      'User Connection - User connects to the WiFi network',
      'Portal Intercept - Captive portal intercepts and redirects',
      'Game Serving - ESP32 web server serves game files',
      'Gameplay - User plays game directly in browser'
    ]
  },
  {
    title: 'SecureScan Pro',
    description: 'Advanced web vulnerability scanner that automatically scans websites to identify security weaknesses.',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'HTML/CSS/JS'],
    github: 'https://github.com/NithishSGowda/securescan-pro.git',
    demo: 'details',
    featured: false,
    image: '/securescan-pro.png',
    fullDescription: 'SecureScan Pro is a cybersecurity tool developed to automatically scan websites and identify potential security vulnerabilities.',
    features: [
      'Automated Website Scanning - Scans given website URL',
      'Vulnerability Detection - Detects missing HTTP headers, XSS',
      'Security Severity Classification - Categorizes vulnerabilities',
      'Security Report Generation - Produces structured reports',
      'Security Visualization - Dashboard showing vulnerabilities',
      'User-Friendly Interface - Simple interface for scanning'
    ],
    technologies: ['Python', 'Requests', 'BeautifulSoup', 'HTML/CSS/JavaScript', 'Git & GitHub'],
    workflow: [
      'Target Website Input - User provides URL',
      'HTTP Request Collection - Scanner sends requests',
      'Security Analysis - Analyzes HTTP headers and structure',
      'Vulnerability Detection - Detects potential vulnerabilities',
      'Result Generation - Displays results with severity'
    ]
  }
];

const education = [
  {
    degree: '10th',
    institution: 'Jnanasagra International Public School',
    location: 'Channarayapatna, Karnataka',
    period: '2021',
    grade: '70%',
    highlights: ['CBSE Board']
  },
  {
    degree: '12th',
    institution: 'Jnanasagra PU college',
    location: 'Channarayapatna, Karnataka',
    period: '2023',
    grade: '89%',
    highlights: ['Karnataka State Board', 'PCMC']
  },
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Maharaja Institute of Technology Mysore',
    location: 'Mysore, Karnataka',
    period: '2023 - 2027',
    grade: 'CGPA: 7.00/10',
    highlights: [
      'Specialized in Cybersecurity and blockchain Technology',
      'Relevant coursework: Network Security, Cryptography, Machine Learning',
      'Active member of Cybersecurity Club'
    ]
  }
];

const skills = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', level: 60 },
      { name: 'C', level: 65 },
      { name: 'C++', level: 50 },
      { name: 'HTML', level: 75 },
      { name: 'CSS', level: 75 }
    ]
  },
  {
    category: 'Cybersecurity Tools',
    skills: [
      { name: 'Kali Linux', level: 85 },
      { name: 'Burp Suite', level: 80 },
      { name: 'Nmap', level: 85 },
      { name: 'Wireshark', level: 75 },
      { name: 'Metasploit', level: 70 }
    ]
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Flask', level: 85 },
      { name: 'Streamlit', level: 75 }
    ]
  },
  {
    category: 'Other Technologies',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Linux Administration', level: 85 },
      { name: 'Docker', level: 70 }
    ]
  }
];

const certifications = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'January 2024',
    credentialId: 'AWS-12345',
    description: 'Validates expertise in designing distributed systems on AWS.',
    link: '#',
    image: '/certificates/aws-cert.jpg'
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: 'December 2023',
    credentialId: 'CEH-67890',
    description: 'Demonstrates knowledge of ethical hacking and penetration testing.',
    link: '#',
    image: '/certificates/ceh-cert.jpg'
  },
  {
    title: 'Python for Data Science',
    issuer: 'Coursera',
    date: 'November 2023',
    credentialId: 'PYDS-54321',
    description: 'Completed comprehensive Python programming and data analysis course.',
    link: '#',
    image: '/certificates/python-cert.jpg'
  }
];

const events = [
  {
    title: 'SAP Inside Track 2025 Bengaluru',
    type: 'Conference',
    category: 'event',
    date: 'March 2025',
    description: 'Attended the 3rd Edition of SAP Inside Track 2025, featuring sessions on GitHub Security, AI & Generative AI, and enterprise innovation.',
    details: 'The event offered a perfect blend of lecture sessions, demo pods, and hands-on experiences. Key sessions included: GitHub Security insights by Dhanashri Chavan, AI & Generative AI talk by Vigneshwari Sambandan, SAP Startup Studio session by Ashmita Sinha.',
    images: ['/sap-inside-track.png', '/sap-inside-track-2.png', '/sap-inside-track-3.png', '/sap-inside-track-4.png'],
    ticket: '#'
  },
  {
    title: 'IEEE Future Networks World Forum 2025',
    type: 'Conference',
    category: 'event',
    date: 'March 2025',
    description: 'Participated in IEEE Future Networks World Forum 2025 in Bengaluru, a global stage for leaders, researchers, and innovators working on 6G.',
    details: 'Gained valuable insights from experts at Nokia Bell Labs. Explored discussions on future wireless systems, AI-driven networks, and digital inclusion.',
    images: ['/ieee-future-networks-1.png', '/ieee-future-networks-2.png', '/ieee-future-networks-3.png', '/ieee-future-networks-4.png'],
    ticket: '#'
  },
  {
    title: 'Jnana Cauvery 2K25 - Analytics Arena',
    type: 'Competition',
    category: 'hackathon',
    date: 'May 2025',
    position: 'Participant',
    description: 'Participated in State Level Analytics Arena hosted by P.E.S. College of Engineering, Mandya and supported by IEEE.',
    details: 'Events like this are crucial for bridging the gap between academic theory and real-world data analysis challenges.',
    images: [],
    certificate: '/jnana-cauvery-2k25.png'
  },
  {
    title: 'Hackfinity Hackathon',
    type: 'Hackathon',
    category: 'hackathon',
    date: 'May 2025',
    position: 'Team Tech Titans',
    description: 'Participated in Hackfinity Hackathon organized by Department of Information Science & Engineering, MIT Mysore.',
    details: 'As part of Team Tech Titans, it was an exciting experience to brainstorm, collaborate, and work on innovative solutions under time constraints.',
    images: [],
    certificate: '/hackfinity-certificate.pdf'
  }
];

// Migration function
async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Education.deleteMany({});
    await Skill.deleteMany({});
    await Certification.deleteMany({});
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);

    await Education.insertMany(education);
    console.log(`✅ Inserted ${education.length} education entries`);

    await Skill.insertMany(skills);
    console.log(`✅ Inserted ${skills.length} skill categories`);

    await Certification.insertMany(certifications);
    console.log(`✅ Inserted ${certifications.length} certifications`);

    await Event.insertMany(events);
    console.log(`✅ Inserted ${events.length} events`);

    console.log('\n🎉 Migration completed successfully!');
    console.log('You can now view your data in MongoDB Compass');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
