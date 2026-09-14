import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { ProjectGalleryImage } from "../types/gallery";

interface UseProjectGalleryOptions {
  images: ProjectGalleryImage[];
  initialIndex?: number;
}

export function useProjectGallery({
  images,
  initialIndex = 0,
}: UseProjectGalleryOptions) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const hasMultiple = count > 1;
  const clampedIndex =
    count === 0 ? 0 : Math.min(activeIndex, count - 1);
  const activeImage = images[clampedIndex] ?? images[0];

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;

      setActiveIndex((current) => {
        const nextIndex = ((index % count) + count) % count;
        setDirection(
          nextIndex > current ? 1 : nextIndex < current ? -1 : 0
        );
        return nextIndex;
      });
    },
    [count]
  );

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    setDirection(1);
    setActiveIndex((current) => (current + 1) % count);
  }, [count, hasMultiple]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + count) % count);
  }, [count, hasMultiple]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((open) => !open);
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (!hasMultiple || reduceMotion) return;

      if (info.offset.x <= -72) goNext();
      else if (info.offset.x >= 72) goPrev();
    },
    [goNext, goPrev, hasMultiple, reduceMotion]
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent | KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goPrev();
          break;
        case "Escape":
          if (isFullscreen) {
            event.preventDefault();
            closeFullscreen();
          }
          break;
        case "f":
        case "F":
          if (event.target instanceof HTMLInputElement) return;
          event.preventDefault();
          toggleFullscreen();
          break;
        default:
          break;
      }
    },
    [closeFullscreen, goNext, goPrev, isFullscreen, toggleFullscreen]
  );

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onWindowKeyDown = (event: KeyboardEvent) => handleKeyDown(event);
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [handleKeyDown, isFullscreen]);

  const slideVariants = useMemo(
    () => ({
      enter: (slideDirection: number) =>
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: slideDirection > 0 ? 48 : -48, scale: 0.985 },
      center: { opacity: 1, x: 0, scale: 1 },
      exit: (slideDirection: number) =>
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: slideDirection > 0 ? -48 : 48, scale: 0.985 },
    }),
    [reduceMotion]
  );

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.2 }
        : { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.65 },
    [reduceMotion]
  );

  return {
    containerRef,
    images,
    count,
    hasMultiple,
    activeIndex: clampedIndex,
    activeImage,
    direction,
    isFullscreen,
    reduceMotion: reduceMotion === true,
    slideVariants,
    transition,
    goTo,
    goNext,
    goPrev,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
    handleDragEnd,
    handleKeyDown,
  };
}
