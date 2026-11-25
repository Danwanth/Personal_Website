// Every piece of content on the site lives here. Components only render it.
// Tone: plain, specific, first person. The phone number is deliberately absent.

export const profile = {
  name: 'Danwanth Yogesh',
  email: 'danwanthyog@gmail.com',
  github: 'https://github.com/Danwanth',
  linkedin: 'https://linkedin.com/in/danwanth/',
  instagram: 'https://www.instagram.com/danwanth/',
  resume: '/resume.pdf',
  cgpa: '8.56',
  city: 'Kochi',
  location: 'Kochi, Kerala, India',
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',
} as const

export type PageKey = 'home' | 'work' | 'projects' | 'skills' | 'play' | 'about'

// The six real pages, in nav order (home is the logo). `hint` is the static mono
// hint on the home index; the work, projects and play hints are computed live.
export const pages: { key: PageKey; label: string; href: string; blurb: string; hint?: string }[] = [
  { key: 'home', label: 'Home', href: '/', blurb: '' },
  { key: 'work', label: 'Work', href: '/work', blurb: 'Internships, education and awards.' },
  {
    key: 'projects',
    label: 'Projects',
    href: '/projects',
    blurb: 'Real-time chat, a gesture whiteboard, models that hit 97%.',
  },
  { key: 'skills', label: 'Skills', href: '/skills', blurb: 'My stack, lined up as a 4-3-3.', hint: 'Starting XI' },
  {
    key: 'play',
    label: 'Play',
    href: '/play',
    blurb: 'Keepy-uppy, plus achievements hidden around the site.',
  },
  { key: 'about', label: 'About', href: '/about', blurb: 'Barça, games and bikes.', hint: 'Off the pitch' },
]

/** Header nav: every page except home. */
export const nav = pages.filter((p) => p.key !== 'home')

export const hero = {
  lead: 'I build machine learning models and the software around them.',
  detail:
    'Final-year Computer Science student at Rajagiri School of Engineering and Technology, Kochi. Most recently an AI/ML intern at Simelabs. Open to AI/ML and software engineering roles.',
  // The player-profile card. Its stats are derived in Hero from the data below
  // (experience, projects, work.trophies, profile.cgpa).
  card: {
    season: 'Season 2026/27',
    number: '10',
    shortName: 'D. Yogesh',
    role: 'AI/ML engineer · Kochi',
    club: 'RSET, Kochi · B.Tech CSE ’27',
    formerClubs: 'Simelabs ’26 · Digispoc ’24',
    foot: 'Python',
    status: 'Open to offers',
    scouting: [
      {
        label: 'Strengths',
        text: 'Takes a model from messy data to a working app: cleaning, modelling, evaluation, then the React or Flask app around it.',
      },
      {
        label: 'Big games',
        text: '97% accuracy on formulation quality at Simelabs (XGBoost). Won HackSUS with ReturnLoop.',
      },
      { label: 'Plays', text: 'Between ML and full-stack. Comfortable in Python, TypeScript and SQL.' },
      { label: 'Watch out for', text: 'Will bring up Barça within five minutes.' },
    ],
  },
} as const

export const work = {
  experience: [
    {
      role: 'AI/ML Intern',
      company: 'Simelabs',
      place: 'Kochi',
      date: 'May–Jun 2026',
      bullets: [
        'Built and tuned classification, regression and clustering models on healthcare, retail and product-formulation data with Scikit-learn and XGBoost. Best results: 97% accuracy, R² 0.938.',
        'Built a RAG chatbot that indexes the company website in a vector database and answers questions through the Gemini API.',
        'Segmented customers by RFM with K-Means, hierarchical clustering and DBSCAN to find high-value and at-risk groups.',
      ],
    },
    {
      role: 'Software Development Intern',
      company: 'Digispoc Technology',
      place: 'Chennai',
      date: 'May–Jun 2024',
      bullets: [
        'Built Flask web apps on MySQL, including the schema and multi-user workflows.',
        'Optimised queries and set up Apache/XAMPP environments, which made testing more reliable.',
      ],
    },
  ],
  education: {
    degree: 'B.Tech, Computer Science and Engineering',
    school: 'Rajagiri School of Engineering and Technology',
    date: '2023–2027 (expected)',
    detail: 'CGPA 8.56/10',
  },
  /** Wins, for the Trophies stat on the player card. */
  trophies: 1,
  also: [
    'Winner, HackSUS Hackathon (ReturnLoop)',
    'NPTEL Python for Data Science (2025)',
    'NPTEL Cloud Computing (2026)',
    'Cyber Security Workshop, RSET (2025)',
  ],
} as const

export const about = {
  paragraphs: [
    "I'm in my final year of B.Tech CSE at RSET (CGPA 8.56). I like the whole path from a messy dataset to something a person can actually click on: cleaning, modelling, evaluating, then building the app around it.",
    'This summer at Simelabs I trained models on healthcare, retail and product-formulation data and built a RAG chatbot over the company website. Before that I won HackSUS with a carpooling app and spent a summer writing Flask apps at Digispoc.',
  ],
} as const

