import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { sectionNavLinks } from "../data/navigation";
import { useNavbarScroll } from "../hooks/useNavbarScroll";
import { useMotionVariants } from "../motion";
import type { SectionId } from "../types";
import { smoothScrollTo } from "../utils/smoothScroll";

interface NavbarProps {
  activeSection?: SectionId;
}

const ROUTE_LINKS = [
  { to: "/", label: "Home", match: (path: string) => path === "/" },
  {
    to: "/projects",
    label: "Projects",
    match: (path: string) => path === "/projects" || path.startsWith("/projects/"),
  },
  { to: "/github", label: "GitHub", match: (path: string) => path === "/github" },
  { to: "/resume", label: "Resume", match: (path: string) => path === "/resume" },
] as const;

const INDICATOR_TRANSITION = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.55,
};

interface NavIndicatorProps {
  layoutId: string;
  reduceMotion: boolean;
}

function NavIndicator({ layoutId, reduceMotion }: NavIndicatorProps) {
  return (
    <motion.span
      layoutId={layoutId}
      className="navbar-indicator"
      aria-hidden="true"
      transition={reduceMotion ? { duration: 0 } : INDICATOR_TRANSITION}
    />
  );
}

interface NavbarLinkProps {
  active: boolean;
  children: ReactNode;
  className?: string;
  layoutGroupId: string;
  reduceMotion: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
  to?: string;
}

function NavbarLink({
  active,
  children,
  className = "",
  layoutGroupId,
  reduceMotion,
  onClick,
  href,
  to,
}: NavbarLinkProps) {
  const classes = `navbar-link ${active ? "is-active" : ""} ${className}`.trim();
  const content = (
    <>
      {active ? (
        <NavIndicator layoutId={layoutGroupId} reduceMotion={reduceMotion} />
      ) : null}
      <span className="navbar-link-label">{children}</span>
    </>
  );

  const hoverProps = reduceMotion
    ? undefined
    : { y: -1, transition: { duration: 0.18 } };

  if (to) {
    return (
      <motion.div whileHover={hoverProps} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
        <Link to={to} className={classes} onClick={onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={hoverProps} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    </motion.div>
  );
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const scrolled = useNavbarScroll();
  const reduceMotion = useReducedMotion();
  const { navReveal } = useMotionVariants();
  const [navSlideReveal, setNavSlideReveal] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setNavSlideReveal(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const hideSections =
    location.pathname === "/projects" ||
    location.pathname.startsWith("/projects/") ||
    location.pathname === "/resume" ||
    location.pathname === "/github";

  const isHome = location.pathname === "/";
  const layoutGroupId = "navbar-active-indicator";

  const isRouteLinkActive = useCallback(
    (to: string, match: (path: string) => boolean) => {
      if (to === "/") {
        return (
          location.pathname === "/" &&
          (hideSections || activeSection === "home")
        );
      }
      return match(location.pathname);
    },
    [activeSection, hideSections, location.pathname]
  );

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMenu, open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSectionClick = useCallback(
    (section: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isHome) return;
      event.preventDefault();
      smoothScrollTo(section);
      closeMenu();
    },
    [closeMenu, isHome]
  );

  const mobileLinks = useMemo(() => {
    const items: Array<{
      key: string;
      label: string;
      active: boolean;
      to?: string;
      href?: string;
      section?: SectionId;
      onClick?: () => void;
    }> = ROUTE_LINKS.map((link) => ({
      key: link.to,
      label: link.label,
      active: isRouteLinkActive(link.to, link.match),
      to: link.to,
      onClick: closeMenu,
    }));

    if (!hideSections) {
      for (const link of sectionNavLinks) {
        items.push({
          key: link.section,
          label: link.name,
          active: isHome && activeSection === link.section,
          href: link.href,
          onClick: closeMenu,
          section: link.section,
        });
      }
    }

    return items;
  }, [activeSection, closeMenu, hideSections, isHome, isRouteLinkActive]);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navReveal({ slide: navSlideReveal })}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${
        open ? "navbar--menu-open" : ""
      }`.trim()}
    >
      <div className="navbar-inner max-w-6xl mx-auto px-6">
        <div className="navbar-row">
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              to="/"
              aria-label="Samir Jadhav — Home"
              className="text-2xl md:text-4xl font-dancing leading-none"
            >
              <span className="text-white">Samir</span>{" "}
              <span className="text-accent">Jadhav</span>
            </Link>
          </motion.div>

          <LayoutGroup id={layoutGroupId}>
            <nav className="navbar-desktop" aria-label="Primary navigation">
              {ROUTE_LINKS.map((link) => (
                <NavbarLink
                  key={link.to}
                  to={link.to}
                  active={isRouteLinkActive(link.to, link.match)}
                  layoutGroupId={layoutGroupId}
                  reduceMotion={reduceMotion ?? false}
                >
                  {link.label}
                </NavbarLink>
              ))}

              {!hideSections &&
                sectionNavLinks.map((link) => (
                  <NavbarLink
                    key={link.section}
                    href={link.href}
                    active={isHome && activeSection === link.section}
                    layoutGroupId={layoutGroupId}
                    reduceMotion={reduceMotion ?? false}
                    onClick={handleSectionClick(link.section)}
                  >
                    {link.name}
                  </NavbarLink>
                ))}
            </nav>
          </LayoutGroup>

          <motion.button
            type="button"
            className="navbar-toggle md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navbar-mobile-menu"
            onClick={toggleMenu}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          >
            <span className="navbar-toggle-icon" aria-hidden="true">
              <motion.span
                animate={
                  open
                    ? { rotate: 45, y: 7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className="navbar-toggle-bar"
              />
              <motion.span
                animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                className="navbar-toggle-bar"
              />
              <motion.span
                animate={
                  open
                    ? { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className="navbar-toggle-bar"
              />
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="navbar-mobile-backdrop md:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={closeMenu}
            />
            <motion.nav
              id="navbar-mobile-menu"
              className="navbar-mobile md:hidden"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ul className="navbar-mobile-list">
                {mobileLinks.map((link, index) => (
                  <motion.li
                    key={link.key}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.24,
                      delay: reduceMotion ? 0 : index * 0.04,
                    }}
                  >
                    {link.to ? (
                      <Link
                        to={link.to}
                        className={`navbar-mobile-link ${
                          link.active ? "is-active" : ""
                        }`.trim()}
                        onClick={link.onClick}
                      >
                        {link.label}
                        {link.active ? (
                          <span className="navbar-mobile-active-dot" aria-hidden="true" />
                        ) : null}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`navbar-mobile-link ${
                          link.active ? "is-active" : ""
                        }`.trim()}
                        onClick={(event) => {
                          if (isHome && link.section) {
                            event.preventDefault();
                            smoothScrollTo(link.section);
                          }
                          link.onClick?.();
                        }}
                      >
                        {link.label}
                        {link.active ? (
                          <span className="navbar-mobile-active-dot" aria-hidden="true" />
                        ) : null}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
