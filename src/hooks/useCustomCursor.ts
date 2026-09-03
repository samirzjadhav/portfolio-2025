import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CursorVariant = "default" | "hover" | "pointer" | "project";

const DOT_SPRING = { stiffness: 520, damping: 30, mass: 0.35 };
const RING_SPRING = { stiffness: 300, damping: 24, mass: 0.55 };

const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

interface CursorState {
  visible: boolean;
  variant: CursorVariant;
  isPressed: boolean;
  keyboardMode: boolean;
  useNativeCursor: boolean;
}

const INITIAL_CURSOR_STATE: CursorState = {
  visible: false,
  variant: "default",
  isPressed: false,
  keyboardMode: false,
  useNativeCursor: false,
};

function resolveCursorVariant(element: Element | null): CursorVariant {
  if (!element) return "default";

  if (element.closest(TEXT_INPUT_SELECTOR)) {
    return "default";
  }

  if (element.closest(".project-card-shell")) {
    return "project";
  }

  if (
    element.closest(
      'a, button, [role="button"], .btn-accent, input[type="submit"], input[type="button"], input[type="reset"]'
    )
  ) {
    return "pointer";
  }

  if (element.closest('[data-cursor="hover"], .cursor-hover-target')) {
    return "hover";
  }

  return "default";
}

function shouldHideForNativeCursor(element: Element | null): boolean {
  return Boolean(element?.closest(TEXT_INPUT_SELECTOR));
}

function patchCursorState(
  current: CursorState,
  patch: Partial<CursorState>
): CursorState | null {
  const next = { ...current };
  let changed = false;

  if (
    patch.visible !== undefined &&
    patch.visible !== current.visible
  ) {
    next.visible = patch.visible;
    changed = true;
  }
  if (
    patch.variant !== undefined &&
    patch.variant !== current.variant
  ) {
    next.variant = patch.variant;
    changed = true;
  }
  if (
    patch.isPressed !== undefined &&
    patch.isPressed !== current.isPressed
  ) {
    next.isPressed = patch.isPressed;
    changed = true;
  }
  if (
    patch.keyboardMode !== undefined &&
    patch.keyboardMode !== current.keyboardMode
  ) {
    next.keyboardMode = patch.keyboardMode;
    changed = true;
  }
  if (
    patch.useNativeCursor !== undefined &&
    patch.useNativeCursor !== current.useNativeCursor
  ) {
    next.useNativeCursor = patch.useNativeCursor;
    changed = true;
  }

  return changed ? next : null;
}

export function useCustomCursor() {
  const reduceMotion = useReducedMotion();
  const enabled = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      reduceMotion !== true,
    [reduceMotion]
  );

  const stateRef = useRef<CursorState>(INITIAL_CURSOR_STATE);
  const [cursorState, setCursorState] = useState(INITIAL_CURSOR_STATE);
  const frameRef = useRef(0);

  const commitState = useCallback((next: CursorState) => {
    stateRef.current = next;
    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      setCursorState(stateRef.current);
    });
  }, []);

  const updateState = useCallback(
    (patch: Partial<CursorState>) => {
      const next = patchCursorState(stateRef.current, patch);
      if (next) commitState(next);
    },
    [commitState]
  );

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const dotX = useSpring(pointerX, DOT_SPRING);
  const dotY = useSpring(pointerY, DOT_SPRING);
  const ringX = useSpring(pointerX, RING_SPRING);
  const ringY = useSpring(pointerY, RING_SPRING);

  const active = enabled && !cursorState.keyboardMode;

  useEffect(() => {
    const root = document.documentElement;
    if (!active) {
      root.classList.remove("custom-cursor-active");
      return;
    }

    root.classList.add("custom-cursor-active");
    return () => root.classList.remove("custom-cursor-active");
  }, [active]);

  const updateTarget = useCallback(
    (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        updateState({ variant: "default", useNativeCursor: false });
        return;
      }

      updateState({
        useNativeCursor: shouldHideForNativeCursor(target),
        variant: resolveCursorVariant(target),
      });
    },
    [updateState]
  );

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const { clientX, clientY } = event;
      const offScreen =
        clientX <= 0 ||
        clientY <= 0 ||
        clientX >= window.innerWidth - 1 ||
        clientY >= window.innerHeight - 1;

      pointerX.set(clientX);
      pointerY.set(clientY);

      if (offScreen) {
        updateState({ visible: false });
        return;
      }

      updateState({ visible: true });
      updateTarget(event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      updateState({ isPressed: true, keyboardMode: false });
    };

    const handlePointerUp = () => {
      updateState({ isPressed: false });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        updateState({ keyboardMode: true, visible: false });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    };
  }, [enabled, pointerX, pointerY, updateState, updateTarget]);

  return {
    active: active && cursorState.visible && !cursorState.useNativeCursor,
    variant: cursorState.variant,
    isPressed: cursorState.isPressed,
    dotX,
    dotY,
    ringX,
    ringY,
  };
}
