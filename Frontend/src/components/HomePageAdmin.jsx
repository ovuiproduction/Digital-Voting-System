import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "../css/HomePageAdmin.css";

import voteIndiaLogo from "../Assets/images/vote-india-logo.jpg";

export default function HomePageAdmin() {

  const navigate = useNavigate();
  const location = useLocation();

  const [electionFiles, setElectionFiles] = useState([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);

  const adminId = location.state?.adminId;
  const [adminName,setAdminName] = useState('');

  const fetchAdminDetails = async()=>{
    try {
      const response = await axios.post(
        "http://localhost:5000/fetch-admin-details",{adminId:adminId}
      );
      if (response.status === 200) {
        const admin = response.data.data;
        setAdminName(admin.adminName);
        console.log("Election files listed successfully...");
      } else if (response.status === 400) {
        alert("Server not responding...");
      }
    } catch (error) {
      alert("Data not fetched due to some technical errors\ntry again");
    }
  }

  const initiateElection = () => {
    navigate("/election-file/stage-1",{state:{adminId:adminId}});
  };

  const electionFileList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/home-electionFileList",{adminId:adminId}
      );
      if (response.status === 200) {
        setElectionFiles(response.data.data);
        console.log("Election files listed successfully...");
      } else if (response.status === 400) {
        alert("Server not responding...");
      }
    } catch (error) {
      alert("Data not fetched due to some technical errors\ntry again");
    }
  };

  useEffect(() => {
    electionFileList();
    fetchAdminDetails();
  }, []);

  const displayOptions = (index) => {
    setActiveOptionIndex(activeOptionIndex === index ? null : index);
  };

  const navigateElectionFileActive = async (electionFileId,electionId) => {
   navigate('/review-and-active',{state:{adminId:adminId,electionFileId:electionFileId,electionId:electionId}});
  };

  const navigateElectionFileEdit = async (electionFileId,electionId) => {
    navigate('/edit-election-file',{state:{adminId:adminId,electionFileId:electionFileId,electionId:electionId}});
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
      <section id="menuPage" className="menu-overlay-page">
        <div id="menuExitBtn" className="menu-overlay-exit-block">
          <i className="fa fa-times"></i>
        </div>
        <div className="menu-content-block">
          <ul>
            <li>
              <h4>For Votors</h4>
              <div className="menu-content-list">
                <ul>
                  <li>
                    <a href="">menu-1</a>
                  </li>
                  <li>
                    <a href="">menu-2</a>
                  </li>
                  <li>
                    <a href="">menu-3</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="menu-content-list">
                <ul>
                  <li>
                    <a href="">menu-1</a>
                  </li>
                  <li>
                    <a href="">menu-2</a>
                  </li>
                  <li>
                    <a href="">menu-3</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h4>For Votors</h4>
              <div className="menu-content-list">
                <ul>
                  <li>
                    <a href="">menu-1</a>
                  </li>
                  <li>
                    <a href="">menu-2</a>
                  </li>
                  <li>
                    <a href="">menu-3</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="menu-content-list">
                <ul>
                  <li>
                    <a href="">menu-1</a>
                  </li>
                  <li>
                    <a href="">menu-2</a>
                  </li>
                  <li>
                    <a href="">menu-3</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="home-navbar-section">
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
                <h3>{adminName}</h3>
              </div>
            </li>
          </ul>
        </nav>
      </section>
      <div className="admin-control-header-2">
        <div className="new-project-block">
          <button onClick={initiateElection} className="new-project-btn">
            Initiate Election
          </button>
        </div>
      </div>

      <div className="control-option-block">
        <ul>
          <li>
            <button className="active">Election Events</button>
          </li>
          <li>
            <button>Election Events</button>
          </li>
          <li>
            <button>Election Events</button>
          </li>
          <li>
            <button>Election Events</button>
          </li>
        </ul>
      </div>
      <div className="admin-home-content-block">
        {electionFiles &&
          electionFiles.map((electionFile, index) => (
            <div key={index} className="election-tile-block">
              <div className="election-event-tile-header election-tile-block-elediv">
                <h2>Digital Voting System</h2>
                <i
                  onClick={() => displayOptions(index)}
                  className="fa-solid fa-ellipsis-vertical"
                ></i>
                <div
                  className={
                    activeOptionIndex === index
                      ? "admin-home-option-visible"
                      : "admin-home-option-hide"
                  }
                >
                  <ul>
                    <li>
                      <button onClick={() =>
                          navigateElectionFileEdit(electionFile._id,electionFile.electionId)
                        }>Edit</button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          navigateElectionFileActive(electionFile._id,electionFile.electionId)
                        }
                      >
                        Active
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="election-tile-content election-tile-block-elediv">
                <h2 className="election-event-name">{electionFile.title}</h2>
                <p>{electionFile.eventCreationStatus}</p>
                <p>{electionFile.status}</p>
              </div>
              <div className="election-event-date election-tile-block-elediv">
                <p>Start</p>
                <p>
                  {electionFile.startDate} T {electionFile.startTime}
                </p>
                <p>End</p>
                <p>
                  {electionFile.endDate} T {electionFile.endTime}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
