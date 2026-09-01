import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import {
  hoverCard,
  hoverChip,
  hoverChipLift,
  hoverDot,
  hoverExperienceCard,
  hoverIcon,
  hoverLift,
  hoverNudge,
  hoverProjectCard,
  hoverRepoCard,
  hoverScale,
  hoverScaleColor,
  tapScale,
} from "./hover";
import {
  DEFAULT_VIEWPORT,
  GRID_VIEWPORT,
  HEADING_VIEWPORT,
  ITEM_VIEWPORT,
  PARAGRAPH_VIEWPORT,
  SECTION_VIEWPORT,
} from "./tokens";
import {
  cardLift,
  cellReveal,
  chipReveal,
  dotReveal,
  fadeIn,
  fadeUp,
  lineReveal,
  pageTransition,
  premiumPageTransition,
  scaleIn,
  slide,
  springChild,
  springReveal,
  stagger,
  textReveal,
  textRevealContainer,
  timelineReveal,
  navReveal,
  heroCharReveal,
  heroCharContainer,
  heroSubtitleWord,
  heroSubtitleContainer,
  heroLineReveal,
  heroLinesContainer,
  heroCtaItem,
  heroCtaContainer,
  heroScrollCue,
  scrollHeading,
  scrollSubheading,
  scrollReveal,
  scrollRevealLeft,
  scrollRevealRight,
  scrollItem,
  scrollStagger,
  projectDetailTransition,
  projectTagReveal,
} from "./variants";

export function useMotionVariants() {
  const reduceMotion = useReducedMotion();

  return useMemo(
    () => ({
      reduceMotion,
      viewport: DEFAULT_VIEWPORT,
      sectionViewport: SECTION_VIEWPORT,
      itemViewport: ITEM_VIEWPORT,
      headingViewport: HEADING_VIEWPORT,
      paragraphViewport: PARAGRAPH_VIEWPORT,
      gridViewport: GRID_VIEWPORT,
      fadeUp: (distance?: number) => fadeUp(reduceMotion, distance),
      fadeIn: () => fadeIn(reduceMotion),
      slide: (options?: Parameters<typeof slide>[1]) =>
        slide(reduceMotion, options),
      stagger: (staggerChildren?: number, delayChildren?: number) =>
        stagger(reduceMotion, staggerChildren, delayChildren),
      scaleIn: (from?: number) => scaleIn(reduceMotion, from),
      pageTransition: () => pageTransition(reduceMotion),
      premiumPageTransition: () => premiumPageTransition(reduceMotion),
      textReveal: (distance?: number) => textReveal(reduceMotion, distance),
      textRevealContainer: () => textRevealContainer(reduceMotion),
      springReveal: (options?: Parameters<typeof springReveal>[1]) =>
        springReveal(reduceMotion, options),
      springChild: (x?: number) => springChild(reduceMotion, x),
      dotReveal: () => dotReveal(reduceMotion),
      lineReveal: (delay?: number) => lineReveal(reduceMotion, delay),
      timelineReveal: () => timelineReveal(reduceMotion),
      chipReveal: () => chipReveal(reduceMotion),
      cardLift: () => cardLift(reduceMotion),
      cellReveal: () => cellReveal(reduceMotion),
      navReveal: (options?: { slide?: boolean }) =>
        navReveal(reduceMotion, options),
      heroCharReveal: () => heroCharReveal(reduceMotion),
      heroCharContainer: () => heroCharContainer(reduceMotion),
      heroSubtitleWord: () => heroSubtitleWord(reduceMotion),
      heroSubtitleContainer: () => heroSubtitleContainer(reduceMotion),
      heroLineReveal: () => heroLineReveal(reduceMotion),
      heroLinesContainer: () => heroLinesContainer(reduceMotion),
      heroCtaItem: () => heroCtaItem(reduceMotion),
      heroCtaContainer: () => heroCtaContainer(reduceMotion),
      heroScrollCue: () => heroScrollCue(reduceMotion),
      scrollHeading: () => scrollHeading(reduceMotion),
      scrollSubheading: () => scrollSubheading(reduceMotion),
      scrollReveal: (options?: Parameters<typeof scrollReveal>[1]) =>
        scrollReveal(reduceMotion, options),
      scrollRevealLeft: (distance?: number) =>
        scrollRevealLeft(reduceMotion, distance),
      scrollRevealRight: (distance?: number) =>
        scrollRevealRight(reduceMotion, distance),
      scrollItem: (index?: number) => scrollItem(reduceMotion, index),
      scrollStagger: (staggerChildren?: number, delayChildren?: number) =>
        scrollStagger(reduceMotion, staggerChildren, delayChildren),
      projectDetailTransition: () => projectDetailTransition(reduceMotion),
      projectTagReveal: () => projectTagReveal(reduceMotion),
      hover: {
        lift: (y?: number, scale?: number) => hoverLift(reduceMotion, y, scale),
        scale: (scale?: number) => hoverScale(reduceMotion, scale),
        scaleColor: (scale?: number, color?: string) =>
          hoverScaleColor(reduceMotion, scale, color),
        card: () => hoverCard(reduceMotion),
        chip: (scale?: number) => hoverChip(reduceMotion, scale),
        chipLift: () => hoverChipLift(reduceMotion),
        nudge: (x?: number) => hoverNudge(reduceMotion, x),
        icon: (scale?: number, rotate?: number) =>
          hoverIcon(reduceMotion, scale, rotate),
        projectCard: () => hoverProjectCard(reduceMotion),
        repoCard: () => hoverRepoCard(reduceMotion),
        experienceCard: () => hoverExperienceCard(reduceMotion),
        dot: (scale?: number) => hoverDot(reduceMotion, scale),
        tap: (scale?: number) => tapScale(reduceMotion, scale),
      },
    }),
    [reduceMotion]
  );
}
