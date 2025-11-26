import React, { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    Promise.resolve().then(() => {
      let total = localStorage.getItem("visit-count");

      if (!total) {
        total = 1;
      } else {
        total = parseInt(total) + 1;
      }

      localStorage.setItem("visit-count", total);
      setVisits(total);
    });
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
      <span className="text-accent font-semibold">{visits}</span>
    </div>
  );
}
