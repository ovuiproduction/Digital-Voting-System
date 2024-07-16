import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";
import "../css/BallotPaper.css";

export default function BallotPaper() {
  const navigate = useNavigate();
  const location = useLocation();
  const electionFileId = location.state?.electionFileId;
  const voterId = location.state?.voterId;
  const [state, setState] = useState("");
  const [assembly, setAssembly] = useState("");
  const [electedCandidateId, setElectedCandidate] = useState("");
  const [electedCandidateName, setElectedCandidateName] = useState("");
  const [electedCandidateParty, setElectedCandidateParty] = useState("");
  const [electedCandidateIndex, setElectedCandidateIndex] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const onSelectCandidate = () => {
    navigate("/conform-vote", {
      state: {
        state: state,
        assembly: assembly,
        voterId: voterId,
        electionFileId: electionFileId,
        electedCandidateId: electedCandidateId,
        electedCandidateName: electedCandidateName,
        electedCandidateParty: electedCandidateParty,
        electedCandidateIndex: electedCandidateIndex,
      },
    });
  };

  useEffect(() => {
    const fetchBallotPaperEntry = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/fetch-ballot-entry",
          { electionFileId: electionFileId }
        );
        if (response.status === 200) {
          let electionFile = response.data.data;
          if (electionFile) {
            setState(electionFile.state);
            setAssembly(electionFile.assembly);
            setCandidateList(electionFile.ballotPaper);
            console.log(candidateList);
          }
          console.log("data fetch successfully...");
        } else if (response.status === 400) {
          alert("server not responding...");
        }
      } catch (error) {
        alert("Data not saved due to some technical errors\ntry again");
      }
    };

    fetchBallotPaperEntry();
  }, [electionFileId]);

  const handleButtonClick = (
    index,
    selectedCandidateId,
    selectedCandidateName,
    selectedCandidateParty
  ) => {
    setElectedCandidate(selectedCandidateId);
    setElectedCandidateName(selectedCandidateName);
    setElectedCandidateParty(selectedCandidateParty);
    setElectedCandidateIndex(index+1);
    setActiveButton(index);
  };

  return (
    <>
      <header className="ballot-paper-header">
        <ul>
          <li>
            <div className="ballot-paper-header-Logo">
              <img src={ecLogo} alt="EC Logo" />
            </div>
          </li>
          <li>
            <div className="ballot-paper-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="ballot-paper-header-Logo">
              <img src={sjLogo} alt="Party Logo" />
            </div>
          </li>
        </ul>
      </header>
      <nav className="ballot-paper-nav">
        <h3 className="ballot-paper-nav-text">Lok-Shabha Election 2024</h3>
        <p className="ballot-paper-nav-text-p">Maharashtra - Solapur</p>
      </nav>
      <div className="outer-ballot-paper-block">
        <div className="main-ballot-paper-block">
          <div className="ballot-paper">
            <ul>
              {candidateList &&
                candidateList.map((candidate, index) => (
                  <li key={index} data-id={index}>
                    <div className="ballot-paper-entry">
                      <div className="ballot-srno-block">{index + 1}</div>
                      <div className="ballot-name-block">
                        {candidate.candidateName}
                      </div>
                      <div className="ballot-partyName-block">
                        {candidate.candidateParty}
                      </div>
                      <div className="ballot-party-symbol">
                        <img src={sjLogo} alt="Party Logo" />
                      </div>
                    </div>
                    <div className="ballot-paper-control-block">
                      <div className="ballot-indication-block">
                        <div
                          className={`ballot-indication-light ${
                            activeButton === index ? "active" : ""
                          }`}
                        ></div>
                      </div>
                      <div className="ballot-paper-btn-block">
                        <button
                          className="ballot-paper-btn"
                          onClick={() =>
                            handleButtonClick(
                              index,
                              candidate.srno,
                              candidate.candidateName,
                              candidate.candidateParty
                            )
                          }
                        ></button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
         
        </div>
      </div>
      <div className="sumbitbtnfield-ballot">
              <button
                className="submitbtn"
                onClick={onSelectCandidate}
                type="button"
              >
                Submit
              </button>
            </div>
    </>
  );
}