export interface Project {
  title: string
  /** Mono meta line, before the stack: a year or an award. */
  meta: string
  stack: string[]
  summary: string
  detail: string
  live?: string
  code?: string
  /** Shown under "Selected work" on the home page. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Kards',
    featured: true,
    meta: '2026',
    stack: ['React', 'TypeScript', 'Supabase', 'OpenRouter'],
    summary: 'An anonymous real-time chat where every live conversation becomes a summary card.',
    detail:
      'Built on Supabase Realtime. A summarizer runs every 20 seconds, filters spam and writes headline summaries with GPT-4o mini, and an assistant called Densel reads the room and suggests replies so newcomers can jump in.',
    live: 'https://kards-hacksus.vercel.app/',
    code: 'https://github.com/Danwanth/Kards-Hacksus',
  },
  {
    title: 'Gesture whiteboard for dysgraphia',
    featured: true,
    meta: '2026',
    stack: ['Python', 'TensorFlow', 'MediaPipe', 'React', 'TensorFlow.js'],
    summary: 'Write in the air with your finger; a CNN reads the letters.',
    detail:
      'MediaPipe hand tracking turns finger movement into strokes, with gesture erasing. A CNN trained on 47-class EMNIST (91.4% validation, 90.8% test) runs in the browser with TensorFlow.js, and a practice mode checks letters and words against a target.',
    // TODO: confirm repo URL
    code: 'https://github.com/Danwanth',
  },
  {
    title: 'ReturnLoop',
    meta: 'HackSUS winner',
    stack: ['React', 'Express', 'MySQL'],
    summary: 'A carpool platform that matches riders and drivers going the same way.',
    detail: 'Won the HackSUS hackathon. Route matching, clean trip flows and location-aware data.',
    // TODO: confirm repo URL
    code: 'https://github.com/Danwanth',
  },
  {
    title: 'Car price predictor',
    featured: true,
    meta: '2026',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit'],
    summary: "Estimates a used car's price from its specs.",
    detail:
      'Compared four regressors on 8,000+ listings. Random Forest won with R² 0.938 (cross-validated above 0.91). Handles missing values, outliers, skew and categorical encoding.',
    live: 'https://dancarpricepred.streamlit.app/',
    code: 'https://github.com/Danwanth/Car-Price-Predictor',
  },
  {
    title: 'Formulation analysis',
    meta: '2026',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
    summary: 'Predicting lab, sensory and quality outcomes for sunscreen and shampoo formulas.',
    detail:
      'Regression and classification pipelines on 6,000+ formulation records. XGBoost reached 97.0% accuracy and 94.4% balanced accuracy on quality, with SMOTE for class imbalance.',
    // No public link.
  },
]

export interface Player {
  pos: string
  number: number
  skill: string
  role: string
  captain?: boolean
  /** Position on the pitch in percent of its width / height. Attack is at the top. */
  x: number
  y: number
}

// Order matters: it is the Tab order (GK, defence, midfield, attack).
export const players: Player[] = [
  { pos: 'GK', number: 1, skill: 'Git', role: 'Last line of defence. Nothing ships without it.', x: 50, y: 91 },
  { pos: 'LB', number: 3, skill: 'Supabase', role: 'Auth, Postgres and realtime without running a server.', x: 14, y: 72 },
  { pos: 'CB', number: 4, skill: 'SQL', role: 'Holds the back line. MySQL and Postgres.', x: 38, y: 76 },
  { pos: 'CB', number: 5, skill: 'Flask', role: 'Reliable, no-nonsense Python backends.', x: 62, y: 76 },
  { pos: 'RB', number: 2, skill: 'Node.js', role: 'Gets up and down the wing: Express APIs and tooling.', x: 86, y: 72 },
  { pos: 'CM', number: 8, skill: 'React', role: 'Builds everything people actually click on.', x: 27, y: 46 },
  { pos: 'CM', number: 10, skill: 'Python', role: 'Every model and most backends start here.', captain: true, x: 73, y: 46 },
  { pos: 'CM', number: 6, skill: 'TypeScript', role: 'Keeps the shape. Catches mistakes before they happen.', x: 50, y: 59 },
  { pos: 'LW', number: 11, skill: 'Scikit-learn', role: 'The everyday finisher: classification, regression, clustering.', x: 16, y: 26 },
  { pos: 'ST', number: 9, skill: 'XGBoost', role: 'Top scorer: 97% accuracy on formulation data.', x: 50, y: 17 },
  { pos: 'RW', number: 7, skill: 'RAG & LLMs', role: 'Embeddings, vector DBs and the Gemini API.', x: 84, y: 26 },
]

