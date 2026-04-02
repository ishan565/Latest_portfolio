import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDatabase,
  FaGraduationCap,
  FaCertificate,
} from 'react-icons/fa';
import {
  SiCplusplus,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiTensorflow,
  SiPowerbi,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiSpringboot,
  SiInformatica,
  SiOpenai,
  SiSnowflake,
  SiTableau,
  SiSalesforce,
  SiAmazonaws,
  SiGooglecloud,
  SiJira,
  SiDocker,
  SiKubernetes,
  SiKeras,
  SiOpencv,
  SiMicrosoftazure,
  SiLeetcode,
  SiCodeforces,
  SiGeeksforgeeks,
  SiCodechef,
  SiHackerrank,
  SiCoursera,
} from 'react-icons/si';
import { FaJava, FaBrain, FaRobot } from 'react-icons/fa6';
import { TbBrain, TbMathFunction } from 'react-icons/tb';
import { MdOutlineImageSearch, MdCloudUpload } from 'react-icons/md';

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'contact', title: 'Contact' },
];

export const heroContent = {
  greeting: "Hi, I'm",
  name: 'Ishan Gupta',
  taglines: [
    'Full Stack Developer',
    'Software & Development Intern @ Cvent',
    'AI Agent Builder',
    'Cloud & ML Enthusiast',
  ],
  description:
    'Software & Development Intern at Cvent. I build scalable web apps, AI agents, and cloud-native solutions that solve real problems.',
  resumeUrl: '/Ishan_Resume.pdf',
};

export const aboutContent = {
  bio: [
    "Software & Development Intern at Cvent alongside building full stack products that are both powerful and beautiful. I work across React, Next.js, Node.js, Express, and Spring Boot, and have hands-on experience with enterprise platforms like Salesforce and Informatica.",
    "Day to day at Cvent, I build AI agents, ship microservices on AWS and GCP with Docker and Kubernetes, and keep everything on track through Jira. Outside of work, I dig into Gen AI, RAG pipelines, and neural networks. I've applied them to real projects like skin cancer detection and intelligent waste sorting.",
    "I like working where engineering meets impact. Whether it's a polished frontend, a resilient backend, or an ML pipeline, I care about shipping things that actually matter.",
  ],
  stats: [
    { label: 'Projects Shipped', value: '10+' },
    { label: 'Technologies', value: '25+' },
    { label: 'Lines of Code', value: '5000+' },
    { label: 'Contributions', value: '200+' },
  ],
  education: {
    degree: 'B.Tech in Computer Science',
    institution: 'Punjab Engineering College',
    location: 'Chandigarh',
    icon: FaGraduationCap,
  },
  coursework: [
    'Data Structures & Algorithms',
    'Data Science & Machine Learning',
    'Object Oriented Programming',
    'Python Programming',
    'Essentials of Finance',
    'Computer Networks',
    'Operating Systems',
  ],
  codingProfiles: [
    {
      platform: 'LeetCode',
      icon: SiLeetcode,
      color: '#FFA116',
      stat: '211 Problems',
      detail: 'Contest Rating 1466',
      href: 'https://leetcode.com/u/Ishan_565/',
    },
    {
      platform: 'Codeforces',
      icon: SiCodeforces,
      color: '#1F8ACB',
      stat: 'Max 1179',
      detail: '21 Problems Solved',
      href: 'https://codeforces.com/profile/ishangupta565',
    },
    {
      platform: 'GeeksforGeeks',
      icon: SiGeeksforgeeks,
      color: '#2F8D46',
      stat: '100+ Problems',
      detail: 'DSA & Practice',
      href: 'https://www.geeksforgeeks.org/user/ishangupta565/',
    },
    {
      platform: 'CodeChef',
      icon: SiCodechef,
      color: '#5B4638',
      stat: '3★ Rated',
      detail: 'Competitive Programming',
      href: 'https://www.codechef.com/users/ishan_565',
    },
    {
      platform: 'HackerRank',
      icon: SiHackerrank,
      color: '#00EA64',
      stat: '5★ C++',
      detail: 'Problem Solving',
      href: 'https://www.hackerrank.com/profile/ishangupta565',
    },
  ],
  certifications: [
    {
      title: 'Advanced Learning Algorithms',
      issuer: 'Coursera',
      icon: SiCoursera,
      href: 'https://www.coursera.org/account/accomplishments/certificate/OC5CMFZE9WY8',
    },
    {
      title: 'Data Structures',
      issuer: 'Coursera',
      icon: SiCoursera,
      href: 'https://www.coursera.org/account/accomplishments/certificate/BBJ1DQ3CHOA3',
    },
  ],
};

