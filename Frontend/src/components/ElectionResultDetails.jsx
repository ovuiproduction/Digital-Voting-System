import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";

export default function ElectionResultDetails() {
  const location = useLocation();
  const [state, setState] = useState("");
 
  useEffect(() => {
    console.log(location.state);
    if(location.state){
      setState(location.state.state);
    }
  }, [location.state]);

  return (
    <>
      <header className="activeSession-header">
        <ul>
          <li>
            <div className="activeSession-header-Logo">
              <img src={ecLogo} alt="" />
            </div>
          </li>
          <li>
            <div className="activeSession-header-text">
              <h1>Election Commission Of India</h1>
            </div>
          </li>
          <li>
            <div className="activeSession-header-Logo">
              <img src={sjLogo} alt="" />
            </div>
          </li>
        </ul>
      </header>
      <nav className="activesession-header">
        <ul>
          <li>
            <div className="activesession-header-menu-block">
              <i className="fa-solid fa-bars activesession-menu-icon menuBtn"></i>
              <h3 className="activesession-header-text menuBtn">Menu</h3>
            </div>
          </li>
        </ul>
      </nav>
      <h1>{state}</h1>
    </>
  );
}
