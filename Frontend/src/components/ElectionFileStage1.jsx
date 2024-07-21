import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/ElectionFileStage1.css";
import voteIndiaLogo from "../Assets/images/vote-india-logo.jpg";

export default function ElectionFileStage1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVoterIdFocused, setIsVoterIdFocused] = useState(false);
  const [isDiscription, setIsDiscription] = useState(false);
  const voterIdRef = useRef(null);
  const discriptionRef = useRef(null);
  const [adminId,setAdminId] = useState("");

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (location.state?.adminId) {
      setAdminId(location.state.adminId);
    }
  }, [location.state?.adminId]);

  const handleElectionFileStage1Completion = async() => {
    try{
     if(type && description && adminId){
        const response = await axios.post('http://localhost:5000/election-file/stage-1',{type:type,description:description});
        if(response.status == 200){
          const electionFileId = response.data.data;
          alert('Data saved successfully..');
          navigate('/election-file/stage-2',{state:{electionFileId:electionFileId,adminid:adminId}});
        }else if(response.status == 400){
          alert('Backend error');
        }
      }else{
        alert("Fill all the Details");
      }
    }catch(error){
      alert('Data not saved due to some technical errors\ntry again');
    }
  };

  return (
    <>
      <section className="home-header-section">
        <header className="home-header">
          <ul>
            <li>
              <div className="home-header-menu-block">
                <i className="fa-solid fa-bars home-menu-icon menuBtn"></i>
                <h3 className="home-header-text menuBtn">Menu</h3>
              </div>
            </li>
          </ul>
        </header>
      </section>
      <section className="election-stage-1-home-navbar-section">
        <nav className="home-navbar">
          <ul>
            <li>
              <div className="home-navbar-left-block">
                <img src={voteIndiaLogo} alt="" />
                <div className="home-logo-text-block">
                  <h3>Digital Voting System</h3>
                  <p>Election Commission of India</p>
                </div>
              </div>
            </li>
            <li>
              <div className="home-profile-block">
                <i className="fa-solid fa-user"></i>
                <h3>Mr. Onkar</h3>
              </div>
            </li>
          </ul>
        </nav>
      </section>
      <div className="login-formdiv">
        <form
          className="election-stage-2-voter-details-form"
        >
          <div className="election-stage-1-custom-select-wrapper">
            <select
              className="election-stage-1-voter-details-form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Please select election type</option>
              <option value="Lok Sabha Elections">Lok Sabha Elections</option>
              <option value="State Assembly Elections">State Assembly Elections</option>
            </select>
          </div>

          <div className="input-text-field">
            <div className="input-block-1">
              <label
                id="loginLabelPassword"
                className={
                  isDiscription || discriptionRef.current?.value
                    ? "label-input-efs1-after"
                    : "label-input-short-discription-before"
                }
                htmlFor="loginInputPassword"
              >
                Short Description
              </label>
              <textarea
                className="input-short-discription"
                id="loginInputPassword"
                name="discriptionOfProject"
                placeholder=""
                onFocus={() => setIsDiscription(true)}
                onBlur={() => setIsDiscription(false)}
                ref={discriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="input-text-field efs1-sumbitbtnfield">
            <button onClick={handleElectionFileStage1Completion} className="efs1-submitbtn" type="button">
              Submit & Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
