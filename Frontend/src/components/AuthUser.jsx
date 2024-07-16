import React, { useState } from "react";
import "../css/AuthUser.css";
import SignupForm from "../partials/SignupForm";
import LoginForm from "../partials/LoginForm";
import AuthUserFAQ from "../partials/AuthUserFAQ";

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";
import voteIndiaLogo from "../Assets/images/vote-india-logo.jpg";

export default function AuthUser() {
  const [activeForm, setActiveForm] = useState("login");

  function handleFormChange(e) {
    setActiveForm(e.target.value);
  }

  return (
    <>
      <header className="login-header">
        <ul>
          <li>
            <div className="login-header-Logo">
              <img src={ecLogo} alt="Election Commission of India Logo" />
            </div>
          </li>
          <li>
            <div className="login-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="login-header-Logo">
              <img src={sjLogo} alt="Satyamev Jayate Logo" />
            </div>
          </li>
        </ul>
      </header>
      <nav className="login-nav">
        <ul>
          <li>
            <div className="login-nav-leftBlock">
              <img src={voteIndiaLogo} alt="Vote India Logo" />
              <p>Digital Voting System</p>
            </div>
          </li>
          <li>
            <div className="login-nav-rightBlock"></div>
          </li>
        </ul>
      </nav>
      <section className="login-mainSection">
        <section className="login-block">
          <h2 className="login-block-header">Login or Signup</h2>
          <div className="login-sigup-checkBlock">
            <div className="login-sigup-mainCheckBlock">
              <div
                id="loginActive"
                className={`radiobtn ${activeForm === "login" ? "active" : ""}`}
              >
                <input
                  className="radioinput"
                  type="radio"
                  id="loginbtn"
                  name="login-sigup-check"
                  value="login"
                  checked={activeForm === "login"}
                  onChange={handleFormChange}
                />
                <label htmlFor="loginbtn">Login</label>
              </div>
              <div
                id="signupActive"
                className={`radiobtn ${
                  activeForm === "signup" ? "active" : ""
                }`}
              >
                <input
                  className="radioinput"
                  type="radio"
                  id="signupbtn"
                  name="login-sigup-check"
                  value="signup"
                  checked={activeForm === "signup"}
                  onChange={handleFormChange}
                />
                <label htmlFor="signupbtn">Signup</label>
              </div>
            </div>
          </div>
          <div id="formBlock" className="user-login-formdiv">
            {activeForm === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </section>
        <AuthUserFAQ />
      </section>
    </>
  );
}
