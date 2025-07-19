import React from "react";
import type { Project, Service, Tech } from "./types";

// --- ICONS ---

const WebDevIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-primary-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const AppDevIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-primary-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const UIDesignIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-primary-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);

const AIIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-primary-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

// --- DATA ---

export const PROJECTS: Project[] = [
  {
    title: "Gift & Sons International",
    description:
      "A corporate website for an international real estate agency, featuring a clean design and clear service presentation.",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express"],
    imageUrl: "/assets/giftandsons.png",
    link: "https://giftandsonsinternational.com",
  },
  {
    title: "Sifabora Africa",
    description:
      "An online presence and reputation management agency from a reputable organization in Kenya, which operates internationally",
    technologies: ["API", "Firebase", "React", "Google Cloud"],
    imageUrl: "/assets/sifabora_2.png",
    link: "https://sifabora.africa",
  },
];

export const SERVICES: Service[] = [
  {
    icon: <WebDevIcon />,
    title: "Custom Website Development",
    description:
      "We build fast, responsive, and scalable websites tailored to your business needs, from static pages to complex web applications.",
  },
  {
    icon: <AppDevIcon />,
    title: "Mobile App Development",
    description:
      "Crafting beautiful and high-performance cross-platform mobile apps for iOS and Android using modern frameworks like Flutter.",
  },
  {
    icon: <UIDesignIcon />,
    title: "UI/UX Design",
    description:
      "Designing intuitive and engaging user interfaces that provide a seamless user experience, from wireframes to high-fidelity prototypes.",
  },
  {
    icon: <AIIcon />,
    title: "AI Prompt Engineering",
    description:
      "Leveraging the power of generative AI to automate tasks, generate content, and build intelligent features into your applications.",
  },
];

export const TECH_STACK: Tech[] = [
  {
    name: "HTML5",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>HTML5</title>
        <path d="M1.5 0h21l-1.91 21.582L12 24l-8.589-2.418L1.5 0zm16.743 6.794l.095-1.067H5.662l.284 3.176h9.936l-.36 4.031-2.523.7-2.504-.69-.16-1.816H6.9l.323 3.622 4.777 1.326 4.751-1.319.655-7.963z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>CSS3</title>
        <path d="M1.5 0h21l-1.91 21.582L12 24l-8.589-2.418L1.5 0zm15.292 7.498l.095-1.066H5.846l.283 3.175h9.712l-.36 4.032-2.523.7-2.504-.69-.16-1.817H7.1l.323 3.623 4.777 1.326 4.751-1.319.655-7.964z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>JavaScript</title>
        <path d="M1.5 0h21v24l-10.5-3-10.5 3V0zm11.92 17.265c.235.764.9 1.335 1.844 1.335 1.053 0 1.723-.527 1.723-1.258 0-.874-.69-1.18-1.852-1.692l-.636-.272c-1.837-.784-3.056-1.768-3.056-3.85 0-1.918 1.46-3.384 3.739-3.384 1.622 0 2.792.566 3.63 2.05l-1.99 1.276c-.438-.784-.914-1.09-1.64-1.09-.745 0-1.217.472-1.217 1.09 0 .763.472 1.069 1.564 1.537l.636.272c2.16.932 3.38 1.875 3.38 4.014 0 2.302-1.812 3.58-4.245 3.58-2.381 0-3.92-1.136-4.674-2.618l2.04-1.182zm-6.62.206c.44.782.843 1.44 1.8 1.44.92 0 1.507-.36 1.507-1.768V10.5h2.43v6.75c0 2.52-1.48 3.672-3.64 3.672-1.953 0-3.086-1.016-3.668-2.25l2.07-1.108z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>React</title>
        <path d="M12 0c-.68 0-1.28.25-1.75.72a2.5 2.5 0 0 0-.73 1.75c0 .68.25 1.28.73 1.75.47.47 1.07.73 1.75.73s1.28-.26 1.75-.73c.47-.47.73-1.07.73-1.75 0-.68-.26-1.28-.73-1.75A2.5 2.5 0 0 0 12 0zm0 3.5c-.27 0-.5-.23-.5-.5s.23-.5.5-.5.5.23.5.5-.23.5-.5.5z" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="M12 1c5.94 0 10.75 4.81 10.75 10.75S17.94 22.5 12 22.5 1.25 17.69 1.25 11.75 6.06 1 12 1zm0 2C7.17 3 3 7.17 3 12s4.17 9 9 9 9-4.17 9-9-4.17-9-9-9z" />
      </svg>
    ),
  },
  {
    name: "React Native",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>React Native</title>
        <path d="M12 0c-.68 0-1.28.25-1.75.72a2.5 2.5 0 0 0-.73 1.75c0 .68.25 1.28.73 1.75.47.47 1.07.73 1.75.73s1.28-.26 1.75-.73c.47-.47.73-1.07.73-1.75 0-.68-.26-1.28-.73-1.75A2.5 2.5 0 0 0 12 0zm0 3.5c-.27 0-.5-.23-.5-.5s.23-.5.5-.5.5.23.5.5-.23.5-.5.5z" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="M12 1c5.94 0 10.75 4.81 10.75 10.75S17.94 22.5 12 22.5 1.25 17.69 1.25 11.75 6.06 1 12 1zm0 2C7.17 3 3 7.17 3 12s4.17 9 9 9 9-4.17 9-9-4.17-9-9-9z" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>Python</title>
        <path d="M12.09 0c-.3 0-.6.02-.89.06-1.01.14-1.34.45-1.34 1.01v2.09c0 .55.45.99.99.99h4.96c.55 0 .99.44.99.99v1.98c0 .55-.45.99-.99.99H8.14c-1.65 0-3 1.35-3 3v2.95c0 1.65 1.35 3 3 3h2.17v-2.17H8.14c-.55 0-.99-.45-.99-.99V10.5c0-.55.45-.99.99-.99h7.8c1.65 0 3-1.35 3-3V3.1c0-1.65-1.35-3-3-3H12.1zM9.89 1.98c.54 0 .99.45.99.99s-.45.99-.99.99-.99-.45-.99-.99.45-.99.99-.99zM14.9 10.53v2.09c0 .55-.45.99-.99.99H8.95c-.55 0-.99.44-.99.99v1.98c0 .55.45.99.99.99h4.96c.55 0 .99.45.99.99v2.09c0 .55-.33.87-1.34 1.01-.29.04-.59.06-.89.06H11.9c-1.65 0-3-1.35-3-3v-2.95c0-1.65 1.35-3 3-3h5.95c.55 0 .99-.45.99-.99v-2.09h-2.94zM14.1 17.94c.54 0 .99.45.99.99s-.45.99-.99.99-.99-.45-.99-.99.45-.99.99-.99z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <title>Figma</title>
        <path d="M12 0a6 6 0 0 0-6 6v6a6 6 0 1 0 6 6h6a6 6 0 1 0 0-12h-6a6 6 0 1 0 0-6zm0 6a3 3 0 0 1 3-3 3 3 0 1 1-3 3zm3 3a3 3 0 0 1 3 3 3 3 0 1 1-3-3zM9 3a3 3 0 0 1 3 3 3 3 0 1 1-3-3zm0 6a3 3 0 0 1 3 3 3 3 0 1 1-3-3zm0 6a3 3 0 0 1 3 3 3 3 0 1 1-3-3z" />
      </svg>
    ),
  },
];
