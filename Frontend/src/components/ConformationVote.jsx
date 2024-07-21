import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/ConformationVote.css";
import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

export default function ConformationVote() {
  const navigate = useNavigate();
  const location = useLocation();
  const voterId = location.state?.voterId;
  const electionFileId = location.state?.electionFileId;
  const electedCandidateId = location.state?.electedCandidateId;
  const electedCandidateName = location.state?.electedCandidateName;
  const electedCandidateParty = location.state?.electedCandidateParty;
  const electedCandidateIndex = location.state?.electedCandidateIndex;
  const state = location.state?.state;
  const assembly = location.state?.assembly;
  const electionType = location.state?.electionType;

  const handleVoteCancel = () => {
    navigate("/ballot-paper", {
      state: { voterId: voterId, electionFileId: electionFileId },
    });
  };
  const handleVoteConformed = async () => {
    try {
      alert("Are you conform");
      const response = await axios.post(
        `http://localhost:5000/vote/${voterId}/${electionFileId}`,
        {
          electionType:electionType,
          state: state,
          assembly: assembly,
          electionFileId: electionFileId,
          voterId: voterId,
          electedCandidateId: electedCandidateId,
          electedCandidateName: electedCandidateName,
          electedCandidateParty: electedCandidateParty,
        }
      );
      if (response.status === 200) {
        console.log(response.data.data);
        alert("Voting successfully...");
        console.log("data save successfully...");
        navigate("/vote-conformed", {
          state: {
            voterId:voterId,
            electedCandidateIndex: electedCandidateIndex,
            electedCandidateName: electedCandidateName,
            electedCandidateParty: electedCandidateParty,
          },
        });
      } else if (response.status === 400) {
        alert("server not responding...");
      }
    } catch (error) {
      alert("Data not saved due to some technical errors\ntry again");
    }
  };
  return (
    <>
      <header class="login-header">
        <ul>
          <li>
            <div class="login-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div class="login-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div class="login-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <div class="conformation-outer-block">
        <div class="conform-vote-selected-member-block">
          <div class="conform-vote-select-member-srno">
            <h2>{electedCandidateIndex}</h2>
          </div>
          <div class="conform-vote-select-member-name ">
            <h2>{electedCandidateName}</h2>
          </div>
          <div class="conform-vote-select-member-party ">
            <h2>{electedCandidateParty}</h2>
          </div>
          <div class="conform-vote-select-member-party-symbol">
            <img src={sjLogo} alt="" />
          </div>
          <div class="conform-vote-select-icon">
            <i class="fa-solid fa-check"></i>
          </div>
        </div>
      </div>
      <div class="conformation-control-block">
        <button onClick={handleVoteCancel}>Cancel</button>
        <button onClick={handleVoteConformed}>Conform</button>
      </div>
    </>
  );
}