export const projects = [
  {
    title: 'DermaScan AI',
    description:
      'AI-powered skin cancer detection system using CNN deep learning models with real-time image analysis, OpenCV preprocessing, and diagnostic insights.',
    longDescription:
      'DermaScan AI is a medical-grade skin cancer detection platform that leverages Convolutional Neural Networks (CNN) trained on dermatology datasets. Users upload skin lesion images which are preprocessed using OpenCV (resizing, normalization, data augmentation) before being classified by a Keras/TensorFlow model. The system provides confidence scores, diagnostic insights, and risk-level categories. Images are stored via Cloudinary, and patient history is tracked in MongoDB. The React frontend delivers a clean clinical interface with real-time inference results.',
    tags: ['React.js', 'TensorFlow.js', 'CNN', 'OpenCV', 'Keras', 'MongoDB', 'Cloudinary'],
    image: '/projects/dermascan.png',
    github: 'https://github.com/ishan565/dermaScan.git',
    live: '#',
    featured: true,
    highlights: ['CNN-based lesion classification', 'OpenCV image preprocessing', 'Confidence scoring & risk levels', 'Cloud image storage via Cloudinary'],
  },
  {
    title: 'Decision Intelligence Platform',
    description:
      'AI-driven decision engine using MCDA scoring, confidence modeling, explainable AI (XAI), and local RAG retrieval with Azure OpenAI for grounded explanations.',
    longDescription:
      'The Decision Intelligence Platform turns subjective choices into structured, explainable decisions using Multi-Criteria Decision Analysis (MCDA). Users assign importance weights to criteria and score options, and the engine computes optimal choices with confidence scores. It features Explainable AI (XAI) that pinpoints dominant and weakest factors with clear reasoning. A local RAG pipeline using cosine similarity pulls relevant facts from a knowledge base, then injects them into Azure OpenAI prompts for grounded explanations. Also includes scenario simulation to compare outcomes across different preference setups, with React charts for visualization.',
    tags: ['Spring Boot', 'Java', 'React', 'Azure OpenAI', 'RAG', 'MCDA', 'Tailwind CSS', 'Recharts'],
    image: '/projects/decisionai.png',
    github: 'https://github.com/ishan565/DecisionAI-RAG-GenAI-',
    live: '#',
    featured: true,
    highlights: ['MCDA weighted scoring engine', 'Explainable AI (XAI) reasoning', 'Local RAG with cosine similarity', 'Scenario simulation & comparison'],
  },
  {
    title: 'Attendify',
    description:
      'Student companion and tracker with real-time attendance statistics, smart notifications, and performance analytics.',
    longDescription:
      'Attendify is a comprehensive student attendance management system designed to simplify how students and educators track academic participation. It features real-time attendance statistics with visual dashboards, smart push notifications for low-attendance warnings, subject-wise performance analytics with trend graphs, and a clean responsive UI. The backend uses Express with MongoDB for persistent data storage and JWT-based authentication for secure access control.',
    tags: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    image: '/projects/attendify.png',
    github: 'https://github.com/ishan565',
    live: 'https://attendify-ishan.vercel.app/',
    featured: true,
    highlights: ['Real-time attendance tracking', 'Smart notifications & alerts', 'Subject-wise analytics', 'JWT authentication'],
  },
  {
    title: 'Expocity Travels',
    description:
      'Freelance project. A travel management platform for seamless bookings, destination exploration, and itinerary planning.',
    longDescription:
      'Expocity Travels is a freelance travel management platform built for a travel agency client. It features a destination discovery engine with rich media galleries, a booking system with real-time availability slots, interactive itinerary planning with Google Maps integration for route visualization, and a responsive storefront. The MySQL database handles complex relational data for packages, bookings, and customer management. Styled with Tailwind CSS for a modern, mobile-first travel experience.',
    tags: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Google Maps API'],
    image: '/projects/expocity.png',
    github: 'https://github.com/ishan565',
    live: 'https://expocity.vercel.app/',
    featured: true,
    highlights: ['Google Maps route visualization', 'Real-time booking system', 'Destination discovery engine', 'Freelance client delivery'],
  },
  {
    title: 'Eco-Sort AI',
    description:
      'Intelligent waste classification system promoting eco-conscious disposal through AI-powered image recognition.',
    longDescription:
      'Eco-Sort AI is an environmental tech project that uses a TensorFlow.js image classification model to identify and categorize different types of waste (recyclable, organic, hazardous, e-waste). Users capture or upload photos of waste items, and the AI model instantly classifies them with disposal recommendations. The app promotes eco-conscious behavior through gamification, tracking the user\'s green score over time. Built with a React frontend and an Express/Node.js backend for model serving and user data management.',
    tags: ['TensorFlow.js', 'React', 'Express', 'Node.js', 'Tailwind CSS'],
    image: '/projects/ecosort.png',
    github: 'https://github.com/ishan565',
    live: '#',
    featured: false,
    highlights: ['Image-based waste classification', 'Disposal recommendations', 'Green score gamification', 'Real-time AI inference'],
  },
  {
    title: 'Visual Analytics Dashboard',
    description:
      'Interactive Power BI dashboard for credit risk analysis with advanced DAX calculations and data engineering pipelines.',
    longDescription:
      'A comprehensive data analytics solution built with Power BI for credit risk assessment in financial services. Features complex DAX measures for calculating probability of default, loss given default, and exposure at default. Includes interactive drill-through pages, dynamic filtering, and KPI cards. The data pipeline involves ETL processes for cleaning and transforming raw loan data, building star-schema models, and creating calculated columns and measures that provide actionable insights to risk analysts.',
    tags: ['Power BI', 'Advanced DAX', 'Data Engineering'],
    image: '/projects/analytics.png',
    github: 'https://github.com/ishan565/powerbi-loan-dashboard',
    live: '#',
    featured: false,
    highlights: ['Advanced DAX calculations', 'Credit risk modeling', 'Interactive drill-through reports', 'Star-schema data modeling'],
  },
  
  {
    title: 'TaskSphere',
    description:
      'Full-featured event management system with smart booking slots, role-based access control, and real-time updates.',
    longDescription:
      'TaskSphere is a full-stack event management platform that streamlines event creation, booking, and attendee management. Features include smart time-slot allocation that prevents double-booking, role-based access control (admin/organizer/attendee), real-time event updates via polling, and a dashboard with event analytics. Built with Next.js for SSR performance, Node.js backend, and MongoDB for flexible event schema storage. The UI is clean and intuitive with calendar views and drag-and-drop scheduling.',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    image: '/projects/tasksphere.png',
    github: 'https://github.com/ishan565',
    live: '#',
    featured: false,
    highlights: ['Smart slot allocation', 'Role-based access control', 'Real-time event updates', 'Calendar & drag-and-drop UI'],
  },
];

