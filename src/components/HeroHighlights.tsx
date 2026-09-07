import { motion } from "framer-motion";
import { useMemo, type MouseEvent } from "react";
import { getHeroHighlights } from "../data/heroContent";
import { useMotionVariants } from "../motion";
import { smoothScrollTo } from "../utils/smoothScroll";

interface HeroHighlightsProps {
  reduceMotion: boolean;
}

export default function HeroHighlights({ reduceMotion }: HeroHighlightsProps) {
  const { scrollStagger, scrollReveal, hover } = useMotionVariants();
  const highlights = useMemo(() => getHeroHighlights(), []);

  const handleAnchorClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      smoothScrollTo(href.slice(1));
    };

  return (
    <motion.ul
      className="hero-highlights"
      initial="hidden"
      animate="visible"
      variants={scrollStagger(0.06, 0.12)}
      aria-label="Quick overview"
    >
      {highlights.map((item) => (
        <motion.li key={item.id} variants={scrollReveal({ distance: 14, duration: 0.42 })}>
          <motion.a
            href={item.href}
            className="hero-highlight-card"
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            onClick={handleAnchorClick(item.href)}
            whileHover={reduceMotion ? undefined : hover.lift(-3, 1.01)}
            whileTap={reduceMotion ? undefined : hover.tap()}
          >
            <span className="hero-highlight-icon" aria-hidden="true">
              <i className={`bx ${item.icon}`} />
            </span>
            <span className="hero-highlight-copy">
              <span className="hero-highlight-label">{item.label}</span>
              <span className="hero-highlight-value">{item.value}</span>
              <span className="hero-highlight-detail">{item.detail}</span>
            </span>
            <i className="bx bx-right-arrow-alt hero-highlight-arrow" aria-hidden="true" />
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