export const skills = {
  intro: 'My stack, lined up in a 4-3-3. Hover or tap a player.',
  defaultSkill: 'Python',
  bench: [
    'TensorFlow/Keras',
    'OpenCV',
    'MediaPipe',
    'Pandas',
    'NumPy',
    'Express',
    'Streamlit',
    'Gemini API',
    'Pinecone',
    'ChromaDB',
    'Java',
    'C',
    'Postman',
    'Google Colab',
  ],
  fullList: [
    { label: 'Languages', items: 'Python, SQL, JavaScript, TypeScript, Java, C' },
    { label: 'ML', items: 'Scikit-learn, XGBoost, Pandas, NumPy, Matplotlib, Seaborn' },
    { label: 'GenAI', items: 'RAG, embeddings, Pinecone, ChromaDB, Gemini API' },
    { label: 'CV', items: 'OpenCV, MediaPipe, CNNs, TensorFlow/Keras' },
    {
      label: 'Web',
      items: 'React, Node.js, Express, Flask, Streamlit, REST APIs, MySQL, Supabase',
    },
    { label: 'Tools', items: 'Git, Postman, VS Code, Colab' },
  ],
} as const

export const play = {
  keyboard: 'Keyboard: focus the pitch and press Space when the ball is low.',
} as const

const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

// The mono label, big title and one-line intro at the top of every subpage.
export const pageHeads = {
  work: {
    label: 'Work',
    title: 'Work',
    intro: 'Two internships, a hackathon win and a degree that wraps up in 2027.',
  },
  projects: {
    label: 'Projects',
    title: 'Projects',
    intro: `${numberWords[projects.length] ?? projects.length} things I've built, from a real-time chat app to models that hit 97%.`,
  },
  skills: { label: 'Skills', title: 'Starting XI', intro: skills.intro },
  play: {
    label: 'Play',
    title: 'Play',
    intro: "Keepy-uppy. Click or tap the ball to keep it up, and don't let it hit the ground.",
  },
  about: {
    label: 'About',
    title: 'Off the pitch',
    intro: "Barça, games and bikes: what I'm up to when I'm not training models.",
  },
} as const

export const interests = {
  watching: {
    label: 'Watching',
    text: 'FC Barcelona. Favourites, past and present: Messi, Neymar, Kaká, Pedri, Yamal.',
  },
  playing: {
    label: 'Playing',
    text: "Valorant, Minecraft, Assassin's Creed, Forza Horizon, Ghost of Tsushima, the Batman: Arkham series, eFootball and FIFA (not FC; never FC).",
    tags: [
      { platform: 'Valorant', tag: 'Danwanth#sesky' },
      { platform: 'Xbox', tag: 'Danterminater' },
      { platform: 'eFootball', tag: 'Danwanth' },
    ],
  },
  riding: {
    label: 'Riding',
    text: 'I ride a Royal Enfield Interceptor 650 and drive a Suzuki Swift. Dream garage: Ducati Panigale V4, Triumph Rocket 3 GT, Honda Africa Twin, Porsche 911, Mercedes-Benz GLS.',
  },
} as const

export const contact = {
  line: 'Email is the fastest way to reach me. I usually reply within a day or two.',
  place: 'Kochi, Kerala',
} as const

export const footer = {
  credit: '© 2026 Danwanth Yogesh · React, TypeScript, Tailwind · Hosted on Vercel',
  hint: 'Some things on this site are hidden.',
} as const

export const notFound = {
  label: 'VAR review',
  heading: 'Offside.',
  text: 'We checked the lines. The page you’re looking for was in an offside position.',
  back: 'Back to the halfway line',
} as const

export interface AchievementDef {
  id: string
  title: string
  description: string
  hint: string
}

export const achievementList: AchievementDef[] = [
  { id: 'first-touch', title: 'First touch', description: 'You kicked the ball.', hint: "There's a ball on this page." },
  { id: 'number-ten', title: 'Number 10', description: 'Ten keepy-uppies in a row.', hint: 'Get to double figures.' },
  { id: 'konami', title: 'Up, up, down, down', description: 'The old code still works. Welcome to retro mode.', hint: 'Some codes never expire.' },
  { id: 'console', title: 'Developer console', description: 'Gamers know where the console key is.', hint: 'Press the key under Esc.' },
  { id: 'goat', title: 'The GOAT', description: 'Typed his name. Respect.', hint: 'Type the name of the greatest.' },
  { id: 'offside', title: 'Offside', description: "You went somewhere that doesn't exist.", hint: "Try a page that isn't there." },
  { id: 'tour', title: 'Full tour', description: 'You visited every page on the site.', hint: 'See every page.' },
]

export const keepy = {
  idle: 'Click the ball to start',
  idleTouch: 'Tap the ball to start',
  idleKeyboard: 'or focus this box and press Space',
  milestones: {
    1: "And we're off.",
    5: 'Five. Warming up.',
    10: 'Ten. A proper number 10 performance.',
    25: 'Twenty-five. The crowd is on its feet.',
    50: "Fifty. Okay, you've done this before.",
    100: 'A hundred. Go outside.',
  } as Record<number, string>,
  newBest: 'New personal best.',
  gameOver: [
    'Gravity wins again.',
    'VAR confirms: it touched the ground.',
    'The ball has left the chat.',
    'Unlucky. Go again.',
  ],
  label:
    'Keepy-uppy game. Click or tap the ball to kick it up. With the keyboard, press Space or Enter when the ball is low and falling.',
}

export const eggs = {
  siu: 'Wrong club. Wrong player.',
  devtools: ['Hey, you opened DevTools.', 'Try pressing ~ on the page, or remember an old cheat code.'],
}
