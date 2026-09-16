import React from "react";
import preSvg from "../assets/pre.svg";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-[#06030a] to-[#12061a]">
      <img src={preSvg} alt="loading" className="w-28" />
    </div>
  );
}
