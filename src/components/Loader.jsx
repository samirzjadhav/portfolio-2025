import React from "react";
import preSvg from "../assets/pre.svg";

export default function Loader() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-[#06030a] to-[#12061a]"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <img src={preSvg} alt="" className="w-28" />
    </div>
  );
}
