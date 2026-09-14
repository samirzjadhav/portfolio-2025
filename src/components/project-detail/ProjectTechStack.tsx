import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { useProjectDetailMotion } from "../../hooks/useProjectDetailMotion";
import { StaggerContainer } from "../../motion";
import type { Project } from "../../types";
import { hasFinePointer } from "../../utils/motionPreferences";
import {
  getHighlightedSegments,
  getProjectTechProfiles,
  type ProjectTechProfile,
} from "../../utils/projectTechUsage";

interface ProjectTechStackProps {
  project: Project;
  approachNote?: string;
  activeTag: string | null;
  onActiveTagChange: (tag: string | null) => void;
}

function TechUsageCard({
  profile,
  isActive,
  isDimmed,
  variants,
}: {
  profile: ProjectTechProfile;
  isActive: boolean;
  isDimmed: boolean;
  variants: ReturnType<typeof useProjectDetailMotion>["techUsageCard"];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      layout={!reduceMotion}
      variants={variants}
      animate={{
        opacity: isDimmed ? 0.38 : 1,
        scale: isActive ? 1 : 0.985,
      }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`project-tech-usage-card ${isActive ? "is-active" : ""} ${
        isDimmed ? "is-dimmed" : ""
      }`.trim()}
    >
      <span className="project-tech-usage-tag">{profile.tag}</span>
      {profile.usages.length > 0 ? (
        <ul className="project-tech-usage-list">
          {profile.usages.map((usage) => (
            <li key={usage.id} className="project-tech-usage-item">
              <span className="project-tech-usage-source">{usage.sourceLabel}</span>
              <p className="project-tech-usage-text">
                {getHighlightedSegments(usage.text, profile.tag).map(
                  (segment, index) =>
                    segment.highlighted ? (
                      <mark key={index} className="project-tech-highlight">
                        {segment.text}
                      </mark>
                    ) : (
                      <span key={index}>{segment.text}</span>
                    )
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="project-tech-usage-fallback">
          Core part of this project&apos;s stack — see the sections below for
          implementation details.
        </p>
      )}
    </motion.li>
  );
}

export default function ProjectTechStack({
  project,
  approachNote,
  activeTag,
  onActiveTagChange,
}: ProjectTechStackProps) {
  const reduceMotion = useReducedMotion();
  const detailMotion = useProjectDetailMotion();
  const hintId = useId();
  const usagePanelId = useId();
  const [pointerFine] = useState(hasFinePointer);
  const profiles = useMemo(() => getProjectTechProfiles(project), [project]);

  const activateTag = useCallback(
    (tag: string) => {
      onActiveTagChange(tag);
    },
    [onActiveTagChange]
  );

  const clearTag = useCallback(() => {
    onActiveTagChange(null);
  }, [onActiveTagChange]);

  const toggleTag = useCallback(
    (tag: string) => {
      onActiveTagChange(activeTag === tag ? null : tag);
    },
    [activeTag, onActiveTagChange]
  );

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const buttons = event.currentTarget
      .closest('[role="toolbar"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]');

    if (!buttons?.length) return;

    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (index + 1) % buttons.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex = (index - 1 + buttons.length) % buttons.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      nextIndex = buttons.length - 1;
    } else if (event.key === "Escape") {
      event.preventDefault();
      clearTag();
      event.currentTarget.blur();
      return;
    } else {
      return;
    }

    buttons[nextIndex]?.focus();
    const nextTag = project.tags[nextIndex];
    if (nextTag) activateTag(nextTag);
  };

  const activeProfile = profiles.find((profile) => profile.tag === activeTag);

  return (
    <StaggerContainer
      className="project-tech-stack"
      viewport={detailMotion.listViewport}
      variants={detailMotion.techStackStagger}
    >
      {approachNote ? (
        <motion.p
          variants={detailMotion.sectionBody}
          className="project-detail-prose project-detail-prose-spaced"
        >
          {approachNote}
        </motion.p>
      ) : null}

      <motion.p
        id={hintId}
        variants={detailMotion.sectionBody}
        className="project-tech-hint"
      >
        {pointerFine
          ? "Hover or focus a technology to see where it appears in this project."
          : "Tap a technology to see where it appears in this project."}
      </motion.p>

      <div
        role="toolbar"
        aria-label="Technologies used in this project"
        aria-describedby={hintId}
        className="project-tech-chip-grid"
        onMouseLeave={pointerFine ? clearTag : undefined}
      >
        {project.tags.map((tag, index) => {
          const profile = profiles.find((entry) => entry.tag === tag);
          const usageCount = profile?.usages.length ?? 0;
          const isActive = activeTag === tag;

          return (
            <motion.button
              key={tag}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-controls={usagePanelId}
              variants={detailMotion.techChip}
              className={`project-tech-chip ${isActive ? "is-active" : ""}`.trim()}
              onMouseEnter={pointerFine ? () => activateTag(tag) : undefined}
              onFocus={() => activateTag(tag)}
              onBlur={(event) => {
                if (
                  !event.currentTarget
                    .closest(".project-tech-stack")
                    ?.contains(event.relatedTarget as Node | null)
                ) {
                  clearTag();
                }
              }}
              onClick={() => toggleTag(tag)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="project-tech-chip-label">{tag}</span>
              <span className="project-tech-chip-meta">
                {usageCount} {usageCount === 1 ? "use" : "uses"}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        id={usagePanelId}
        role="region"
        aria-label={
          activeProfile
            ? `${activeProfile.tag} usage in this project`
            : "Technology usage in this project"
        }
        aria-live="polite"
        variants={detailMotion.techPanel}
        className="project-tech-usage-panel"
      >
        <AnimatePresence mode="wait">
          {activeTag ? (
            <motion.p
              key="active-label"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="project-tech-usage-heading"
            >
              Where <span className="text-accent">{activeTag}</span> shows up
            </motion.p>
          ) : (
            <motion.p
              key="idle-label"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="project-tech-usage-heading project-tech-usage-heading-idle"
            >
              All technology touchpoints in this project
            </motion.p>
          )}
        </AnimatePresence>

        <motion.ul
          className="project-tech-usage-grid"
          variants={detailMotion.listStagger}
          initial="hidden"
          animate="visible"
        >
          {profiles
            .filter(
              (profile) =>
                profile.usages.length > 0 ||
                !activeTag ||
                profile.tag === activeTag
            )
            .map((profile) => (
              <TechUsageCard
                key={profile.tag}
                profile={profile}
                isActive={!activeTag || profile.tag === activeTag}
                isDimmed={Boolean(activeTag && profile.tag !== activeTag)}
                variants={detailMotion.techUsageCard}
              />
            ))}
        </motion.ul>

        {profiles.every((profile) => profile.usages.length === 0) ? (
          <p className="project-tech-empty">
            Usage details for these technologies are spread across the case study
            sections below.
          </p>
        ) : null}
      </motion.div>
    </StaggerContainer>
  );
}