export const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Python', icon: FaPython, color: '#3776AB' },
      { name: 'SQL', icon: FaDatabase, color: '#336791' },
    ],
  },
  {
    title: 'Frameworks & Tools',
    skills: [
      { name: 'React.js', icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Informatica', icon: SiInformatica, color: '#FF4D00' },
      { name: 'Salesforce', icon: SiSalesforce, color: '#00A1E0' },
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'Jira', icon: SiJira, color: '#0052CC' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Power BI', icon: SiPowerbi, color: '#F2C811' },
      { name: 'Tableau', icon: SiTableau, color: '#E97627' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow.js', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Keras', icon: SiKeras, color: '#D00000' },
      { name: 'CNN', icon: MdOutlineImageSearch, color: '#FF6F00' },
      { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
      { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Neural Networks', icon: TbBrain, color: '#E040FB' },
      { name: 'Gen AI', icon: SiOpenai, color: '#00A67E' },
      { name: 'RAG', icon: FaRobot, color: '#7C3AED' },
      { name: 'XAI', icon: FaBrain, color: '#00BCD4' },
      { name: 'MCDA', icon: TbMathFunction, color: '#FF9800' },
      { name: 'Azure OpenAI', icon: SiMicrosoftazure, color: '#0078D4' },
      { name: 'Cloudinary', icon: MdCloudUpload, color: '#3448C5' },
      { name: 'NumPy', icon: SiNumpy, color: '#013243' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: SiAmazonaws, color: '#FF9900' },
      { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Snowflake', icon: SiSnowflake, color: '#29B5E8' },
    ],
  },
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/ishan-gupta-7b1078281/',
  github: 'https://github.com/ishan565',
  email: 'ishangupta565@gmail.com',
};
