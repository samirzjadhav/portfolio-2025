// IMPORT ALL IMAGES FIRST
import p1Img from "../assets/Projects/work-4.jpg";
import p2Img from "../assets/Projects/work-1.jpg";
import p3Img from "../assets/Projects/work-3.jpg";
import p4Img from "../assets/Projects/work-5.jpg";
import p5Img from "../assets/Projects/work-2.jpg";
import p6Img from "../assets/Projects/work-6.jpg";

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} img
 * @property {string} demo
 * @property {string} code
 * @property {string[]} tags
 * @property {string} description - One-line summary for the featured card overlay
 * @property {string} shortDesc - Brief tagline for the project grid
 * @property {string} overview - Longer case-study style summary
 * @property {string[]} features - Key capabilities built in the project
 * @property {string[]} challenges - Problems solved or technical hurdles
 * @property {string} outcome - Result or impact of the project
 */

/** @type {Project[]} */
const projects = [
  {
    id: "p1",
    title: "YouTube Clone",
    img: p1Img,
    demo: "https://youtube-clone-flax-iota.vercel.app/",
    code: "https://github.com/samirzjadhav/youtube-clone",
    tags: ["React", "Firebase", "Tailwind"],
    description:
      "A responsive video platform with search, trending, playback, and dark mode.",
    shortDesc: "Video streaming UI with Firebase backend",
    overview:
      "Built a YouTube-inspired app to practice full-stack React patterns — routing, auth-ready structure, and real-time data with Firebase while keeping the UI fast and responsive.",
    features: [
      "Video playback with responsive layout",
      "Search and trending sections",
      "Dark mode toggle",
      "Firebase-powered data layer",
    ],
    challenges: [
      "Structuring routes and layout for a content-heavy app",
      "Keeping performance smooth with image-heavy feeds",
      "Mirroring familiar UX patterns without copying complexity",
    ],
    outcome:
      "Deployed a polished clone that demonstrates scalable React architecture and production-ready UI polish.",
  },
  {
    id: "p2",
    title: "TechBomb — Business Website",
    img: p2Img,
    demo: "https://techbomb-website.vercel.app/",
    code: "https://github.com/samirzjadhav/techbomb-website",
    tags: ["HTML", "CSS", "JS"],
    description:
      "A responsive business landing page with clean sections and modern styling.",
    shortDesc: "Marketing landing page built with vanilla web",
    overview:
      "Designed and developed a business website from scratch using semantic HTML, custom CSS, and JavaScript — focused on layout, typography, and mobile-first responsiveness.",
    features: [
      "Responsive multi-section landing page",
      "Custom CSS layout and typography",
      "Interactive UI elements with vanilla JS",
      "Optimized for mobile and desktop",
    ],
    challenges: [
      "Building a professional layout without a component framework",
      "Maintaining consistent spacing and visual hierarchy",
      "Ensuring cross-device responsiveness",
    ],
    outcome:
      "Delivered a deploy-ready marketing site that showcases strong fundamentals in HTML, CSS, and JavaScript.",
  },
  {
    id: "p3",
    title: "ShopEase — Stripe Store",
    img: p3Img,
    demo: "https://react-ecommerce-website-six.vercel.app/",
    code: "https://github.com/samirzjadhav/react-ecommerce-website",
    tags: ["React", "Stripe"],
    description:
      "A full e-commerce storefront with product browsing and Stripe checkout.",
    shortDesc: "E-commerce app with Stripe payments",
    overview:
      "Created a React e-commerce experience with product listings, cart flow, and Stripe integration — emphasizing checkout UX and a clean shopping interface.",
    features: [
      "Product catalog and detail views",
      "Shopping cart workflow",
      "Stripe payment integration",
      "Responsive Tailwind UI",
    ],
    challenges: [
      "Integrating Stripe checkout into a React flow",
      "Managing cart state across pages",
      "Designing a trustworthy checkout experience",
    ],
    outcome:
      "Shipped a functional online store that demonstrates payment integration and e-commerce UI patterns.",
  },
  {
    id: "p4",
    title: "CartFlow — Context Store",
    img: p4Img,
    demo: "https://react-ecommerce-web-theta.vercel.app/",
    code: "https://github.com/samirzjadhav/react-ecommerce-web",
    tags: ["React", "Context API"],
    description:
      "A shopping app with global cart state managed through React Context.",
    shortDesc: "E-commerce UI with Context API state",
    overview:
      "Built a second e-commerce project focused on state architecture — using React Context API for cart and product state while keeping components reusable and the UI responsive.",
    features: [
      "Global cart state with Context API",
      "Reusable product and cart components",
      "Category-based product browsing",
      "Mobile-friendly storefront layout",
    ],
    challenges: [
      "Avoiding prop drilling with Context",
      "Keeping state updates predictable across the app",
      "Separating UI from state logic cleanly",
    ],
    outcome:
      "Produced a maintainable storefront that highlights state management skills and component-driven design.",
  },
  {
    id: "p5",
    title: "Foodies — Delivery UI",
    img: p5Img,
    demo: "https://foodies-website-one.vercel.app/",
    code: "https://github.com/samirzjadhav/foodies-website",
    tags: ["React", "API"],
    description:
      "A modern food delivery interface with category filters and live API data.",
    shortDesc: "Food delivery UI powered by external API",
    overview:
      "Developed a food ordering-style frontend that fetches menu data from an API, supports category filtering, and uses motion-friendly layout patterns for a lively browsing experience.",
    features: [
      "Dynamic menu data from REST API",
      "Category filters and search-friendly layout",
      "Animated, card-based food listings",
      "Fully responsive mobile design",
    ],
    challenges: [
      "Handling loading and empty states from API data",
      "Designing intuitive category navigation",
      "Balancing animation with performance",
    ],
    outcome:
      "Launched a visually engaging food app that shows API integration and modern UI execution.",
  },
  {
    id: "p6",
    title: "Valorant Agents Directory",
    img: p6Img,
    demo: "https://valorant-agents-pearl.vercel.app/",
    code: "https://github.com/samirzjadhav/Valorant_agents",
    tags: ["API", "Design"],
    description:
      "An agent roster browser with role filters and detailed character cards.",
    shortDesc: "Game agent browser with API-driven data",
    overview:
      "Built a Valorant agents showcase that consumes a public API, displays agent roles and abilities, and applies a dark, game-inspired visual style.",
    features: [
      "Agent listing with role-based filtering",
      "Detail views for abilities and metadata",
      "API-driven content updates",
      "Dark-themed responsive layout",
    ],
    challenges: [
      "Mapping nested API data into readable UI",
      "Designing filters that work on small screens",
      "Creating visual identity without heavy assets",
    ],
    outcome:
      "Delivered an interactive directory that combines API skills with strong presentation design.",
  },
];

export default projects;
