import React from "react";
import type { OneTimeSetup, Project, PricingTier, Service, Tech } from "./types";

// --- SERVICE ICONS ---

const WebDevIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const AppDevIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const SEOIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ContentIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const SocialMediaIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const WhatsAppIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const AICallIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const UIDesignIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

// --- DATA ---

export const PROJECTS: Project[] = [
  {
    title: "Gift & Sons International",
    description:
      "A polished corporate website for a real estate team, rebuilt to make property enquiries clearer and improve trust at first glance.",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express"],
    imageUrl: "/assets/giftandsons.png",
    link: "https://giftandsonsinternational.com",
  },
  {
    title: "Sifabora Africa",
    description:
      "A credibility-focused marketing presence for a reputation management brand, with stronger messaging and easier service discovery.",
    technologies: ["API", "Firebase", "React", "Google Cloud"],
    imageUrl: "/assets/sifabora_2.png",
    link: "https://sifabora.africa",
  },
];

export const SERVICES: Service[] = [
  {
    icon: <WebDevIcon />,
    title: "Website Development",
    description:
      "Modern websites that make your offer easy to understand, build trust quickly, and guide visitors toward contacting you.",
  },
  {
    icon: <AppDevIcon />,
    title: "App Development",
    description:
      "Practical mobile apps for Android and iPhone that help you serve customers, accept requests, and manage workflows on the move.",
  },
  {
    icon: <SEOIcon />,
    title: "SEO Management",
    description:
      "Search strategy and technical improvements that help local customers find you when they are actively looking for your service.",
  },
  {
    icon: <ContentIcon />,
    title: "Content Creation",
    description:
      "Clear website copy, social posts, and simple content systems that answer customer questions and support sales.",
  },
  {
    icon: <SocialMediaIcon />,
    title: "Social Media Management",
    description:
      "Content planning, posting, and engagement support that keeps your brand visible without draining your time.",
  },
  {
    icon: <WhatsAppIcon />,
    title: "WhatsApp & Social Automation",
    description:
      "Automated replies and lead capture flows for WhatsApp and social platforms, so enquiries are never left waiting.",
  },
  {
    icon: <AICallIcon />,
    title: "AI Call Agents",
    description:
      "Voice assistants that answer routine questions, collect details, and route serious leads to your team.",
  },
  {
    icon: <UIDesignIcon />,
    title: "UI/UX Design",
    description:
      "Clean user experiences that reduce friction, make information easier to scan, and support better conversion.",
  },
];

