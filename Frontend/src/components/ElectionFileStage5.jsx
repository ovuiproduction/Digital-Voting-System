import React, { useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import '../css/ElectionFileStage4.css';

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

export default function ElectionFileStage5(){

    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState('');
    const [assembly, setAssembly] = useState('');

    const [adminId,setAdminId] = useState("");
    const [electionFileId,setElectionFileId] = useState("");
   
    useEffect(() => {
        if (location.state?.adminId && location.state?.electionFileId) {
          setElectionFileId(location.state?.electionFileId);
          setAdminId(location.state.adminId);
        }
      }, [location.state?.adminId,location.state?.electionFileId]);
  

    const handleElectionInvitation = async()=>{
        try {
            const response = await axios.post(
            "http://localhost:5000/election-file/stage-5/election-invitation",
            { state,assembly }
            );
            if (response.status == 200) {
                alert('Invitation sent successfully...');
                setTimeout(() => {
                    navigate('/home-admin',{state:{adminId:adminId}});
                }, 2000);
            } else if (response.status == 400) {
            alert("server not responding...");
            }
        } catch (error) {
            alert("Data not saved due to some technical errors\ntry again");
        }
    };

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
            <div className="election-file-stage-4-main-block">
                <h3 className="election-file-title">
                    Loksabha Election 2024
                </h3>
                <form className="election-file-stage-4-form" action="/voter-details" method="post">
                    <select
                        className="election-file-stage-4-form-select"
                        value={state}
                        onChange={(e)=>setState(e.target.value)}
                    >
                        <option value="">Please select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                    </select>
                    <select
                        className="election-file-stage-4-form-select"
                        value={assembly}
                        onChange={(e)=>setAssembly(e.target.value)}
                    >
                        <option value="">Please select your Assembly assembly</option>
                        <option value="Madha">Madha</option>
                        <option value="Solapur">Solapur</option>
                    </select>
                    <div className="election-file-stage-4-sumbitbtnfield">
                        <button onClick={handleElectionInvitation} className="election-file-stage-4-submitbtn" type="button">Send Invitation to Voters</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
