import React from "react";

function Loader({ text }) {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <p className="text-lg text-gray-700">{text}</p>
    </div>
  );
}

export default Loader;
