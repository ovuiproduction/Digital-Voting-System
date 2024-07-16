import React, { useState } from "react";
import "../css/AuthUser.css";

export default function AuthUserFAQ() {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const toggleQuestion = (questionIndex) => {
        setActiveQuestion((prev) => (prev === questionIndex ? null : questionIndex));
    };

    return (
        <section className="Auth-questionBlock">
            <h2 className="Auth-questionBlock-header">Frequently Asked Questions</h2>
            <div className="Auth-question-block">
                <ul>
                    <li>
                        <div className="Frequently-Asked-block">
                            <div
                                className="Frequently-Asked-question-block"
                                onClick={() => toggleQuestion(1)}
                            >
                                <div className="question">What is Digital Voting System ?</div>
                                <div className="down-arrow-solution">
                                    <i
                                        id="q1DownAngle"
                                        className={`fa-solid ${
                                            activeQuestion === 1 ? "fa-angle-up" : "fa-angle-down"
                                        } down-icon`}
                                    ></i>
                                </div>
                            </div>
                            <div
                                className={`solution ${activeQuestion === 1 ? "active-solution" : ""}`}
                                style={{
                                    maxHeight: activeQuestion === 1 ? "100px" : "0",
                                    overflow: "hidden",
                                }}
                            >
                                html is hyper text markup language
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="Frequently-Asked-block">
                            <div
                                className="Frequently-Asked-question-block"
                                onClick={() => toggleQuestion(2)}
                            >
                                <div className="question">Why Digital Voting System ?</div>
                                <div className="down-arrow-solution">
                                    <i
                                        id="q2DownAngle"
                                        className={`fa-solid ${
                                            activeQuestion === 2 ? "fa-angle-up" : "fa-angle-down"
                                        } down-icon`}
                                    ></i>
                                </div>
                            </div>
                            <div
                                className={`solution ${activeQuestion === 2 ? "active-solution" : ""}`}
                                style={{
                                    maxHeight: activeQuestion === 2 ? "100px" : "0",
                                    overflow: "hidden",
                                }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
                                perspiciatis accusantium enim placeat repellendus consectetur ab illum
                                maxime laborum. Rem qui vitae fugiat quibusdam ipsam quam inventore
                                numquam quisquam doloremque!
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}
