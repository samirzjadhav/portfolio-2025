import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-[#06030a] to-[#12061a]">
      <img src="../assets/pre.svg" alt="loading" className="w-28" />
    </div>
  );
}
