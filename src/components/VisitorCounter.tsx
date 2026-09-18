import { useEffect, useState } from "react";
import { recordVisitOnce } from "../services";

export default function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    recordVisitOnce().then((count) => {
      if (!cancelled) {
        setVisits(count);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="visitor-counter" aria-live="polite">
      <span className="visitor-counter-icon" aria-hidden="true">
        👁️
      </span>
      <span className="visitor-counter-label">Total Visits:</span>{" "}
      <span className="visitor-counter-value">
        {visits === null ? "…" : visits.toLocaleString()}
      </span>
    </div>
  );
}
