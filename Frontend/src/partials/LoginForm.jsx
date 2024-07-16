import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import "../css/AuthUser.css";

export default function LoginForm() {
    const navigate = useNavigate();
    const [voterId, setVoterId] = useState("");
    const [voterName, setVoterName] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [voterIdFocused, setVoterIdFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const voterIdRef = useRef(null);
    const passwordRef = useRef(null);

    function handleFocus(setFocus) {
        setFocus(true);
    }

    function handleBlur(setFocus, inputRef) {
        if (!inputRef.current.value) {
            setFocus(false);
        }
    }
    const verifyVoter  = async()=>{
        try{
            const response = await axios.post('http://localhost:5000/verify-voter', { voterId: voterId });
            if (response.status == 200){
                const voter = response.data.data;
                const Email = voter.contact.email;
                setVoterName(voter.voterName);
                console.log(Email);
                console.log('Voter Verified...');
                sendOtp(Email);
            }else if(response.status == 400){
                alert('Invalid Voter Id...')
            }
        }catch(error){
            alert('Voter Not Verified...');
        }
    };
    const sendOtp = async (Email) => {
        try {
            const response = await axios.post('http://localhost:5000/send-otp', {voterId:voterId, email: Email});
            if (response.status === 200) {
                setOtpSent(true);
                alert('OTP sent to your email');
            }
        } catch (error) {
            console.error('Error sending OTP', error);
            alert('Failed to send OTP');
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { voterId: voterId, otp: password });
            if (response.status === 200) {
                alert('OTP verified successfully');
                navigate('/home',{state:{voterId:voterId,voterName:voterName}});
            }
        } catch (error) {
            console.error('Error verifying OTP', error);
            alert('Invalid OTP');
        }
    };

    return (
        <>
            <form className="user-login-form-block" onSubmit={verifyOtp}>
                <div className="user-login-input-text-field">
                    <div className="input-block-1">
                        <label
                            className={`user-login-label-input-voterid-${voterIdFocused ? "after" : "before"}`}
                            htmlFor="loginInputVoterId"
                        >
                            Enter Voter ID
                        </label>
                        <br />
                        <input
                            className="input-voterid"
                            onBlur={() => handleBlur(setVoterIdFocused, voterIdRef)}
                            onFocus={() => handleFocus(setVoterIdFocused)}
                            id="loginInputVoterId"
                            name="voterid"
                            placeholder=""
                            type="text"
                            ref={voterIdRef}
                            value={voterId}
                            onChange={(e) => setVoterId(e.target.value)}
                        />
                    </div>
                </div>
                {otpSent && (
                    <div className="user-login-input-text-field">
                        <div className="input-block-1">
                            <label
                                className={`user-login-label-input-voterid-${passwordFocused ? "after" : "before"}`}
                                htmlFor="loginInputPassword"
                            >
                                Enter OTP
                            </label>
                            <br />
                            <input
                                className="input-voterid"
                                onBlur={() => handleBlur(setPasswordFocused, passwordRef)}
                                onFocus={() => handleFocus(setPasswordFocused)}
                                id="loginInputPassword"
                                name="password"
                                placeholder=""
                                type="text"
                                ref={passwordRef}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                <div className="user-login-input-text-field login-sumbitbtnfield">
                    {!otpSent ? (
                        <button className="login-submitbtn" type="button" onClick={verifyVoter}>
                            Send OTP
                        </button>
                    ) : (
                        <button className="login-submitbtn" type="submit">
                            Submit OTP
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}
