import { motion } from "framer-motion";
import profile from "../assets/Projects/profile.jpg";
import { socialLinks } from "../data/contact";
import { ABOUT_SUMMARY } from "../data/heroContent";
import { Reveal, SectionIntro, StaggerContainer, useMotionVariants } from "../motion";

export default function About() {
  const motionVariants = useMotionVariants();

  return (
    <section id="about" className="section-block">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Reveal
          variants={motionVariants.scrollRevealLeft(48)}
          viewport={motionVariants.sectionViewport}
          className="cursor-hover-target glass-strong p-6 feature-layer"
        >
          <img
            src={profile}
            alt="Portrait photo of Samir Jadhav"
            loading="lazy"
            decoding="async"
            className="rounded-xl w-full object-cover"
          />
        </Reveal>

        <div>
          <SectionIntro
            title="About"
            subtitle="A quick background beyond the headline."
          />

          <Reveal
            as="p"
            variants={motionVariants.scrollReveal({ distance: 24, blur: 6 })}
            viewport={motionVariants.paragraphViewport}
            className="section-sub mt-4 leading-relaxed"
          >
            {ABOUT_SUMMARY}
          </Reveal>

          <StaggerContainer
            className="mt-6 flex gap-3"
            viewport={motionVariants.itemViewport}
            staggerAmount={0.08}
            delayChildren={0.04}
            variants={motionVariants.scrollStagger(0.08, 0.04)}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                variants={motionVariants.scrollReveal({ distance: 16, scale: 0.9, blur: 4 })}
                whileHover={motionVariants.hover.icon(1.1, 6)}
                className="glass p-3"
              >
                <i className={`bx ${link.icon}`} aria-hidden="true" />
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
