"use client";
import React, { useState, useRef } from "react";
import PageTitle from "../PageTitle";
import Alert from "../Alert";
import Requests from "../Requests";
import localStorageUser from "../localStorageUser";

export default function Login() {
  const [alert, setAlert] = useState("");
  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const password = passwordRef.current.value;
    const request = await Requests.requestPost(`/login`, {
      username,
      password,
    });
    try {
      const data = await request.json();
      if (data.success) {
        localStorageUser.saveUser(data.data);
        window.location.href = "/ui/?userId=" + data.data.id;
      } else {
        setAlert(data.message);
      }
    } catch (error) {
      setAlert(error.message);
    }
  };
  return (
    <>
      <PageTitle title="Management students, courses." />
      <main>
        <Alert message={alert} setAlert={setAlert} />
        <form onSubmit={handleSubmit} className="cours-form" id="cours-form">
          <h1>login</h1>
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input
              ref={userRef}
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="text"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="form-btns">
            <input type="submit" value="login" />
            <input type="reset" value="Cancel" id="cancel" />
          </div>
        </form>
      </main>
    </>
  );
}
