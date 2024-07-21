import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../css/ReviewElectionFileActive.css";

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

export default function ReviewElectionFileActive() {

  const location = useLocation();
  const navigate = useNavigate();

  const [electionFile, setElectionFile] = useState("");

  const electionFileId = location.state?.electionFileId;
  const adminId = location.state?.adminId;
  const electionId = location.state?.electionId;

  const [startDate,setStartDate] = useState('');
  const [startTime,setStartTime] = useState('');
  const [endDate,setEndDate] = useState('');
  const [endTime,setEndTime] = useState('');

  const date = new Date();
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  let year = date.getFullYear();
  const currentDate = `${year}-${month}-${day}`;

  let h = String(date.getHours()).padStart(2, '0');
  let min = String(date.getMinutes()).padStart(2, '0');
  const currentTime = `${h}:${min}`;

  useEffect(()=>{
    setStartDate(currentDate);
    setStartTime(currentTime);
  },[])


  const handleElectionFileActive = async () => {
    if (endDate === '' || endTime === '') {
      alert('Please fill in both end date and time.');
    } else {
      try {
        const response = await axios.post(
          `http://localhost:5000/election-file/active/${electionFileId}`,
          { 
            electionFileId: electionFileId,
            electionId: electionId,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime 
          }
        );
        if (response.status === 200) {
          alert('Active Election successfully...');
          console.log("Election File successfully loaded...");
          navigate('/home-admin', { state: { adminId: adminId } });
        } else if (response.status === 400) {
          alert("Server not responding...");
        }
      } catch (error) {
        alert("Data not saved due to some technical errors\ntry again");
      }
    }
  };
  

  const loadElectionFile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/election-file/state-4/load-file",
        { electionFileId: electionFileId }
      );
      if (response.status == 200) {
        setElectionFile(response.data.data);
        console.log("Election File successfully loaded...");
      } else if (response.status == 400) {
        alert("server not responding...");
      }
    } catch (error) {
      alert("Data not saved due to some technical errors\ntry again");
    }
  }

  useEffect(()=>{
    loadElectionFile();
  },[]);
  
  return (
    <div>
      <header className="election-file-stage-4-header">
        <ul>
          <li>
            <div className="election-file-stage-4-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div className="election-file-stage-4-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="election-file-stage-4-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <nav className="election-file-stage-4-nav">
        <ul>
          <li>
            <div className="election-file-stage-4-menu-block">
              <i className="fa-solid fa-bars election-file-stage-4-menu-icon menuBtn"></i>
              <h3 className="election-file-stage-4-nav-text menuBtn">Menu</h3>
            </div>
          </li>
        </ul>
      </nav>
      {electionFile && (
        <div className="election-file-stage-4-main-block">
          <h3 className="election-file-title">{electionFile.title}</h3>
          <div className="election-file-review-main-block">
            <div className="election-file-status">
              <h3 className="election-file-action-status status-ele">
                {electionFile.status}
              </h3>
              <h3 className="election-file-completion-status status-ele">
                {electionFile.eventCreationStatus}
              </h3>
            </div>
            <div className="election-file-discription">
              <p>{electionFile.description}</p>
            </div>
            <div className="election-file-location-block">
              <h3 className="election-file-location-state">
                State : <span>{electionFile.state}</span>
              </h3>
              <h3 className="election-file-location-assembly">
                Constituent Assembly : <span>{electionFile.assembly}</span>
              </h3>
            </div>
            <div className="election-file-period-block">
              <h3 className="election-file-startDateTime">
                Start Date & Time : 
                <span>
                  {electionFile.startDate} {electionFile.startTime}
                </span>
              </h3>
              <i class="fa-solid fa-arrow-right-long"></i>
              <h3 className="election-file-endDateTime">
                End Date & Time : 
                <span>
                  {electionFile.endDate} {electionFile.endTime}{" "}
                </span>
              </h3>
            </div>
            <p className="tag-period-block">* new start date and time is current date and time set end time and proceed for active election.</p>
            <div className="election-file-period-block">
              <h3 className="election-file-startDateTime">
                New Start Date & Time : 
                <input
                  className="Edit-input"
                  value={currentDate}
                  type="date"
                  required
                />
                <input
                  className="Edit-input"
                  value={currentTime}
                  type="time"
                  required
                />
              </h3>
              <i class="fa-solid fa-arrow-right-long"></i>
              <h3 className="election-file-endDateTime">
                New End Date & Time : 
                <input
                  className="Edit-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  required
                />
                <input
                  className="Edit-input"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  required
                />
              </h3>
            </div>
            <div className="election-file-ballot-paper">
              <h1 className="election-file-ballot-paper-title">Ballot Paper</h1>
              <ul>
                {electionFile.ballotPaper &&
                  electionFile.ballotPaper.map((candidate, index) => (
                    <li key={index} className="election-file-ballotEntry">
                      <h3>{index + 1}</h3>
                      <h3>{candidate.candidateName}</h3>
                      <h3>{candidate.candidateParty}</h3>
                      <img src={sjLogo} alt="" />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="election-file-audit-block">
              <h3 className="election-file-startDateTime">Created At : </h3>
              <h3>{electionFile.createdAt}</h3>
              <h3 className="election-file-endDateTime">Updated At : </h3>
              <h3>{electionFile.updatedAt}</h3>
            </div>

            <div className="election-file-submit-block">
              <button
                onClick={handleElectionFileActive}
                className="election-file-submit-btn"
                type="button"
              >
                Active Election
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


