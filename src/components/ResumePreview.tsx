import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface ResumePreviewProps {
  fileUrl: string;
  title: string;
}

export default function ResumePreview({ fileUrl, title }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, [updateWidth]);

  return (
    <div
      ref={containerRef}
      className="h-[55vh] sm:h-[65vh] md:h-[70vh] min-h-[280px] sm:min-h-[400px] md:min-h-[480px] overflow-y-auto bg-white rounded-xl"
    >
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages: totalPages }) => setNumPages(totalPages)}
        loading={
          <div className="flex h-full min-h-[280px] md:min-h-[480px] items-center justify-center text-sm text-neutral-500">
            Loading preview…
          </div>
        }
        error={
          <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-3 p-6 text-center text-sm text-neutral-600">
            <p>Could not load the PDF preview.</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-accent">
              Open PDF in new tab
            </a>
          </div>
        }
      >
        {width > 0 &&
          Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page-${index + 1}`}
              pageNumber={index + 1}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className={index < numPages - 1 ? "border-b border-neutral-200" : undefined}
            />
          ))}
      </Document>

      <span className="sr-only">{title}</span>
    </div>
  );
}
