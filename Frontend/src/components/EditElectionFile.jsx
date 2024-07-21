import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../css/EditElectionFile.css";

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

export default function EditElectionFile() {
  const location = useLocation();
  const navigate = useNavigate();

  const electionFileId = location.state?.electionFileId;
  const adminId = location.state?.adminId;
  const electionId = location.state?.electionId;
  const [addCandidateForm,setAddCandidateForm] = useState(false);
  const [electionFile, setElectionFile] = useState(null);
  let [type, setType] = useState("");
  let [description, setElectionDescription] = useState("");
  let [state, setElectionState] = useState("");
  let [assembly, setElectionAssembly] = useState("");
  let [startDate, setElectionStartDate] = useState("");
  let [startTime, setElectionStartTime] = useState("");
  let [endDate, setElectionEndDate] = useState("");
  let [endTime, setElectionEndTime] = useState("");
  let [ballotPaper, setBallotPaper] = useState([]);
  let [eventCreationStatus,setEventCreationStatus] = useState("");
  let [status,setStatus] = useState("");

  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const [labelClass, setLabelClass] = useState(
    "election-stage-3-label-input-voterid-before"
  );

  const handleFocus = () => {
    setLabelClass("election-stage-3-label-input-voterid-after");
  };

  const handleBlur = () => {
    if (!candidateName) {
      setLabelClass("election-stage-3-label-input-voterid-before");
    }
  };

  const handleElectionFileEdit = async () => {
    try {

      const response = await axios.post(
        `http://localhost:5000/election-file/edit`,
        { electionFileId: electionFileId,
          electionId: electionId,
          type:type,
          description:description,
          state:state,
          assembly:assembly,
          startDate:startDate,
          startTime:startTime,
          endDate:endDate,
          endTime:endTime,
          ballotPaper:ballotPaper,
          eventCreationStatus:eventCreationStatus,
          adminId:adminId
         }
      );
      if (response.status === 200) {
        alert("Edit Election successfully...");
        console.log("Election File Edited successfully...");
        navigate("/home-admin", { state: { adminId: adminId } });
      } else if (response.status === 400) {
        alert("server not responding...");
      }
    } catch (error) {
      console.log(error);
      alert("Data not saved due to some technical errors\ntry again");
    }
  };

  const handleInputChange = (index, field, value) => {
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
      const newBallotPaper = [...ballotPaper];
      newBallotPaper[index][field] = value;
      setBallotPaper(newBallotPaper);
    }
  };

  const handleRemoveCandidate = (index)=>{
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
    const newBallotPaper = [...ballotPaper];
    newBallotPaper.splice(index, 1);
    setBallotPaper(newBallotPaper);
    }
  }

  const handleInsertCandidate = ()=>{
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
    setAddCandidateForm(true);
    }
  }

  const handleChangeStartDate = (date)=>{
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
    setElectionStartDate(date);
    }
  }

  const handleChangeState = (state)=>{
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
    setElectionState(state);
    }
  }

  const handleChangeAssembly = (assembly)=>{
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
    setElectionAssembly(assembly);
    }
  }

  const handleChangeStartTime = (time)=>{
    if(status == "active"){
      alert("Not Allow For Edit");
    }else{
    setElectionStartTime(time);
    }
  }

  const handleCandidateAdd = ()=>{
    const newCandidate = {
      srno: Date.now(),
      candidateName: candidateName,
      candidateParty: candidateParty,
    };
    const newBallotPaper = [...ballotPaper];
    newBallotPaper.push(newCandidate);
    setBallotPaper(newBallotPaper);
    alert('Are you sure to add');
    alert('candidate addedd successfully...');
    setCandidateName('');
    setCandidateParty('');
    setTimeout(()=>{
      setAddCandidateForm(false);
    },[500]);
  }

  const handleElectionFileEditCancel = () => {
    navigate("/home-admin", { state: { adminId: adminId } });
  };

  const loadElectionFile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/election-file/state-4/load-file",
        { electionFileId: electionFileId }
      );
      if (response.status === 200) {
         setElectionFile(response.data.data);
        console.log("Election File successfully loaded...");
      } else if (response.status === 400) {
        alert("server not responding...");
      }
    } catch (error) {
      alert("Data not saved due to some technical errors\ntry again");
    }
  };

  useEffect(() => {
    loadElectionFile();
  }, [electionFileId]);

  useEffect(()=>{
    if (electionFile) {
      setType(electionFile.type);
      setElectionDescription(electionFile.description);
      setElectionState(electionFile.state);
      setElectionAssembly(electionFile.assembly);
      setElectionStartDate(electionFile.startDate);
      setElectionStartTime(electionFile.startTime);
      setElectionEndDate(electionFile.endDate);
      setElectionEndTime(electionFile.endTime);
      setBallotPaper(electionFile.ballotPaper);
      setEventCreationStatus(electionFile.eventCreationStatus);
      setStatus(electionFile.status);
    }
  },[electionFile]);

  return (
    <div>
      <header className="election-file-edit-header">
        <ul>
          <li>
            <div className="election-file-edit-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div className="election-file-edit-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="election-file-edit-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <nav className="election-file-edit-nav">
        <ul>
          <li>
            <div className="election-file-edit-menu-block">
              <i className="fa-solid fa-bars election-file-edit-menu-icon menuBtn"></i>
              <h3 className="election-file-edit-nav-text menuBtn">Menu</h3>
            </div>
          </li>
        </ul>
      </nav>
      {electionFile && (
        <div className="election-file-edit-main-block">
          <div className="election-file-edit-type-block">
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="election-file-edit-type"
              type="text"
            />
          </div>
          <div className="election-file-edit-review-main-block">
            <div className="election-file-edit-status">
              <h3 className="election-file-edit-action-status status-ele">
                {electionFile.status}
              </h3>
              <h3 className="election-file-edit-completion-status status-ele">
                {electionFile.eventCreationStatus}
              </h3>
            </div>
            <div className="election-file-edit-description">
              <textarea
                value={description}
                onChange={(e) => setElectionDescription(e.target.value)}
                name=""
                id=""
              ></textarea>
            </div>
            <div className="election-file-edit-location-block">
              <h3 className="election-file-edit-location-state">
                State :{" "}
                <span>
                  <select
                    className="Edit-input"
                    value={state}
                    onChange={(e)=>handleChangeState(e.target.value)}
                    name=""
                    id=""
                  >
                    <option value="">Please Select state</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </span>
              </h3>
              <h3 className="election-file-edit-location-assembly">
                Constituent Assembly :{" "}
                <span>
                  <select
                    className="Edit-input"
                    value={assembly}
                    onChange={(e) => handleChangeAssembly(e.target.value)}
                    name=""
                    id=""
                  >
                    <option value="">Please Select state</option>
                    <option value="Madha">Madha</option>
                    <option value="Solapur">Solapur</option>
                  </select>
                </span>
              </h3>
            </div>
            <div className="election-file-edit-period-block">
              <h3 className="election-file-edit-startDateTime">
                Start Date & Time :
                <input
                  className="Edit-input"
                  value={startDate}
                  onChange={(e) => handleChangeStartDate(e.target.value)}
                  type="date"
                />
                <input
                  className="Edit-input"
                  value={startTime}
                  onChange={(e) => handleChangeStartTime(e.target.value)}
                  type="time"
                />
              </h3>
              <i className="fa-solid fa-arrow-right-long"></i>
              <h3 className="election-file-edit-endDateTime">
                End Date & Time :
                <input
                  className="Edit-input"
                  value={endDate}
                  onChange={(e) => setElectionEndDate(e.target.value)}
                  type="date"
                />
                <input
                  className="Edit-input"
                  value={endTime}
                  onChange={(e) => setElectionEndTime(e.target.value)}
                  type="time"
                />
              </h3>
            </div>
            <div className="election-file-edit-ballot-paper">
              <h1 className="election-file-edit-ballot-paper-type">
                Ballot Paper <span><button onClick={handleInsertCandidate} className="edit-ballot-add-candidatebtn">Add</button></span>
              </h1>
              <ul>
                {ballotPaper &&
                  ballotPaper.map((candidate, index) => (
                    <li key={index} className="election-file-edit-ballotEntry">
                     
                        <input
                          className="Edit-input-ballot"
                          value={candidate.candidateName}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "candidateName",
                              e.target.value
                            )
                          }
                          type="text"
                        />
                     
                     
                        <input
                          className="Edit-input-ballot"
                          value={candidate.candidateParty}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "candidateParty",
                              e.target.value
                            )
                          }
                          type="text"
                        />
                     
                      <img
                        src={`http://localhost:5000/uploads/${candidate.candidatePartySymbol}`}
                        alt="Party Symbol"
                      />
                      <button onClick={()=>handleRemoveCandidate(index)} className="edit-ballot-remove-candidatebtn">Remove</button>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="election-file-edit-audit-block">
              <h3 className="election-file-edit-startDateTime">
                Created At :{" "}
              </h3>
              <h3>{electionFile.createdAt}</h3>
              <h3 className="election-file-edit-endDateTime">Updated At : </h3>
              <h3>{electionFile.updatedAt}</h3>
            </div>

            <div className="election-file-edit-submit-block">
              <button
                onClick={handleElectionFileEditCancel}
                className="election-file-edit-btn"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleElectionFileEdit}
                className="election-file-edit-submit-btn"
                type="button"
              >
                Edit Election File
              </button>
            </div>
          </div>
        </div>
      )}

      {addCandidateForm && 
          <div className="edit-election-addCandidate-block">
         <form className="edit-election-voter-details-form">
         <div className="election-stage-3-input-text-field">
           <div className="election-stage-3-input-block-1">
             <label
               id="loginLabelVoterID"
               className={labelClass}
               htmlFor="loginInputVoterId"
             >
               Enter Candidate Name
             </label>
             <br />
             <input
               className="election-stage-3-input-voterid"
               id="loginInputVoterId"
               name="voterid"
               placeholder=""
               type="text"
               value={candidateName}
               onChange={(e) => setCandidateName(e.target.value)}
               onFocus={handleFocus}
               onBlur={handleBlur}
             />
           </div>
         </div>
         <div className="election-stage-3-custom-select-wrapper">
           <select
             className="election-stage-3-voter-details-form-select"
             value={candidateParty}
             onChange={(e) => setCandidateParty(e.target.value)}
           >
             <option value="">Please select party</option>
             <option value="BJP">BJP</option>
             <option value="Congress">Congress</option>
           </select>
         </div>
         <div className="election-stage-3-input-text-field election-stage-3-sumbitbtnfield">
           <button
             onClick={handleCandidateAdd}
             className="election-stage-3-submitbtn"
             type="button"
           >
             Add
           </button>
         </div>
       </form>
       </div>
      }
    </div>
  );
}