export const TECH_STACK: Tech[] = [
  {
    name: "HTML5",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <title>HTML5</title>
        <path d="M1.5 0h21l-1.91 21.582L12 24l-8.589-2.418L1.5 0zm16.743 6.794l.095-1.067H5.662l.284 3.176h9.936l-.36 4.031-2.523.7-2.504-.69-.16-1.816H6.9l.323 3.622 4.777 1.326 4.751-1.319.655-7.963z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <title>CSS3</title>
        <path d="M1.5 0h21l-1.91 21.582L12 24l-8.589-2.418L1.5 0zm15.292 7.498l.095-1.066H5.846l.283 3.175h9.712l-.36 4.032-2.523.7-2.504-.69-.16-1.817H7.1l.323 3.623 4.777 1.326 4.751-1.319.655-7.964z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <title>JavaScript</title>
        <path d="M1.5 0h21v24l-10.5-3-10.5 3V0zm11.92 17.265c.235.764.9 1.335 1.844 1.335 1.053 0 1.723-.527 1.723-1.258 0-.874-.69-1.18-1.852-1.692l-.636-.272c-1.837-.784-3.056-1.768-3.056-3.85 0-1.918 1.46-3.384 3.739-3.384 1.622 0 2.792.566 3.63 2.05l-1.99 1.276c-.438-.784-.914-1.09-1.64-1.09-.745 0-1.217.472-1.217 1.09 0 .763.472 1.069 1.564 1.537l.636.272c2.16.932 3.38 1.875 3.38 4.014 0 2.302-1.812 3.58-4.245 3.58-2.381 0-3.92-1.136-4.674-2.618l2.04-1.182zm-6.62.206c.44.782.843 1.44 1.8 1.44.92 0 1.507-.36 1.507-1.768V10.5h2.43v6.75c0 2.52-1.48 3.672-3.64 3.672-1.953 0-3.086-1.016-3.668-2.25l2.07-1.108z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <title>React</title>
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.375-.793 1.683-3.264.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.702 0 1.187.309 1.478.927.561 1.183.371 3.297-.62 5.77-.896-.256-1.888-.453-2.955-.576-.652-.88-1.329-1.707-2.01-2.467 1.512-1.404 2.964-2.222 4.107-2.222zm-9.8 0c1.143 0 2.596.818 4.107 2.222-.681.76-1.358 1.587-2.01 2.467-1.067.123-2.059.32-2.954.576-.992-2.473-1.18-4.587-.62-5.77.292-.618.776-.927 1.477-.927zm4.903 6.73c.39.393.778.82 1.16 1.28-.373-.023-.752-.034-1.16-.034-.408 0-.79.011-1.163.034.382-.46.77-.887 1.163-1.28zm-3.09 4.13c-.39.4-.778.825-1.16 1.287.373.023.752.034 1.16.034.408 0 .79-.011 1.163-.034-.382-.462-.77-.887-1.163-1.287zM12 8.717c.424.44.848.921 1.267 1.437-.42-.018-.84-.03-1.267-.03-.427 0-.847.012-1.267.03.42-.516.843-.997 1.267-1.437zM8.908 12.004c-.234.345-.455.695-.664 1.05l-.334-.55c.23-.363.463-.713.705-1.05-.237.009-.468.013-.707.013-.234 0-.462-.004-.692-.013.24.337.474.687.706 1.05zm6.184 0l.706-1.05c.236.337.467.687.698 1.05-.23-.009-.46-.013-.698-.013-.232 0-.462.004-.692.013zm-6.9 2.054c.209.355.43.705.665 1.05-.237-.009-.468-.013-.705-.013-.238 0-.467.004-.698.013.23-.363.464-.713.698-1.05zm6.9 0c.233.337.467.687.698 1.05-.231-.009-.46-.013-.698-.013-.23 0-.462.004-.692.013.23-.363.462-.713.692-1.05zm-4.06 4.46c.42.517.842.998 1.265 1.437-.42-.44-.84-.921-1.265-1.437zm2.09 0c-.422.516-.84.997-1.263 1.437.42-.44.84-.921 1.263-1.437zm-4.64-1.174c-.242-.337-.476-.687-.706-1.05l.345.55c.232.358.476.708.729 1.05zm7.19 0c.252-.342.496-.692.727-1.05l.345-.55c-.229.363-.462.713-.705 1.05z" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <title>Python</title>
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <title>Figma</title>
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Foundation",
    price: "KES 12,000",
    period: "/ month",
    bestFor: "Businesses starting or with low online presence",
    includes: [
      "Social media presence setup & optimization",
      "8–10 professional posts/reels monthly",
      "Branding consistency (visual identity)",
      "Basic content strategy",
    ],
    valueDelivered: "Your business becomes visible, active, and trustworthy online.",
    expected30DayOutcome: "A cleaner brand presence, active social pages, and more first-time customer trust when people discover your business.",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "KES 20,000",
    period: "/ month",
    bestFor: "Businesses ready to increase customers and inquiries",
    includes: [
      "Everything in Foundation PLUS",
      "Increased content output (12–16 posts/reels)",
      "WhatsApp / DM automation setup",
      "Lead capture system",
      "Customer engagement (messages, comments)",
      "Monthly growth strategy",
    ],
    valueDelivered: "A system that consistently brings in new customer inquiries and bookings.",
    expected30DayOutcome: "Noticeably more inbound inquiries, faster response handling, and a clearer lead pipeline for follow-up and booking.",
    positioningLine: "This is where your social media starts working as a customer acquisition tool.",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "KES 35,000",
    period: "/ month",
    bestFor: "Businesses serious about scaling and dominating locally",
    includes: [
      "Everything in Growth PLUS",
      "Advanced automation systems",
      "Google/SEO optimization",
      "Conversion-focused website or landing page",
      "Reputation management (reviews strategy)",
      "Full digital growth strategy",
    ],
    valueDelivered: "A complete system that attracts, converts, and retains customers automatically.",
    expected30DayOutcome: "A stronger growth engine with better lead quality, improved conversion flow, and less manual effort across your customer journey.",
    highlighted: false,
  },
];

export const ONE_TIME_SETUPS: OneTimeSetup[] = [
  {
    name: "Website / Booking System",
    price: "KES 30,000",
    description: "A platform that converts visitors into paying customers.",
  },
  {
    name: "Customer Response Automation",
    price: "KES 10,000",
    description: "Ensures every inquiry is captured and responded to instantly.",
  },
  {
    name: "Google Business & Local SEO",
    price: "KES 8,000",
    description: "Helps your business appear when customers search nearby.",
  },
];

