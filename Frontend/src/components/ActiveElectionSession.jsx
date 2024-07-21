import React, { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import "../css/ActiveElectionSession.css";

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";


export default function ActiveElectionSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const  voterId = location.state?.voterId;
  
  const [activeElectionsList,setActiveElectionsList] = useState([]);
  const [selectedElectionId,setSelectedElectionId] = useState('');

  const onSelectElectionSession = () => {
    if(selectedElectionId!=''){
      navigate("/ballot-paper",{state:{electionFileId:selectedElectionId,voterId:voterId}});
    }
  };

  const activeSession = async () => {
    try{
      const response = await axios.post('http://localhost:5000/active-sessions',{voterId:voterId});
      if(response.status == 200){
        setActiveElectionsList(response.data.data);
        console.log('data fetch successfully...');
      }else if(response.status == 400){
        alert('server not responding...');
      }
    }catch(error){
      alert('Data not saved due to some technical errors\ntry again');
    }
  }

  useEffect(()=>{
    activeSession();
  },[])

  return (
    <>
      <header class="activeSession-header">
        <ul>
          <li>
            <div class="activeSession-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div class="activeSession-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div class="activeSession-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <nav class="activesession-header">
        <ul>
          <li>
            <div class="activesession-header-menu-block">
              <i class="fa-solid fa-bars activesession-menu-icon menuBtn"></i>
              <h3 class="activesession-header-text menuBtn">Menu</h3>
            </div>
          </li>
        </ul>
      </nav>
      <div class="path-block">
        <a href="">home</a>
        <span>/</span>
        <a href="">Active Sessions</a>
      </div>
      <div class="active-sessions-main-block">
        <h3>Active Election Events</h3>
        <form class="active-sessions-form">
          <select value={selectedElectionId} onChange={(e)=>setSelectedElectionId(e.target.value)} class="active-sessions-select" name="" id="">
            <option value="">
              <div class="select-item">Please select one event and proceed</div>
            </option>
            {activeElectionsList && activeElectionsList.map((electionFile,index)=>(
              <option key={index} value={electionFile.electionId}>
              <div class="select-item">{electionFile.type}</div>
            </option>
            ))}
          </select>
          <div class="input-text-field sumbitbtnfield">
            <button onClick={onSelectElectionSession} class="submitbtn" type="button">
              Submit & Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
