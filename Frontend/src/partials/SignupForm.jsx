import React, { useState, useRef } from "react";
import "../css/AuthUser.css";

export default function SignupForm() {
    const [voterIdFocused, setVoterIdFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const voterIdRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    function handleFocus(setFocus) {
        setFocus(true);
    }

    function handleBlur(setFocus, inputRef) {
        if (!inputRef.current.value) {
            setFocus(false);
        }
    }

    return (
        <>
            <form className="login-form-block" action="/login" method="post">
                <div className="input-text-field">
                    <div className="input-block-1">
                        <label
                            className={`label-input-voterid-${voterIdFocused ? "after" : "before"}`}
                            htmlFor="signupInputVoterId"
                        >
                            Enter Voter ID
                        </label>
                        <br />
                        <input
                            className="input-voterid"
                            onBlur={() => handleBlur(setVoterIdFocused, voterIdRef)}
                            onFocus={() => handleFocus(setVoterIdFocused)}
                            id="signupInputVoterId"
                            name="voterid"
                            placeholder=""
                            type="text"
                            ref={voterIdRef}
                        />
                    </div>
                </div>
                <div className="input-text-field">
                    <div className="input-block-1">
                        <label
                            className={`label-input-voterid-${passwordFocused ? "after" : "before"}`}
                            htmlFor="signupInputPassword"
                        >
                            Enter Password
                        </label>
                        <br />
                        <input
                            className="input-voterid"
                            onBlur={() => handleBlur(setPasswordFocused, passwordRef)}
                            onFocus={() => handleFocus(setPasswordFocused)}
                            id="signupInputPassword"
                            name="password"
                            placeholder=""
                            type="password"
                            ref={passwordRef}
                        />
                    </div>
                </div>
                <div className="input-text-field">
                    <div className="input-block-1">
                        <label
                            className={`label-input-voterid-${confirmPasswordFocused ? "after" : "before"}`}
                            htmlFor="signupInputConfirmPassword"
                        >
                            Confirm Password
                        </label>
                        <br />
                        <input
                            className="input-voterid"
                            onBlur={() => handleBlur(setConfirmPasswordFocused, confirmPasswordRef)}
                            onFocus={() => handleFocus(setConfirmPasswordFocused)}
                            id="signupInputConfirmPassword"
                            name="confirmpassword"
                            placeholder=""
                            type="password"
                            ref={confirmPasswordRef}
                        />
                    </div>
                </div>
                <div className="input-text-field login-sumbitbtnfield">
                    <button className="login-submitbtn" type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}
