import React, { useState, useRef, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";

import "../css/ElectionFileStage2.css";

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

import StateList from "./StateList";
import AssemblyList from "./AssemblyList";

export default function ElectionFileStage2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminId,setAdminId] = useState("");
  const [electionFileId,setElectionFileId] = useState("");
 
  useEffect(() => {
    if (location.state?.adminId && location.state?.electionFileId) {
      setElectionFileId(location.state?.electionFileId);
      setAdminId(location.state.adminId);
    }
  }, [location.state?.adminId,location.state?.electionFileId]);

  const [state, setState] = useState("");
  const [assembly, setAssembly] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  // const customSelectWrapperRef = useRef(null);
  // const startTimeRef = useRef(null);
  // const endTimeRef = useRef(null);
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       customSelectWrapperRef.current &&
  //       !customSelectWrapperRef.current.contains(event.target)
  //     ) {
  //       setIsSelectOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleElectionFileStage2Completion = async() => {
    try{
      if(electionFileId && state && assembly && startDateTime && endDateTime){
      const response = await axios.post('http://localhost:5000/election-file/stage-2',{electionFileId,state:state,assembly:assembly,startDateTime:startDateTime,endDateTime:endDateTime});
      if(response.status == 200){
        alert('data saved successfully...');
        navigate('/election-file/stage-3',{state:{electionFileId:electionFileId,adminId:adminId}});
      }else if(response.status == 400){
        alert('server not responding...');
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
      <header className="election-stage-2-voter-details-header">
        <ul>
          <li>
            <div className="election-stage-2-voter-details-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div className="election-stage-2-voter-details-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="election-stage-2-voter-details-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <nav className="election-stage-2-voter-details-nav">
        <ul>
          <li>
            <div className="election-stage-2-voter-details-menu-block">
              <i className="fa-solid fa-bars election-stage-2-voter-details-menu-icon menuBtn"></i>
              <h3 className="election-stage-2-voter-details-nav-text menuBtn">
                Menu
              </h3>
            </div>
          </li>
        </ul>
      </nav>
      <div className="election-stage-2-voter-details-main-block">
        <h3>Loksabha Election 2024</h3>
        <form
          className="election-stage-2-voter-details-form"
        >
          <StateList onSelectState={(state)=>setState(state)} />
          {state && <AssemblyList state={state} onSelectAssembly={(assembly)=>setAssembly(assembly)} />}
          <div className="election-stage-2-input-text-field">
            <p className="election-stage-2-input-date-time-header">
              Date & Time
            </p>
            <div className="election-stage-2-datetime-input-block">
              <p>Start</p>
              <input
                aria-placeholder="start time"
                className="election-stage-2-input-voterid"
                placeholder=""
                type="datetime-local"
                onFocus={() => setStartTimeFocused(true)}
                onBlur={() => setStartTimeFocused(false)}
                ref={startTimeRef}
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
              <p>End</p>
              <input
                aria-placeholder="end time"
                className="election-stage-2-input-voterid"
                placeholder=""
                type="datetime-local"
                onFocus={() => setEndTimeFocused(true)}
                onBlur={() => setEndTimeFocused(false)}
                ref={endTimeRef}
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
              />
            </div>
          </div>
          <div className="election-stage-2-input-text-field election-stage-2-sumbitbtnfield">
            <button onClick={handleElectionFileStage2Completion} className="election-stage-2-submitbtn" type="button">
              Submit & Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
