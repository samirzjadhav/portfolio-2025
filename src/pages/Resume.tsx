import type { ReactNode } from "react";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import Navbar from "../components/Navbar";
import ResumePreview from "../components/ResumePreview";
import SkipToContent from "../components/SkipToContent";
import VisitorCounter from "../components/VisitorCounter";
import { PAGE_META } from "../config/site";
import { achievements } from "../data/achievements";
import { contactInfo } from "../data/contact";
import { education } from "../data/education";
import { workExperience } from "../data/experience";
import {
  RESUME_PDF_FILENAME,
  RESUME_PDF_URL,
  resumeSkillGroups,
  resumeSummary,
} from "../data/resumeContent";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  MotionSection,
  Reveal,
  StaggerContainer,
  useMotionVariants,
} from "../motion";

interface SectionCardProps {
  title: string;
  icon: string;
  children: ReactNode;
  delay?: number;
}

function SectionCard({ title, icon, children, delay = 0 }: SectionCardProps) {
  return (
    <MotionSection
      viewport={{ once: true, amount: 0.2 }}
      delay={delay}
      className="glass surface-card p-5 md:p-6"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
        <i className={`bx ${icon} text-accent text-xl`} aria-hidden="true" />
        {title}
      </h3>
      {children}
    </MotionSection>
  );
}

export default function ResumePage() {
  usePageMeta(PAGE_META.resume);
  const motionVariants = useMotionVariants();
  const item = motionVariants.fadeUp(14);

  return (
    <>
      <div className="resume-nav-fix">
        <SkipToContent />
        <Navbar />
      </div>
      <VisitorCounter />

      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen px-4 sm:px-6 pt-[84px] pb-16 sm:pt-[90px] md:py-28 text-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.header
            initial="hidden"
            animate="visible"
            variants={motionVariants.stagger(0.1, 0.06)}
            className="text-center mb-10"
          >
            <motion.p
              variants={item}
              className="text-sm uppercase tracking-[0.2em] text-accent/90 font-medium"
            >
              Resume
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-2 text-3xl md:text-4xl font-bold"
            >
              {contactInfo.name}
            </motion.h1>
            <motion.p variants={item} className="mt-2 text-white/65">
              {contactInfo.title} · {contactInfo.location}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full max-w-md sm:max-w-none mx-auto"
            >
              <MagneticButton
                as="a"
                href={RESUME_PDF_URL}
                download={RESUME_PDF_FILENAME}
                className="btn-accent inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg w-full sm:w-auto"
              >
                <i className="bx bx-download text-lg" aria-hidden="true" />
                Download Resume
              </MagneticButton>
              <a
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary glass gap-2 px-5 py-2.5 text-white/90 hover:text-accent w-full sm:w-auto justify-center"
              >
                <i className="bx bx-link-external text-lg" aria-hidden="true" />
                Open in new tab
              </a>
            </motion.div>
          </motion.header>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <Reveal
              variants={motionVariants.fadeUp(30)}
              viewport={{ once: true, amount: 0.15 }}
              className="glass-strong surface-card surface-card--panel p-3 md:p-4"
            >
              <div className="flex items-center justify-between px-2 pb-3 border-b border-white/8">
                <p className="text-sm font-medium text-white/70">Resume preview</p>
                <span className="chip text-xs text-white/60">PDF</span>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <ResumePreview
                  fileUrl={RESUME_PDF_URL}
                  title={`${contactInfo.name} resume preview`}
                />
              </div>
            </Reveal>

            <div className="space-y-5">
              <SectionCard title="Summary" icon="bx-user">
                <p className="text-sm text-white/75 leading-relaxed">
                  {resumeSummary}
                </p>
              </SectionCard>

              <SectionCard title="Skills" icon="bx-code-alt" delay={0.05}>
                <StaggerContainer
                  staggerAmount={0.06}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {resumeSkillGroups.map((group) => (
                    <motion.div key={group.title} variants={item}>
                      <p className="text-xs uppercase tracking-wider text-white/45 mb-2">
                        {group.title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span key={skill} className="chip text-xs text-white/80">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </SectionCard>

              <SectionCard title="Experience" icon="bx-briefcase" delay={0.08}>
                <StaggerContainer
                  staggerAmount={0.08}
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  {workExperience.map((entry) => (
                    <motion.article key={entry.id} variants={item}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-semibold text-white text-sm">
                          {entry.role}{" "}
                          <span className="text-white/40">@</span>{" "}
                          <span className="text-accent">{entry.company}</span>
                        </h4>
                        <time className="text-xs text-white/45">{entry.period}</time>
                      </div>
                      <p className="text-xs text-white/40 mt-0.5">{entry.type}</p>
                      <ul className="mt-2 space-y-1.5">
                        {entry.responsibilities.map((line) => (
                          <li
                            key={line}
                            className="flex gap-2 text-xs text-white/70 leading-relaxed"
                          >
                            <span className="text-accent shrink-0">→</span>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  ))}
                </StaggerContainer>
              </SectionCard>

              <SectionCard title="Education" icon="bx-book-open" delay={0.1}>
                <StaggerContainer
                  staggerAmount={0.06}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {education.map((entry) => (
                    <motion.div key={entry.id} variants={item}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-semibold text-sm text-white">
                          {entry.degree}
                        </p>
                        <time className="text-xs text-white/45">{entry.period}</time>
                      </div>
                      <p className="text-sm text-accent mt-0.5">
                        {entry.institution}
                      </p>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </SectionCard>

              <SectionCard title="Achievements" icon="bx-trophy" delay={0.12}>
                <motion.ul
                  variants={motionVariants.stagger(0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {achievements.map((entry) => (
                    <motion.li
                      key={entry.id}
                      variants={item}
                      className="flex gap-3 text-sm"
                    >
                      <i
                        className={`bx ${entry.icon} text-accent text-lg shrink-0 mt-0.5`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-medium text-white">{entry.title}</p>
                        <p className="text-xs text-white/60 mt-0.5">
                          {entry.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
