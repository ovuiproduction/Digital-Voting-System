import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from "chart.js";
import axios from "axios";
import "../css/ElectionResultUserInterface.css";
import ecLogo from "../Assets/images/Election_Commission_of_India_Logo.png";
import sjLogo from "../Assets/images/satyamev-jayate-logo.png";
import StateList from "./StateList";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ElectionResultUserInterface() {

  const navigate = useNavigate();

  const [electionType, setElectionType] = useState("Lok Sabha Elections");
  const [year, setYear] = useState(2024);
  const [electionResult, setElectionResult] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], data: [], percentageData: [] });
  const [totalVoting, setTotalVoting] = useState(0);
  const loadElectionResult = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/voting/result/${electionType}`,
        { electionType: electionType, year: year }
      );
      if (response.status === 200) {
        setElectionResult(response.data.data);
      } else if (response.status === 400) {
        alert("Server not responding...");
      }
    } catch (error) {
      alert("Data not saved due to some technical errors\ntry again");
    }
  };

  useEffect(() => {
    loadElectionResult();
  }, [electionType, year]);

  useEffect(() => {
    if (electionResult.length > 0) {
      const partyCounts = electionResult.reduce((acc, result) => {
        const party = result.electedCandidateParty;
        if (acc[party]) {
          acc[party]++;
        } else {
          acc[party] = 1;
        }
        return acc;
      }, {});
      
      const labels = Object.keys(partyCounts);
      const data = Object.values(partyCounts);
      const percentageData = data.map(count => (count / electionResult.length) * 100);

      setChartData({ labels, data, percentageData });
      setTotalVoting(electionResult.length);
    }
  }, [electionResult]);

  const doughnutData = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        backgroundColor: [
          "#336699",
          "#99CCFF",
          "#999933",
          "#666699",
          "#CC9933",
          "#006666",
          "#3399FF",
          "#993300",
          "#CCCC99",
          "#666666",
        ],
        borderColor: "#D1D6DC",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const label = doughnutData.labels[tooltipItem.dataIndex] || "";
            const value = doughnutData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    maintainAspectRatio: true,
    responsive: true,
  };

  const chartRef = useRef(null);

  useEffect(() => {
    let chart;
    const createChart = () => {
      const ctx = document.getElementById("myChart").getContext("2d");
      chart = new ChartJS(ctx, {
        type: "pie",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Votes",
              data: chartData.percentageData,
              borderWidth: 1,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    };

    if (chartRef.current && chartData.labels.length > 0) {
      createChart();
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData]);

  const [state, setState] = useState("");
  const handleOnSelectState = (selectedState) => {
    setState(selectedState);
    navigate(`/election-result/${selectedState}`,{state:{selectedState}});
  };

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
      <div className="path-block">
        <a href="/home-user">home</a>
        <span>/</span>
        <a href="">Election Results</a>
      </div>
      <div className="result-main-container">
        <div className="result-home-page-election-type-block">
          <a className="result-home-page-active" href="">
            Parliamentary Constituency General
          </a>
          <a href="">State Assembly Constituency General</a>
        </div>
        <div className="result-home-page-container-1">
          <div className="result-home-page-container-1-header">
            <h1>General Parliamentary Elections</h1>
            <div className="result-home-page-container-1-select">
              <StateList onSelectState={handleOnSelectState} />
            </div>
          </div>
          <div className="overview-piechart-block">
            <div className="doughnut-chart-container">
              <Doughnut
                data={doughnutData}
                options={options}
                className="doughnut-chart-1"
              />
              <div className="doughnut-chart-text">
                <div>543 / 543</div>
              </div>
            </div>
          </div>
        </div>
        <div className="result-home-page-container-2">
          <div className="result-home-page-result-block-1">
            <h2>Party Wise Vote Distribution</h2>
            <div className="result-home-piechart-block-1">
              <canvas
                className="canvas-pie-chart"
                id="myChart"
                ref={chartRef}
              ></canvas>
            </div>
          </div>
          <div className="result-home-page-result-block-2">
            <h2>Party Wise Results Status</h2>
            <div className="party-result-table-1">
              <table className="table table-light table-striped custom-table">
                <thead>
                  <tr className="party-result-table-header">
                    <th scope="col">Party</th>
                    <th scope="col">Won</th>
                    <th scope="col">Leading</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">BJP</th>
                    <th scope="row">1</th>
                    <th scope="row">1</th>
                    <th scope="row">1</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="result-page-footer">
        <h2>Election Commission of India</h2>
      </div>
    </>
  );
}








