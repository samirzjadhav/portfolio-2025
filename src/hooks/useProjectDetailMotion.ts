import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import {
  MOTION_EASE,
  PROJECT_DETAIL_LIST_VIEWPORT,
  PROJECT_DETAIL_SECTION_VIEWPORT,
  PROJECT_DETAIL_VIEWPORT,
} from "../motion/tokens";
import {
  projectDetailCtaCard,
  projectDetailGallery,
  projectDetailHeroCta,
  projectDetailHeroMedia,
  projectDetailHeroTitle,
  projectDetailListItem,
  projectDetailReveal,
  projectDetailSectionBody,
  projectDetailSectionShell,
  projectDetailSectionTitle,
  projectDetailStagger,
  projectDetailTechChip,
  projectDetailTechPanel,
  projectTagReveal,
} from "../motion/variants";

export function useProjectDetailMotion() {
  const reduceMotion = useReducedMotion();

  return useMemo(
    () => ({
      reduceMotion: reduceMotion ?? false,
      viewport: PROJECT_DETAIL_VIEWPORT,
      sectionViewport: PROJECT_DETAIL_SECTION_VIEWPORT,
      listViewport: PROJECT_DETAIL_LIST_VIEWPORT,
      ease: MOTION_EASE,
      heroStagger: projectDetailStagger(reduceMotion, 0.05, 0.02),
      heroBack: projectDetailReveal(reduceMotion, { distance: 12, duration: 0.36 }),
      heroEyebrow: projectDetailReveal(reduceMotion, { distance: 14, duration: 0.38 }),
      heroTitle: projectDetailHeroTitle(reduceMotion),
      heroTag: projectTagReveal(reduceMotion),
      heroTagStagger: projectDetailStagger(reduceMotion, 0.04, 0.02),
      heroCta: projectDetailHeroCta(reduceMotion),
      heroCtaStagger: projectDetailStagger(reduceMotion, 0.06, 0.03),
      heroMedia: projectDetailHeroMedia(reduceMotion),
      heroMediaImage: {
        initial: reduceMotion ? false : { scale: 1.05, opacity: 0.85 },
        animate: { scale: 1, opacity: 1 },
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: MOTION_EASE, delay: 0.08 },
      },
      sectionShell: projectDetailSectionShell(reduceMotion),
      sectionContentStagger: projectDetailStagger(reduceMotion, 0.05, 0.02),
      sectionTitle: projectDetailSectionTitle(reduceMotion),
      sectionBody: projectDetailSectionBody(reduceMotion),
      listStagger: projectDetailStagger(reduceMotion, 0.05, 0.02),
      listItem: projectDetailListItem(reduceMotion),
      techStackStagger: projectDetailStagger(reduceMotion, 0.05, 0.02),
      techChip: projectDetailTechChip(reduceMotion),
      techPanel: projectDetailTechPanel(reduceMotion),
      techUsageCard: projectDetailReveal(reduceMotion, {
        distance: 10,
        scale: 0.99,
        duration: 0.34,
      }),
      gallery: projectDetailGallery(reduceMotion),
      ctaCard: projectDetailCtaCard(reduceMotion),
      ctaStagger: projectDetailStagger(reduceMotion, 0.07, 0.03),
    }),
    [reduceMotion]
  );
}
