import { useState } from "react";
import { incrementVisitCount } from "../services";

export default function VisitorCounter() {
  const [visits] = useState(incrementVisitCount);

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
      <span className="text-accent font-semibold">{visits}</span>
    </div>
  );
}
