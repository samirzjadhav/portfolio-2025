import React, { useState } from "react";

function readVisitCount() {
  const stored = localStorage.getItem("visit-count");
  const total = stored ? parseInt(stored, 10) + 1 : 1;
  localStorage.setItem("visit-count", String(total));
  return total;
}

export default function VisitorCounter() {
  const [visits] = useState(readVisitCount);

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
