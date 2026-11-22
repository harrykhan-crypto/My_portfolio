// ============================================================
//  Saari details yahan hain. Sirf is file ko edit karein —
//  poori website khud update ho jayegi.
// ============================================================

export const site = {
  name: "Hasnain Maqsood",
  firstName: "Hasnain",
  bigName: "HASNAIN", // hero mein peeche bara naam
  handle: "harry", // navbar mein
  location: "Nowshera, Pakistan",
  email: "khanhussnain532@gmail.com",
  phone: "+92 335 0157649", // nahi dikhana to "" kar dein

  roles: ["Software Engineer", "UI/UX Designer", "React Developer", "Problem Solver"],

  about: [
    "I'm a Software Engineering student at Abasyn University Peshawar who builds reliable, well-tested software and cares about how it feels to use.",
    "I start with the user's problem, not the screen — map the flow, design a clean interface in Figma, then build it with React, Node.js and Python.",
  ],

  stats: [
    { n: 3, s: "+", label: "Years building software" },
    { n: 15, s: "+", label: "Projects shipped" },
    { n: 100, s: "%", label: "Commitment to clean code" },
  ],

  marquee: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "SQL", "Docker", "Git", "Figma", "Tailwind"],

  skills: [
    { name: "JavaScript / TypeScript", level: 90 },
    { name: "React and Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "Databases and SQL", level: 75 },
    { name: "Figma & Prototyping", level: 95 },
  ],

  experience: [
    {
      when: "2024 — Present",
      title: "Software Engineer · Student",
      text: "Building full-stack projects with React, Node.js and Python while studying software engineering.",
    },
    {
      when: "2024 — 2028",
      title: "BS Software Engineering · Abasyn University Peshawar",
      text: "Studying software design, data structures, databases and web engineering.",
    },
    {
      when: "2022 — 2024",
      title: "Learner",
      text: "Started with HTML, CSS and JavaScript, then moved on to React, Node.js and UI/UX design.",
    },
  ],

  projects: [
    {
      title: "First Call Company — Pakistan × Dubai",
      text: "A business company website that sells and buys products.",
      tags: ["JavaScript", "Node.js", "PostgreSQL"],
      status: "Live",
      link: "", // live link ya GitHub repo yahan
      color: "linear-gradient(135deg,#ff9a3c,#c2410c)",
    },
    {
      title: "REST API Service",
      text: "A Python REST API, containerised with Docker. Currently in progress.",
      tags: ["Python", "REST API", "Docker"],
      status: "In progress",
      link: "",
      color: "linear-gradient(135deg,#818cf8,#4338ca)",
    },
    {
      title: "React + TypeScript App",
      text: "A typed React front end — details and demo coming soon.",
      tags: ["React", "TypeScript"],
      status: "In progress",
      link: "",
      color: "linear-gradient(135deg,#34d399,#0f766e)",
    },
  ],

  socials: [
    { name: "GitHub", url: "https://github.com/harrykhan-crypto", icon: "github" },
    { name: "Instagram", url: "https://instagram.com/harr.y_.11", icon: "instagram" },
    { name: "Email", url: "mailto:khanhussnain532@gmail.com", icon: "mail" },
  ],

  // "Book a Call" button — abhi WhatsApp khulta hai. Email chahiye to:
  // callLink: "mailto:khanhussnain532@gmail.com?subject=Let's%20book%20a%20call"
  callLink: "https://wa.me/923350157649?text=Hi%20Hasnain!%20I%27d%20like%20to%20book%20a%20call.",

  collaboration: "I prioritize client collaboration, fostering open communication.",

  // Tech stack — 3 rows that scroll. `icon` = file name in public/icons
  techStack: [
    [
      { name: "HTML", icon: "html5" }, { name: "CSS", icon: "css3" }, { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" }, { name: "Tailwind", icon: "tailwindcss" }, { name: "React", icon: "react" },
    ],
    [
      { name: "Next.js", icon: "nextjs" }, { name: "Node.js", icon: "nodejs" }, { name: "Python", icon: "python" },
      { name: "PostgreSQL", icon: "postgresql" }, { name: "Docker", icon: "docker" }, { name: "Figma", icon: "figma" },
    ],
    [
      { name: "Git", icon: "git" }, { name: "GitHub", icon: "github" }, { name: "VS Code", icon: "vscode" },
      { name: "Netlify", icon: "netlify" }, { name: "Vercel", icon: "vercel" }, { name: "Canva", icon: "canva" },
    ],
  ],

  faq: [
    {
      q: "What services do you provide?",
      a: "I design and build websites and web apps — from UI/UX design in Figma to responsive front ends in React and Next.js, plus back ends with Node.js or Python when a project needs one.",
    },
    {
      q: "How much experience do you have?",
      a: "I've been building software since 2022 and have shipped 15+ projects. I'm currently studying BS Software Engineering at Abasyn University Peshawar.",
    },
    {
      q: "Can you convert Figma designs into code?",
      a: "Yes. I turn Figma designs into pixel-careful, responsive code with React, Next.js and Tailwind CSS — fast, accessible and easy to update.",
    },
    {
      q: "What do you need to start a project?",
      a: "A short brief: what you're building, who it's for, any designs or reference sites you like, your content, and your timeline. Then I'll send a plan and a rough estimate.",
    },
    {
      q: "Do you work with clients outside Pakistan?",
      a: "Yes — I work remotely and have built for a Pakistan × Dubai business. We can talk over WhatsApp, email or a video call, whatever suits you.",
    },
  ],

  // Avatar par click karne se ye baatein bolta hai
  greetings: ["Salam! 👋", "Kya haal hai?", "Hire me 😎", "Scroll down ↓"],
};
