import { motion } from "framer-motion";
import { useCallback, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { AUTHOR } from "../config/site";
import { contactInfo } from "../data/contact";
import { footerNavLinks } from "../data/navigation";
import { useFooterMotion } from "../hooks/useFooterMotion";
import { DEFAULT_VIEWPORT } from "../motion";
import { getScrollBehavior } from "../utils/motionPreferences";
import { smoothScrollTo } from "../utils/smoothScroll";

const CONNECT_LINKS = [
  {
    id: "github",
    label: "GitHub",
    hint: "Code & open source",
    href: contactInfo.githubUrl,
    icon: "bxl-github",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "Professional profile",
    href: contactInfo.linkedinUrl,
    icon: "bxl-linkedin",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    hint: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: "bx-envelope",
    external: false,
  },
] as const;

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

interface FooterNavLinkProps {
  href: string;
  label: string;
  reduceMotion: boolean;
}

function FooterNavLink({ href, label, reduceMotion }: FooterNavLinkProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isRoute = href.startsWith("/");
  const isHash = href.startsWith("#");
  const sectionId = isHash ? href.slice(1) : "";

  const handleHashClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isHash || !isHome) return;
      event.preventDefault();
      smoothScrollTo(sectionId);
    },
    [isHash, isHome, sectionId]
  );

  const className = "footer-nav-link";
  const hoverProps = reduceMotion
    ? undefined
    : { y: -2, transition: { duration: 0.18 } };

  if (isRoute) {
    return (
      <motion.div whileHover={hoverProps}>
        <Link to={href} className={className}>
          {label}
        </Link>
      </motion.div>
    );
  }

  if (isHome) {
    return (
      <motion.div whileHover={hoverProps}>
        <a href={href} className={className} onClick={handleHashClick}>
          {label}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={hoverProps}>
      <Link to={`/${href}`} className={className}>
        {label}
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  const footerMotion = useFooterMotion();
  const { reduceMotion } = footerMotion;

  const socialHover = reduceMotion
    ? undefined
    : { y: -3, transition: { duration: 0.2 } };

  const topHover = reduceMotion
    ? undefined
    : { y: -4, scale: 1.04, transition: { duration: 0.22 } };

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-glow" aria-hidden="true">
        <span className="footer-glow-orb footer-glow-orb-a" />
        <span className="footer-glow-orb footer-glow-orb-b" />
      </div>

      <div className="site-footer-inner max-w-6xl mx-auto px-6">
        <motion.div
          className="footer-shell surface-shell"
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          variants={footerMotion.shellReveal}
        >
          <motion.div
            className="footer-grid"
            variants={footerMotion.blockStagger}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
          >
            <motion.div className="footer-brand" variants={footerMotion.blockReveal}>
              <Link to="/" className="footer-name" aria-label={`${AUTHOR} — Home`}>
                <span className="text-white">Samir</span>{" "}
                <span className="text-accent">Jadhav</span>
              </Link>
              <p className="footer-tagline">{contactInfo.title}</p>
              <p className="footer-blurb">
                Building polished web experiences with React, motion, and thoughtful
                detail.
              </p>
            </motion.div>

            <motion.nav
              className="footer-nav-block"
              aria-label="Footer navigation"
              variants={footerMotion.blockReveal}
            >
              <p className="footer-block-label eyebrow-label">Navigation</p>
              <motion.ul
                className="footer-nav-list"
                variants={footerMotion.linkStagger}
                initial="hidden"
                whileInView="visible"
                viewport={DEFAULT_VIEWPORT}
              >
                {footerNavLinks.map((item) => (
                  <motion.li key={item.name} variants={footerMotion.linkReveal}>
                    <FooterNavLink
                      href={item.href}
                      label={item.name}
                      reduceMotion={reduceMotion}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>

            <motion.div className="footer-connect" variants={footerMotion.blockReveal}>
              <p className="footer-block-label eyebrow-label">Connect</p>
              <motion.ul
                className="footer-social-list"
                variants={footerMotion.socialStagger}
                initial="hidden"
                whileInView="visible"
                viewport={DEFAULT_VIEWPORT}
              >
                {CONNECT_LINKS.map((item) => (
                  <motion.li key={item.id} variants={footerMotion.linkReveal}>
                    <motion.a
                      href={item.href}
                      className="footer-social-link"
                      aria-label={item.label}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      whileHover={socialHover}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <span className="footer-social-icon" aria-hidden="true">
                        <i className={`bx ${item.icon}`} />
                      </span>
                      <span className="footer-social-copy">
                        <span className="footer-social-label">{item.label}</span>
                        <span className="footer-social-hint">{item.hint}</span>
                      </span>
                      <i
                        className="bx bx-right-arrow-alt footer-social-arrow"
                        aria-hidden="true"
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="footer-bottom"
            variants={footerMotion.bottomReveal}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
          >
            <p className="footer-copyright">
              © {new Date().getFullYear()}{" "}
              <span className="text-accent font-semibold">{AUTHOR}</span>. All rights
              reserved.
            </p>

            <motion.button
              type="button"
              className="footer-top-btn"
              aria-label="Back to top"
              onClick={scrollToTop}
              whileHover={topHover}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            >
              <span className="footer-top-btn-label">Back to top</span>
              <span className="footer-top-btn-icon" aria-hidden="true">
                <i className="bx bx-up-arrow-alt" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
