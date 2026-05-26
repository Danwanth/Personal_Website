import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  Code2,
  Database,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Rocket,
  Server,
  TerminalSquare,
} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Skill = {
  name: string;
  icon: LucideIcon;
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Interest =
  | {
      title: string;
      items: string[];
      groups?: never;
    }
  | {
      title: string;
      groups: Array<{
        label: string;
        items: string[];
      }>;
      items?: never;
    };

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
];

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Danwanth', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/danwanth/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/danwanth/', icon: Instagram },
];

export const skills: Skill[] = [
  { name: 'Python', icon: TerminalSquare },
  { name: 'React', icon: Code2 },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Flask', icon: Server },
  { name: 'SQL', icon: Database },
  { name: 'Machine Learning', icon: BrainCircuit },
  { name: 'Scikit-learn', icon: BrainCircuit },
  { name: 'Supabase', icon: Database },
  { name: 'REST APIs', icon: Rocket },
  { name: 'XAMPP', icon: Server },
];

export const projects: Project[] = [
  {
    title: 'Kards',
    description:
      'AI-powered anonymous chat platform focused on safer discovery, intelligent moderation, and real-time user interactions.',
    stack: ['React', 'AI', 'Supabase', 'Realtime'],
    githubUrl: 'https://github.com/Danwanth',
    liveUrl: 'https://kards-hacksus.vercel.app/',
  },
  {
    title: 'ReturnLoop',
    description:
      'Carpooling web application that matches riders and drivers through clean trip flows, location-aware data, and practical UX.',
    stack: ['React', 'Flask', 'SQL', 'REST APIs'],
    githubUrl: 'https://github.com/Danwanth',
  },
  {
    title: 'Car Price Prediction Model',
    description:
      'Streamlit-deployed machine learning app for estimating car prices from vehicle attributes with an accessible prediction interface.',
    stack: ['Python', 'Streamlit', 'Scikit-learn', 'ML'],
    githubUrl: 'https://github.com/Danwanth/Car-Price-Predictor',
    liveUrl: 'https://dancarpricepred.streamlit.app/',
  },
];

export const stats: Stat[] = [
  { value: '09+', label: 'Core technologies' },
  { value: '03', label: 'Featured builds' },
  { value: 'AI/ML & Data Science', label: 'Primary focus' },
];

export const experienceHighlights = [
  {
    title: 'AI/ML Intern, Simelabs, 2026',
    description:
      'Currently building machine learning models with practical data workflows, evaluation, and production-minded implementation.',
  },
  {
    title: 'Intern, Digispoc, 2024',
    description:
      'Worked on software development tasks in a professional internship environment, strengthening delivery, collaboration, and product thinking.',
  },
];

export const profileBadges = [
  { label: 'Kochi, Kerala', icon: MapPin },
];

export const gamertags = [
  { platform: 'Valorant', tag: 'Danwanth #sesky' },
  { platform: 'Xbox', tag: 'Danterminater' },
  { platform: 'Efootball', tag: 'Danwanth' },
];

export const interests: Interest[] = [
  {
    title: 'Football',
    items: ['FC Barcelona', 'Messi', 'Neymar', 'Kaka', 'Pedri', 'Yamal'],
  },
  {
    title: 'Games',
    items: [
      'Minecraft',
      'Valorant',
      'Assassins Creed',
      'Forza Horizon',
      'Ghost Of Tsushima',
      'Efootball',
      'FIFA (Not FC)',
      'Batman Arkham Series'
    ],
  },
  {
    title: 'Bikes',
    groups: [
      { label: 'Have', items: ['Royal Enfield Intercepter 650'] },
      {
        label: 'Dream garage',
        items: [
          'Ducati Panigale V4',
          'Triumph Rocket 3 GT',
          'Royal Enfield Interceptor',
          'Honda Africa Twin',
        ],
      },
    ],
  },
  {
    title: 'Cars',
    groups: [
      { label: 'Have', items: ['Suzuki Swift Type 1'] },
      {
        label: 'Dream garage',
        items: ['Mercedes-Benz GLS', 'Porsche 911', 'Suzuki Swift Type 1'],
      },
    ],
  },
];
