import React, { useState } from "react";
import axios from 'axios';

import "../css/AddPoliticalParty.css";

export default function AddPoliticalParty() {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [abbreviation, setAbbreviation] = useState("");

    // Handle file input
    const handleFileChange = (e) => {
        setSymbol(e.target.files[0]);
    };

    // Function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('abbreviation', abbreviation);
            formData.append('description', description);
            if (symbol) {
                {console.log("Symbol",symbol)}
                formData.append('symbol', symbol); // Append the file
            }

            const response = await axios.post('http://localhost:5000/add-political-party', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });

            if (response.status === 200) {
                alert("Party Added successfully...");
                setName("");
                setDescription("");
                setAbbreviation("");
                setSymbol("");
            } else if (response.status === 400) {
                alert('Server not responding...');
            }
        } catch(error) {
            alert('Data not saved due to some technical errors\ntry again');
        }
    };

    return (
        <>
            <div className="party-details-form">
                <div>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Party Name"
                />
                </div>
                <div>
                <input
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
                    type="text"
                    placeholder="Abbreviation"
                />
                </div>
                <div>
                <input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                />
                </div>
                <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                </div>
                <div>
                <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}
