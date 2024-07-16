import React from "react";
import "../css/VoteSuccessPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

export default function VoteSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const voterId = location.state?.voterId;
  const electedCandidateIndex = location.state?.electedCandidateIndex;
  const electedCandidateName = location.state?.electedCandidateName;
  const electedCandidateParty = location.state?.electedCandidateParty;

  const handleGoHomeBack = ()=>{
    navigate('/home',{state:{voterId:voterId}});
  }

  return (
    <>
      <header className="login-header">
        <ul>
          <li>
            <div className="login-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div className="login-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="login-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <h1 className="success-header">Voting Successful</h1>
      <div className="conformation-outer-block">
        <div className="selected-member-block">
          <div className="select-member-srno">
            <h2>{electedCandidateIndex}</h2>
          </div>
          <div className="select-member-name ">
            <h2>{electedCandidateName}</h2>
          </div>
          <div className="select-member-party ">
            <h2>{electedCandidateParty}</h2>
          </div>
          <div className="select-member-party-symbol">
            <img src={sjLogo} alt="" />
          </div>
          <div className="select-icon">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
      </div>
      <h1 className="success-header success-footer">Vote For India</h1>
      <div className="vote-success-goHomeBtn"><button onClick={handleGoHomeBack}>Return Home</button></div>
    </>
  );
}
