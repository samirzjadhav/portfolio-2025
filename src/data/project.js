// IMPORT ALL IMAGES FIRST
import p1Img from "../assets/Projects/work-4.jpg";
import p2Img from "../assets/Projects/work-1.jpg";
import p3Img from "../assets/Projects/work-3.jpg";
import p4Img from "../assets/Projects/work-5.jpg";
import p5Img from "../assets/Projects/work-2.jpg";
import p6Img from "../assets/Projects/work-6.jpg";

// EXPORT ARRAY WITH IMAGE VARIABLES
const projects = [
  {
    id: "p1",
    title: "YouTube Clone",
    img: p1Img,
    demo: "https://youtube-clone-flax-iota.vercel.app/",
    code: "https://github.com/samirzjadhav/youtube-clone",
    tags: ["React", "Firebase", "Tailwind"],
  },
  {
    id: "p2",
    title: "TechBomb Website",
    img: p2Img,
    demo: "https://techbomb-website.vercel.app/",
    code: "https://github.com/samirzjadhav/techbomb-website",
    tags: ["HTML", "CSS", "JS"],
  },
  {
    id: "p3",
    title: "E-Commerce (React)",
    img: p3Img,
    demo: "https://react-ecommerce-website-six.vercel.app/",
    code: "https://github.com/samirzjadhav/react-ecommerce-website",
    tags: ["React", "Stripe"],
  },
  {
    id: "p4",
    title: "E-Commerce (Another)",
    img: p4Img,
    demo: "https://react-ecommerce-web-theta.vercel.app/",
    code: "https://github.com/samirzjadhav/react-ecommerce-web",
    tags: ["React", "Context API"],
  },
  {
    id: "p5",
    title: "Foodies Website",
    img: p5Img,
    demo: "https://foodies-website-one.vercel.app/",
    code: "https://github.com/samirzjadhav/foodies-website",
    tags: ["React", "API"],
  },
  {
    id: "p6",
    title: "Valorant Agents",
    img: p6Img,
    demo: "https://valorant-agents-pearl.vercel.app/",
    code: "https://github.com/samirzjadhav/Valorant_agents",
    tags: ["API", "Design"],
  },
];

export default projects;
