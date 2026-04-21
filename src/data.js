export const profile = {
  name: 'Keyaan Minhas',
  email: 'keyaanminhas@gmail.com',
  phone: '+60 1128318300',
  location: 'Karachi, Pakistan',
  github: 'https://github.com/keyaanminhas',
  linkedin: 'https://www.linkedin.com/in/keyaan-minhas-42350b371/?skipRedirect=true',
  instagram: 'https://instagram.com/keyaanminhas',
  discord: 'ka4ma',
  headline: 'Computer Science & Cyber Security Undergraduate',
  subheading: 'Engineering Software. From intuitive UI to the Kernel.',
  summary:
    'Computer Science undergraduate specializing in Cyber Security with hands-on experience in full-stack mobile and web development, secure scalable apps, automation, reverse engineering, and compiler design.',
}

export const quickStats = [
  '500+ App Downloads',
  'Play Store & App Store',
  'Cyber Security & Systems',
]

export const filterCategories = [
  'All',
  'Mobile Apps',
  'Web Platforms',
  'Security & Compilers',
]

export const projectsData = [
  {
    id: 'minhas-lms',
    title: 'Minhas LMS',
    type: 'mobile',
    category: 'Mobile Apps',
    description:
      'Flutter/Moodle O/A Level Computer Science LMS app with AI tutor support, course access, and polished mobile study flows.',
    longDescription:
      'Lead-developed Minhas LMS as a cross-platform mobile LMS for Computer Science education on top of Moodle. The app supports course management, in-app content delivery, student access flows, AI-assisted help, animated browsing, and profile access. The App Store listing identifies Keyaan Minhas as the developer and describes the app as an O/A Level LMS with AI Tutor support.',
    techStack: ['Flutter', 'Dart', 'Moodle', 'RESTful APIs', 'Android Studio', 'Xcode'],
    github: null,
    liveDemo: 'https://minhasrupsi.computer',
    secondaryDemo: 'https://apps.apple.com/us/app/minhas-lms/id6749327960',
    links: [
      { label: 'Live Website', url: 'https://minhasrupsi.computer' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/minhas-lms/id6749327960' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=computer.minhasrupsi.minhaslms' },
    ],
    image: '/assets/projects/minhas-lms-dashboard.webp',
    webImage: '/assets/projects/minhasrupsi-web-screenshot.webp',
    webPreview: {
      height: 248,
      minHeight: 330,
      phoneOffset: 150,
      fit: 'cover',
      position: '62% 36%',
    },
    gallery: [
      '/assets/projects/minhasrupsi-web-screenshot.webp',
      '/assets/projects/minhas-lms-dashboard.webp',
      '/assets/projects/minhas-lms-course.webp',
    ],
    sourceLabel: 'App Store',
    sourceUrl: 'https://apps.apple.com/us/app/minhas-lms/id6749327960',
    accent: '#00d4ff',
  },
  {
    id: '89th-parallel-lms',
    title: '89th Parallel LMS',
    type: 'mobile',
    category: 'Mobile Apps',
    description:
      'Professional education LMS mobile app with Moodle authentication, rich media learning, AI study support, and cross-device flows.',
    longDescription:
      'Built 89th Parallel LMS as a separate Flutter/Moodle mobile education product. The app listing describes smart course management, real-time learning progress, rich media lessons, AI-powered learning support, cross-device sync, secure Moodle authentication, file downloads, and announcements. The public 89th Parallel website also credits "website by Keyaan Minhas."',
    techStack: ['Flutter', 'Dart', 'Moodle', 'RESTful APIs', 'Mobile UX', 'Education Tech'],
    github: null,
    liveDemo: 'https://89thparallel.me',
    secondaryDemo: 'https://apps.apple.com/gb/app/89th-parallel/id6752125503',
    links: [
      { label: 'Live Website', url: 'https://89thparallel.me' },
      { label: 'App Store', url: 'https://apps.apple.com/gb/app/89th-parallel/id6752125503' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=me.eightyninthparallel.lms' },
    ],
    image: '/assets/projects/89th-parallel-dashboard.webp',
    webImage: '/assets/projects/89thparallel-web-screenshot.webp',
    gallery: [
      '/assets/projects/89thparallel-web-screenshot.webp',
      '/assets/projects/89th-parallel-dashboard.webp',
      '/assets/projects/89th-parallel-course.webp',
      '/assets/projects/89thparallel-hero.webp',
    ],
    sourceLabel: 'App Store',
    sourceUrl: 'https://apps.apple.com/gb/app/89th-parallel/id6752125503',
    accent: '#7b61ff',
  },
  {
    id: 'ecube-tvet',
    title: 'eCube TVET College Website',
    type: 'web',
    category: 'Web Platforms',
    description:
      'Official responsive website for E CUBE TVET College in Malaysia, publicly credited to Keyaan Minhas.',
    longDescription:
      'Developed and maintained the official eCube TVET College website for a Malaysia-based Technical and Vocational Education and Training institution. The site presents programs, admissions, enquiry flows, success stories, contact details, and student-facing information architecture. Its public footer credits "Website by Keyaan Minhas."',
    techStack: ['React', 'JavaScript', 'HTML5/CSS3', 'Responsive UI', 'Content Management'],
    github: null,
    liveDemo: 'https://ecube.edu.my',
    image: '/assets/projects/ecube-screenshot.webp',
    gallery: ['/assets/projects/ecube-screenshot.webp', '/assets/projects/ecube-tvet-flag.webp'],
    sourceLabel: 'ecube.edu.my',
    sourceUrl: 'https://ecube.edu.my',
    accent: '#00d4ff',
  },
  {
    id: 'nexgen-education',
    title: 'NexGen Education Platform',
    type: 'web',
    category: 'Web Platforms',
    description:
      'Scalable education platform with faculty profiles, recorded lecture positioning, notes, solutions, and responsive UI/UX.',
    longDescription:
      'Built NexGen-Ed as a production education platform with structured academic content, faculty profiles, recorded lecture positioning, short notes, detailed solutions, contact flows, and responsive UX. The public NexGen-Ed site credits "Website By Keyaan Minhas."',
    techStack: ['React', 'JavaScript', 'HTML5/CSS3', 'Node.js', 'Responsive UI', 'UI/UX'],
    github: null,
    liveDemo: 'https://nexgen-ed.com',
    image: '/assets/projects/nexgen-home-screenshot.webp',
    imageFit: 'contain',
    imagePosition: 'center center',
    gallery: ['/assets/projects/nexgen-home-screenshot.webp', '/assets/projects/nexgen-logo.png'],
    sourceLabel: 'nexgen-ed.com',
    sourceUrl: 'https://nexgen-ed.com',
    accent: '#00d4ff',
  },
  {
    id: 'fass-academy',
    title: 'FASS Academy',
    type: 'web',
    category: 'Web Platforms',
    description:
      'Responsive school website for Fortune Advance Schooling System, built around admissions, programs, and parent/student enquiry flows.',
    longDescription:
      'FASS Academy is the website for Fortune Advance Schooling System. The site presents the school brand, admissions paths, programs, contact calls to action, and student-facing navigation with a clean responsive layout. This project is kept separate from the other education platforms so the portfolio reflects each shipped website as its own product.',
    techStack: ['JavaScript', 'HTML5/CSS3', 'Responsive UI', 'Education UX', 'Content Systems'],
    github: null,
    liveDemo: 'https://fass.academy',
    image: '/assets/projects/fass-academy-screenshot.webp',
    modalImageLayout: 'wide',
    modalImageFit: 'contain',
    modalImagePosition: 'center top',
    gallery: ['/assets/projects/fass-academy-screenshot.webp'],
    sourceLabel: 'FASS Academy',
    sourceUrl: 'https://fass.academy',
    accent: '#7b61ff',
  },
  {
    id: 'compyouters',
    title: 'CompYouters Educational Platform',
    type: 'web',
    category: 'Web Platforms',
    description:
      'Computer science education platform covering computer hardware and fundamentals with structured learner content.',
    longDescription:
      'Built a comprehensive educational platform for computer hardware and computer science learning. The site introduces learners to how computers work from low-level concepts upward, with structured reading flows and student-friendly content presentation.',
    techStack: ['HTML5/CSS3', 'JavaScript', 'Responsive UI', 'Education UX', 'Content Systems'],
    github: null,
    liveDemo: 'https://compyouters.org',
    image: '/assets/projects/compyouters-screenshot.webp',
    gallery: ['/assets/projects/compyouters-screenshot.webp'],
    sourceLabel: 'compyouters.org',
    sourceUrl: 'https://compyouters.org',
    accent: '#7b61ff',
  },
  {
    id: 'reverse-shell-loader',
    title: 'AV-Evasive Reverse-Shell Loader',
    type: 'security',
    category: 'Security & Compilers',
    description:
      'Controlled cyber security research loader achieving a Meterpreter shell while studying system defenses and detection surfaces.',
    longDescription:
      'A controlled cyber security research project focused on loader behavior, detection surfaces, payload staging, and defensive thinking. The work demonstrates reverse engineering fluency, Windows internals awareness, and practical knowledge of how offensive techniques are studied in order to harden systems.',
    techStack: ['C++', 'WinAPI', 'Reverse Engineering', 'Meterpreter', 'AV-Evasion', 'Systems Security'],
    github: null,
    liveDemo: null,
    accent: '#00ff88',
    terminalPrompt: 'keyaan@lab:~/loader$',
    terminalSnippet: `$ ./loader --profile controlled-lab
[INIT] resolving imports and runtime gates
[CHECK] sandbox signals: reviewed
[STAGE] encrypted payload mapped in memory
[OPSEC] static signatures reduced
[SESSION] meterpreter callback established
[NOTE] research environment only
$ _`,
  },
  {
    id: 'project-k-lang',
    title: 'Project K Lang',
    type: 'compiler',
    category: 'Security & Compilers',
    description:
      'GCSE-style pseudocode transpiler written entirely in C++, turning classroom logic into executable code.',
    longDescription:
      'Project K Lang explores compiler construction through a focused C++ transpiler. It handles GCSE-style pseudocode syntax, lexical analysis, parsing, and code emission, turning educational algorithms into a more practical programming workflow.',
    techStack: ['C++', 'Compiler Design', 'Parsing', 'Transpilers', 'Pseudocode', 'CLI'],
    github: null,
    liveDemo: null,
    accent: '#00ff88',
    terminalPrompt: 'keyaan@compiler:~/project-k$',
    terminalSnippet: `$ k-lang build coursework.k
[LEX] tokens generated
[PARSE] GCSE pseudocode AST ready
[TYPE] symbols resolved
[EMIT] generated C++ target
[RUN] output matched expected trace
$ _`,
  },
]

export const techGroups = [
  {
    label: 'Languages',
    items: ['C++', 'Python', 'JavaScript', 'Dart', 'HTML5/CSS3', 'SQL'],
    color: '#00ff88',
  },
  {
    label: 'Frameworks',
    items: ['Flutter', 'React', 'Node.js', 'Android Studio', 'Xcode'],
    color: '#00d4ff',
  },
  {
    label: 'Security/Systems',
    items: ['Reverse Engineering', 'AV-Evasion', 'RESTful APIs'],
    color: '#00ff88',
  },
]

export const techStack = techGroups.flatMap((group) =>
  group.items.map((name) => ({
    name,
    category: group.label,
    color: group.color,
  }))
)

export const timelineItems = [
  {
    type: 'Experience',
    title: 'Mobile Application Developer',
    organization: 'Self-Employed',
    period: '11/2024 - Present',
    description:
      'Collaborating with clients to architect and deploy native and cross-platform mobile apps, including Flutter/Moodle LMS products published across mobile platforms.',
    accent: '#00d4ff',
  },
  {
    type: 'Experience',
    title: 'Full Stack Web Developer',
    organization: 'Self-Employed',
    period: '01/2022 - Present',
    description:
      'Developing interactive web pages with JavaScript, HTML, CSS, responsive UI, and RESTful API integration for education platforms including eCube, NexGen, CompYouters, and FASS Academy.',
    accent: '#00d4ff',
  },
  {
    type: 'Experience',
    title: 'Automation Consultant',
    organization: 'Fiverr / Upwork',
    period: '05/2020 - 11/2022',
    description:
      'Spearheaded automation projects that reduced client manual processing time and delivered custom software solutions for specific business inefficiencies.',
    accent: '#00ff88',
  },
  {
    type: 'Education',
    title: 'B.Sc Cyber Security',
    organization: 'Asia Pacific University, Malaysia',
    period: '2025 - Present',
    description:
      'Undergraduate focus on cyber security, systems thinking, software engineering, and applied computing.',
    accent: '#00ff88',
  },
  {
    type: 'Education',
    title: 'College Studies',
    organization: 'Nixor College, Pakistan',
    period: '2023 - 2025',
    description:
      'A-Levels: Science, building the academic base before specializing in computer science, engineering, and cyber security.',
    accent: '#7b61ff',
  },
]
