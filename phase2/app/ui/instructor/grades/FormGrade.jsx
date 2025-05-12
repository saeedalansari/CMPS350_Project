"use client";
import React, { useState, useRef } from "react";
import Alert from "../../Alert";
import Requests from "../../Requests";

export default function FormGrade({ studentCourseId }) {
  const [alert, setAlert] = useState("");

  const inputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const grade = e.target.grade.value;
    const request = await Requests.requestPATCH(`/enterGrade`, {
      studentCourseId,
      grade,
    });
    try {
      const data = await request.json();
      if (data.success) {
        setAlert("Grade entered successfully");
        window.location.reload();
      } else {
        setAlert(data.message);
      }
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="btns">
      <input
        ref={inputRef}
        name="grade"
        className="update-btn input_grade"
        type="number"
        id="grade"
        placeholder="enter grade"
        min="0"
        max="100"
      />
      <button type="submit" className="update-btn">
        save and finalize
      </button>
      <Alert message={alert} setAlert={setAlert} />
    </form>
  );
}
