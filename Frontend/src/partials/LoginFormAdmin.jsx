import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import "../css/AuthUser.css";

export default function LoginFormAdmin() {
    const navigate = useNavigate();
    const [adminId, setAdminId] = useState("");
    const [adminName,setAdminName] = useState('');
    
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [adminIdFocused, setadminIdFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const adminIdRef = useRef(null);
    const passwordRef = useRef(null);

    function handleFocus(setFocus) {
        setFocus(true);
    }

    function handleBlur(setFocus, inputRef) {
        if (!inputRef.current.value) {
            setFocus(false);
        }
    }
    const verifyAdmin  = async()=>{
        try{
            const response = await axios.post('http://localhost:5000/verify-admin', { adminId: adminId });
            if (response.status == 200){
                const admin = response.data.data;
                const Email = admin.contact.email;
                setAdminName(admin.adminName);
                console.log(Email);
                sendOtp(Email);
                console.log('admin Verified...')
            }else if(response.status == 400){
                alert('Invalid admin Id...')
            }
        }catch(error){
            alert('admin Not Verified...');
        }
    };
    const sendOtp = async (Email) => {
        try {
            const response = await axios.post('http://localhost:5000/send-otp', {adminId:adminId, email: Email});
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
            const response = await axios.post('http://localhost:5000/verify-otp', { adminId: adminId, otp: password });
            if (response.status === 200) {
                alert('OTP verified successfully');
                navigate('/home-admin',{state:{adminId:adminId,adminName:adminName}});
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
                            className={`user-login-label-input-voterid-${adminIdFocused ? "after" : "before"}`}
                            htmlFor="loginInputvoterId"
                        >
                            Enter admin ID
                        </label>
                        <br />
                        <input
                            className="input-voterid"
                            onBlur={() => handleBlur(setadminIdFocused, adminIdRef)}
                            onFocus={() => handleFocus(setadminIdFocused)}
                            id="loginInputadminId"
                            name="adminId"
                            placeholder=""
                            type="text"
                            ref={adminIdRef}
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
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
                        <button className="login-submitbtn" type="button" onClick={verifyAdmin}>
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
