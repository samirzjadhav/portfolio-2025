import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useProjectDetailMotion } from "../../hooks/useProjectDetailMotion";
import { useProjectGallery } from "../../hooks/useProjectGallery";
import type { ProjectGalleryImage } from "../../types/gallery";

interface ProjectImageGalleryProps {
  images: ProjectGalleryImage[];
  projectTitle: string;
}

interface GalleryViewportProps {
  gallery: ReturnType<typeof useProjectGallery>;
  projectTitle: string;
  fullscreen?: boolean;
}

function GalleryViewport({
  gallery,
  projectTitle,
  fullscreen = false,
}: GalleryViewportProps) {
  const {
    activeIndex,
    activeImage,
    count,
    direction,
    hasMultiple,
    reduceMotion,
    slideVariants,
    transition,
    goNext,
    goPrev,
    goTo,
    handleDragEnd,
    openFullscreen,
    closeFullscreen,
  } = gallery;

  const rootClass = fullscreen
    ? "project-gallery-viewport project-gallery-viewport--fullscreen"
    : "project-gallery-viewport";

  return (
    <div className={rootClass}>
      <div className="project-gallery-main">
        {hasMultiple ? (
          <>
            <button
              type="button"
              className="project-gallery-nav project-gallery-nav--prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <i className="bx bx-chevron-left text-2xl" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="project-gallery-nav project-gallery-nav--next"
              onClick={goNext}
              aria-label="Next image"
            >
              <i className="bx bx-chevron-right text-2xl" aria-hidden="true" />
            </button>
          </>
        ) : null}

        <motion.div
          className="project-gallery-stage"
          drag={hasMultiple && !reduceMotion ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.img
              key={`${activeImage.src}-${activeIndex}-${fullscreen ? "fs" : "inline"}`}
              src={activeImage.src}
              alt={activeImage.alt}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="project-gallery-image"
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>

        <div className="project-gallery-toolbar">
          <span className="project-gallery-counter" aria-live="polite">
            {activeIndex + 1} / {count}
          </span>
          <div className="project-gallery-toolbar-actions">
            {!fullscreen ? (
              <button
                type="button"
                className="project-gallery-icon-btn"
                onClick={openFullscreen}
                aria-label={`Open ${projectTitle} gallery fullscreen`}
              >
                <i className="bx bx-fullscreen text-lg" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="project-gallery-icon-btn"
                onClick={closeFullscreen}
                aria-label="Close fullscreen gallery"
              >
                <i className="bx bx-x text-xl" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {activeImage.caption ? (
        <p className="project-gallery-caption">{activeImage.caption}</p>
      ) : null}

      {hasMultiple ? (
        <div
          className="project-gallery-thumbs"
          role="tablist"
          aria-label={`${projectTitle} screenshot thumbnails`}
        >
          {gallery.images.map((image, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`View image ${index + 1} of ${count}`}
                className={`project-gallery-thumb ${selected ? "is-active" : ""}`.trim()}
                onClick={() => goTo(index)}
              >
                <img src={image.src} alt="" aria-hidden="true" draggable={false} />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectImageGallery({
  images,
  projectTitle,
}: ProjectImageGalleryProps) {
  const gallery = useProjectGallery({ images });
  const detailMotion = useProjectDetailMotion();
  const { containerRef, handleKeyDown, isFullscreen } = gallery;

  if (images.length === 0) return null;

  return (
    <>
      <motion.div
        ref={containerRef}
        className="project-gallery"
        role="region"
        aria-label={`${projectTitle} image gallery`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        initial="hidden"
        whileInView="visible"
        viewport={detailMotion.viewport}
        variants={detailMotion.gallery}
      >
        <GalleryViewport gallery={gallery} projectTitle={projectTitle} />
        <p className="project-gallery-hint">
          {gallery.hasMultiple
            ? "Swipe, use arrow keys, or press F for fullscreen"
            : "Press F for fullscreen"}
        </p>
      </motion.div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isFullscreen ? (
                <motion.div
                  className="project-gallery-fullscreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${projectTitle} fullscreen gallery`}
                >
                  <div
                    className="project-gallery-fullscreen-backdrop"
                    onClick={gallery.closeFullscreen}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="project-gallery-fullscreen-panel"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <GalleryViewport
                      gallery={gallery}
                      projectTitle={projectTitle}
                      fullscreen
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
