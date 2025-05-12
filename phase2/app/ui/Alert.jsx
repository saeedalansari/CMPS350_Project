"use client";
import React, { useEffect, useRef } from "react";

export default function Alert({ message, setAlert }) {
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }, [message]);
  return (
    message && (
      <div className="alert_popup">
        <h2 id="alert_form">{message}</h2>
      </div>
    )
  );
}
