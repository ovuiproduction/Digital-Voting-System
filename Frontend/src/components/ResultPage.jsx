import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ResultPage(){
  
    const [electionResult,setElectionResult] = useState([]);

    const loadElectionResult = async () => {
        try {
          const response = await axios.post(
            `http://localhost:5000/voting/result/${electionFileId}`,
            { electionFileId: electionFileId }
          );
          if (response.status == 200) {
            setElectionResult(response.data.data);
            console.log(electionResult);
          } else if (response.status == 400) {
            alert("server not responding...");
          }
        } catch (error) {
          alert("Data not saved due to some technical errors\ntry again");
        }
      }

      useEffect(()=>{
        loadElectionResult();
      },[])

    return(
        <>
        <p></p>
        </>
    )
}