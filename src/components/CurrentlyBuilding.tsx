import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import {
  currentlyLearningSkills,
  getResumeAlignedTopics,
  type CurrentlyBuildingTopic,
} from "../data/currentlyBuilding";
import { MOTION_EASE, SectionIntro, useMotionVariants } from "../motion";

const TOPICS = getResumeAlignedTopics();

function StatusBadge({ status }: { status: CurrentlyBuildingTopic["status"] }) {
  const isBuilding = status === "building";

  return (
    <span className={`dev-card-status ${isBuilding ? "is-building" : "is-learning"}`}>
      <span className="dev-card-status-dot" aria-hidden="true" />
      {isBuilding ? "building" : "learning"}
    </span>
  );
}

export default function CurrentlyBuilding() {
  const [activeId, setActiveId] = useState(TOPICS[0]?.id ?? "");
  const { scrollReveal, hover, reduceMotion } = useMotionVariants();

  const activeTopic =
    TOPICS.find((topic) => topic.id === activeId) ?? TOPICS[0] ?? null;

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  if (!activeTopic || TOPICS.length === 0) {
    return null;
  }

  return (
    <section id="building" className="section-block">
      <SectionIntro
        title="Currently Building"
        subtitle="What I'm learning and applying on personal projects — straight from my resume."
      />

      <motion.div
        className="section-content dev-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
        variants={scrollReveal({ distance: 22, scale: 0.985, duration: 0.45 })}
      >
        <div className="dev-card-chrome" aria-hidden="true">
          <span className="dev-card-dot dev-card-dot--close" />
          <span className="dev-card-dot dev-card-dot--minimize" />
          <span className="dev-card-dot dev-card-dot--maximize" />
          <span className="dev-card-title">currently-building — zsh</span>
        </div>

        <div className="dev-card-body">
          <p className="dev-card-path">
            <span className="dev-card-prompt" aria-hidden="true">
              ➜
            </span>{" "}
            <span className="dev-card-path-text">{activeTopic.terminalPath}</span>
          </p>

          <div
            className="dev-card-tabs"
            role="tablist"
            aria-label="Currently learning topics"
          >
            {TOPICS.map((topic) => {
              const isActive = topic.id === activeTopic.id;

              return (
                <motion.button
                  key={topic.id}
                  type="button"
                  role="tab"
                  id={`building-tab-${topic.id}`}
                  aria-selected={isActive}
                  aria-controls={`building-panel-${topic.id}`}
                  className={`dev-card-tab ${isActive ? "is-active" : ""}`.trim()}
                  onClick={() => handleSelect(topic.id)}
                  whileHover={reduceMotion ? undefined : hover.chip(1.03)}
                  whileTap={reduceMotion ? undefined : hover.tap()}
                >
                  {topic.name}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic.id}
              id={`building-panel-${activeTopic.id}`}
              role="tabpanel"
              aria-labelledby={`building-tab-${activeTopic.id}`}
              className="dev-card-panel"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: MOTION_EASE }}
            >
              <div className="dev-card-panel-head">
                <h4 className="dev-card-focus">{activeTopic.summary}</h4>
                <StatusBadge status={activeTopic.status} />
              </div>

              <ul className="dev-card-lines" aria-label="Current focus">
                {activeTopic.focusLines.map((line) => (
                  <li key={line} className="dev-card-line">
                    <span className="dev-card-line-prefix" aria-hidden="true">
                      ›
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <div className="dev-card-stack">
                <span className="dev-card-stack-label">stack</span>
                <ul className="dev-card-stack-list">
                  {activeTopic.stack.map((item) => (
                    <li key={item}>
                      <span className="dev-card-stack-chip">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="dev-card-footer">
            <span className="dev-card-footer-label">resume · currently learning:</span>{" "}
            {currentlyLearningSkills.join(" · ")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
