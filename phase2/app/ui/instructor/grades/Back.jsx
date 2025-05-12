"use client";

export default function Back() {
  return (
    <button
      onClick={() => window.history.back()}
      className="add-btn"
      id="add-cours"
    >
      Back
    </button>
  );
}
