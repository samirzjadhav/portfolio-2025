import type { Transition, ViewportOptions } from "framer-motion";

export const MOTION_EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export const MOTION_DURATION = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.7,
} as const;

export const DEFAULT_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -48px 0px",
};

export const SECTION_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.2,
};

export const ITEM_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.35,
};

export const HEADING_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.4,
};

export const PARAGRAPH_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.55,
  margin: "0px 0px -32px 0px",
};

export const GRID_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -64px 0px",
};

/** Project detail — triggers slightly before full section is in view. */
export const PROJECT_DETAIL_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.16,
  margin: "0px 0px -8% 0px",
};

export const PROJECT_DETAIL_SECTION_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.14,
  margin: "0px 0px -6% 0px",
};

export const PROJECT_DETAIL_LIST_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -4% 0px",
};
