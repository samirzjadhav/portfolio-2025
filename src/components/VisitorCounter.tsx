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
    <div
      className="
        fixed bottom-5 right-5
        glass px-4 py-2 rounded-lg
        text-white text-sm
        border border-white/10
        backdrop-blur-xl z-50
      "
    >
      👁️ Total Visits:{" "}
      <span className="text-accent font-semibold">
        {visits === null ? "…" : visits.toLocaleString()}
      </span>
    </div>
  );
}
