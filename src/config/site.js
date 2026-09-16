export const SITE_URL = "https://samirj.vercel.app";
export const SITE_NAME = "Samir Jadhav Portfolio";
export const AUTHOR = "Samir Jadhav";
export const THEME_COLOR = "#12061a";
export const TWITTER_HANDLE = "@samirzjadhav";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PAGE_META = {
  home: {
    title: "Samir Jadhav — Frontend Engineer",
    description:
      "Frontend engineer portfolio showcasing React, Next.js, and Tailwind projects. Explore featured work, skills, GitHub activity, and contact details.",
    path: "/",
  },
  github: {
    title: "GitHub Dashboard — Samir Jadhav",
    description:
      "View Samir Jadhav's GitHub profile, latest public repositories, and open-source contribution activity.",
    path: "/github",
  },
  resume: {
    title: "Resume — Samir Jadhav",
    description:
      "Resume of Samir Jadhav, frontend engineer skilled in React, Next.js, Tailwind CSS, JavaScript, and modern web development.",
    path: "/resume",
  },
};

export function getCanonicalUrl(path = "/") {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}
