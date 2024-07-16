import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/HomePageUser.css";
import courselImage1 from "../Assets/images/coursel-image-1.jpg";
import courselImage2 from "../Assets/images/coursel-image-2.png";
import voteIndiaLogo from "../Assets/images/vote-india-logo.jpg";

export default function HomePageUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [voterDetails,setVoterDetails] = useState('');

  const voterId = location.state?.voterId;

  const fetchVoterName = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetch-votername",
        { voterId: voterId }
      );
      if (response.status == 200) {
        setVoterDetails(response.data.data);
      } else if (response.status == 400) {
        alert("Invalid Voter Id...");
      }
    } catch (error) {
      alert("Voter Not Verified...");
    }
  };

  useEffect(() => {
    fetchVoterName();
  }, []);

  const imageSource = [
    courselImage1,
    courselImage2,
    courselImage1, // Example, you can add more images here
  ];

  const changeSlide = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + imageSource.length) % imageSource.length
      );
    } else if (direction === "right") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSource.length);
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleActiveElectionSessions = () => {
    navigate("/active-election-session", { state: { voterId: voterId } });
  };

  return (
    <>
      <section className="home-header-section">
        <header className="home-header">
          <ul>
            <li>
              <div className="home-header-menu-block">
                <i
                  className="fa-solid fa-bars home-menu-icon menuBtn"
                  onClick={toggleMenu}
                ></i>
                <h3 className="home-header-text menuBtn" onClick={toggleMenu}>
                  Menu
                </h3>
              </div>
            </li>
          </ul>
        </header>
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
                <h3>Mr. {voterDetails.voterName}</h3>
              </div>
            </li>
          </ul>
        </nav>
      </section>
      <section className="home-top-coursel">
        <div
          className="home-coursel-div"
          style={{ backgroundImage: `url(${imageSource[currentImageIndex]})` }}
        >
          <div
            className="home-coursel-overlay-sidebar"
            onClick={() => changeSlide("left")}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div className="home-coursel-overlay-middlebar"></div>
          <div
            className="home-coursel-overlay-sidebar"
            onClick={() => changeSlide("right")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </section>
      <section className="home-current-activeEvent-block">
        <button
          onClick={handleActiveElectionSessions}
          className="show-event-btn"
        >
          Active Election Session
        </button>
      </section>
      <section className="home-main-column-section">
        <div className="home-main-column-block">
          <ul>
            <li>
              <a href="">
                <div class="home-info-circle-block">
                  <div class="circle-main-block circle-1">
                    <div class="circle-block c-1">
                      <img src={voteIndiaLogo} alt="" />
                    </div>
                  </div>
                  <p class="circle-block-text">Election</p>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="home-info-circle-block">
                  <div class="circle-main-block circle-2">
                    <div class="circle-block c-2">
                      <img src={courselImage1} alt="" />
                    </div>
                  </div>
                  <p class="circle-block-text">Election</p>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="home-info-circle-block">
                  <div class="circle-main-block circle-3">
                    <div class="circle-block c-3">
                      <img src={courselImage2} alt="" />
                    </div>
                  </div>
                  <p class="circle-block-text">Election</p>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="home-info-circle-block">
                  <div class="circle-main-block circle-4">
                    <div class="circle-block c-4">
                      <img src={voteIndiaLogo} alt="" />
                    </div>
                  </div>
                  <p class="circle-block-text">Election</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section
        id="menuPage"
        className={`menu-overlay-page-${
          menuVisible ? "visible" : "notvisible"
        }`}
      >
        <div
          id="menuExitBtn"
          className="menu-overlay-exit-block"
          onClick={closeMenu}
        >
          <i className="fa fa-times"></i>
        </div>
        <div className="menu-content-block">
          <ul>
            <li>
              <h4>For Voters</h4>
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
              <h4>For Voters</h4>
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
      <section className="homePage-user-imageGallery"></section>
    </>
  );
}
