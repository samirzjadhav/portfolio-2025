import { motion, useReducedMotion, type Variants } from "framer-motion";
import "./section-transitions.css";

export type SectionTransitionVariant =
  | "hero-entry"
  | "glow-bridge"
  | "gradient-veil"
  | "scan-lines"
  | "orb-glow"
  | "node-path"
  | "horizon"
  | "footer-fade";

export type SectionTransitionSpacing = "tight" | "default" | "loose";

export interface SectionTransitionProps {
  variant: SectionTransitionVariant;
  spacing?: SectionTransitionSpacing;
  className?: string;
}

function createRevealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0.4 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

function createLineDrawVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0.35, scaleX: 1 },
      visible: { opacity: 1, scaleX: 1, transition: { duration: 0.25 } },
    };
  }

  return {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

function LineDraw({
  className,
  wrapClassName = "",
  variants,
}: {
  className: string;
  wrapClassName?: string;
  variants: Variants;
}) {
  return (
    <div className={`st-line-center ${wrapClassName}`.trim()}>
      <motion.div className={`st-line ${className}`.trim()} variants={variants} />
    </div>
  );
}

function createGlowVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0.5, scale: 1 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    };
  }

  return {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

function HeroEntryContent({ reduced }: { reduced: boolean }) {
  const reveal = createRevealVariants(reduced);
  const line = createLineDrawVariants(reduced);
  const glow = createGlowVariants(reduced);

  return (
    <>
      <motion.div className="st-bleed st-hero-veil" variants={reveal} />
      <div className="st-line-center st-line-center--hero">
        <motion.div className="st-line st-hero-glow" variants={line} />
      </div>
      <motion.div className="st-hero-orb" variants={glow} />
    </>
  );
}

function GlowBridgeContent({ reduced }: { reduced: boolean }) {
  const line = createLineDrawVariants(reduced);
  const glow = createGlowVariants(reduced);

  return (
    <>
      <motion.div className="st-bridge-flare" variants={glow} />
      <LineDraw className="st-bridge-line" variants={line} />
      <motion.div className="st-bridge-node" variants={glow} />
    </>
  );
}

function GradientVeilContent({ reduced }: { reduced: boolean }) {
  const reveal = createRevealVariants(reduced);
  const line = createLineDrawVariants(reduced);

  return (
    <>
      <div className="st-veil-band" aria-hidden="true" />
      <LineDraw className="st-veil-edge" variants={line} />
      <motion.div
        className="st-bleed"
        style={{
          top: "20%",
          height: "60%",
          background:
            "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(199,112,199,0.06), transparent 70%)",
        }}
        variants={reveal}
      />
    </>
  );
}

function ScanLinesContent({ reduced }: { reduced: boolean }) {
  const reveal = createRevealVariants(reduced);
  const line = createLineDrawVariants(reduced);

  return (
    <>
      <motion.div className="st-scan-wrap" variants={reveal}>
        <motion.div className="st-scan-line" variants={line} />
        <motion.div className="st-scan-line" variants={line} />
      </motion.div>
      <motion.span className="st-scan-tick st-scan-tick--left" variants={reveal} />
      <motion.span className="st-scan-tick st-scan-tick--right" variants={reveal} />
    </>
  );
}

function OrbGlowContent({ reduced }: { reduced: boolean }) {
  const glow = createGlowVariants(reduced);
  const line = createLineDrawVariants(reduced);

  return (
    <>
      <motion.div className="st-orb-field" variants={glow} />
      <LineDraw className="st-orb-rule" wrapClassName="st-line-center--wide" variants={line} />
    </>
  );
}

function NodePathContent({ reduced }: { reduced: boolean }) {
  const line = createLineDrawVariants(reduced);
  const node = createGlowVariants(reduced);

  return (
    <>
      <div className="st-line-center st-line-center--narrow">
        <motion.div className="st-line st-path-rail" variants={line} />
      </div>
      <motion.span className="st-path-node st-path-node--a" variants={node} />
      <motion.span className="st-path-node st-path-node--b" variants={node} />
      <motion.span className="st-path-node st-path-node--c" variants={node} />
    </>
  );
}

function HorizonContent({ reduced }: { reduced: boolean }) {
  const reveal = createRevealVariants(reduced);
  const line = createLineDrawVariants(reduced);

  return (
    <>
      <motion.div className="st-bleed st-horizon-band" variants={reveal} />
      <LineDraw
        className="st-horizon-line"
        wrapClassName="st-line-center--wide st-horizon-line-wrap"
        variants={line}
      />
    </>
  );
}

function FooterFadeContent({ reduced }: { reduced: boolean }) {
  const reveal = createRevealVariants(reduced);
  const line = createLineDrawVariants(reduced);

  return (
    <>
      <motion.div className="st-bleed st-footer-fade" variants={reveal} />
      <LineDraw
        className="st-footer-line"
        wrapClassName="st-line-center--footer"
        variants={line}
      />
    </>
  );
}

function TransitionContent({
  variant,
  reduced,
}: {
  variant: SectionTransitionVariant;
  reduced: boolean;
}) {
  switch (variant) {
    case "hero-entry":
      return <HeroEntryContent reduced={reduced} />;
    case "glow-bridge":
      return <GlowBridgeContent reduced={reduced} />;
    case "gradient-veil":
      return <GradientVeilContent reduced={reduced} />;
    case "scan-lines":
      return <ScanLinesContent reduced={reduced} />;
    case "orb-glow":
      return <OrbGlowContent reduced={reduced} />;
    case "node-path":
      return <NodePathContent reduced={reduced} />;
    case "horizon":
      return <HorizonContent reduced={reduced} />;
    case "footer-fade":
      return <FooterFadeContent reduced={reduced} />;
  }
}

export default function SectionTransition({
  variant,
  spacing = "default",
  className = "",
}: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();
  const reduced = reduceMotion === true;

  return (
    <motion.div
      className={`section-transition ${className}`.trim()}
      data-variant={variant}
      data-spacing={spacing}
      data-reduced={reduced ? "true" : "false"}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55, margin: "0px 0px -24px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.04 },
        },
      }}
    >
      <TransitionContent variant={variant} reduced={reduced} />
    </motion.div>
  );
}
