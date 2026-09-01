import { getScrollBehavior } from "./motionPreferences";

export function smoothScrollTo(
  targetId: string,
  offset = 70,
  behavior?: ScrollBehavior
): void {
  const element = document.getElementById(targetId);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: behavior ?? getScrollBehavior(),
  });
}
