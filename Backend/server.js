const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// server creation
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to datbase
try {
  mongoose.connect("mongodb://localhost:27017/dvsdb").then(() => {
    console.log("Connected to database");
  });
} catch (error) {
  console.log("Error to Connect database..");
}

// nodemailer transporter
const transporter = require("./smtp.js");

// Database Collections
const VoterDetails = require("./models/VoterDetails.js");
const ElectionFile = require("./models/ElectionFile.js");
const PreElectionFile = require("./models/PreElectionFile.js");
const AdminDetails = require("./models/AdminDetails.js");
const ResultFile = require("./models/ResultFile.js");

// Store OTPs temporarily
const otpStore = {};

const d = new Date();
let year = d.getFullYear();

// default server request
app.get("/", (req, res) => {
  res.send("Backend server running");
});

let loggerAssembly = "";
let loggerAdminId = "";
// voter verification request handled by server
app.post("/verify-voter", async (req, res) => {
  try {
    const { voterId } = req.body;
    let result = await VoterDetails.findOne({ epic: voterId });
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "Invalid Voter" });
  }
});


app.post("/fetch-votername", async (req, res) => {
  try {
    const { voterId } = req.body;
    let result = await VoterDetails.findOne({ epic: voterId });
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "Invalid Voter" });
  }
});


app.post("/active-sessions", async (req, res) => {
  try {
    const { voterId } = req.body;
    const voter = await VoterDetails.findOne({ epic: voterId });

    if (!voter) {
      return res.status(404).send({ message: "Voter not found" });
    }

    const state = voter.voterState;
    const assembly = voter.voterAssembly;
    const allActiveElections = await ElectionFile.find({
      state: state,
      assembly: assembly,
      status:'active'
    });
    const completedElections = await ResultFile.find({ voterId: voterId });

    // Create a set of completed election IDs for quick lookup
    const completedElectionIds = new Set(completedElections.map(election => election.electionFileId));

    // Filter out completed elections from the list of all active elections
    const activeNonCompletedElections = allActiveElections.filter(
      election => !completedElectionIds.has(election.electionId)
    );
    console.log(activeNonCompletedElections);
    res.status(200).send({ data: activeNonCompletedElections });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Invalid Admin" });
  }
});




app.post("/fetch-ballot-entry", async (req, res) => {
  try {
    const { electionFileId } = req.body;
    const result = await ElectionFile.findOne({ electionId: electionFileId });
    console.log(result);
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "Invalid Admin" });
  }
});

app.post("/vote/:voterId/:electionFileId", async (req, res) => {
  try {
    const {
      state,
      assembly,
      voterId,
      electionFileId,
      electedCandidateId,
      electedCandidateName,
      electedCandidateParty,
    } = req.body;
    const resultFile = new ResultFile({
      state,
      assembly,
      voterId,
      electionFileId,
      electedCandidateId,
      electedCandidateName,
      electedCandidateParty,
    });
    const result = await resultFile.save();
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(400).send({ message: "result not saved" });
  }
});

// voter verification request handled by server
app.post("/verify-admin", async (req, res) => {
  try {
    const { adminId } = req.body;
    let result = await AdminDetails.findOne({ adminId: adminId });
    loggerAssembly = result.adminAssembly;
    loggerAdminId = result.adminId;
    res.status(200).send({ data: result});
  } catch (error) {
    res.status(400).send({ message: "Invalid Admin" });
  }
});

// After successfully voter verification send otp to verified voters email Id
app.post("/send-otp", (req, res) => {
  const { voterId, email } = req.body;
  //  Generating OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //   Storing OTP with VoterId referance
  otpStore[voterId] = otp;
  //   nodemailer mailoptions
  const mailOptions = {
    from: "onkarwaghmode0101@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };
  //   sendMail inbulit function of transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send({ message: "OTP sent successfully!" });
  });
});

// verify OTP
app.post("/verify-otp", (req, res) => {
  const { voterId, otp } = req.body;
  if (otpStore[voterId] && otpStore[voterId] === otp) {
    return res.status(200).send({ message: "OTP verified successfully!" });
  }
  res.status(400).send({ message: "Invalid OTP" });
});

app.post("/home-electionFileList", async (req, res) => {
  try {
    const {adminId} = req.body;
    const result = await PreElectionFile.find({ adminId: adminId});
    console.log(result);
    return res
      .status(200)
      .send({ message: "data fetch successfully...", data: result });
  } catch (error) {
    return res.status(400).send({ message: "data fecthing failure..." });
  }
});


app.post('/election-file/active/:electionFileId', async (req, res) => {
  try {
   
    const { electionFileId,electionId,startDate,startTime,endDate,endTime } = req.body;
    
    const result = await PreElectionFile.findByIdAndUpdate(
      { _id : electionFileId },
      { status: "active", startDate:startDate,startTime:startTime,endDate:endDate,endTime:endTime},
      { new: true }
    );
  
    const resultActive = await ElectionFile.findOneAndUpdate(
      {electionId : electionId },
      {$set:{ status: "active",startDate:startDate,startTime:startTime,endDate:endDate,endTime:endTime }},
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Election not found" });
    }

    console.log(result);
    return res.status(200).send({ message: "Data updated successfully", data: result });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Data updating failure" });
  }
});

app.post('/election-file/edit/:electionFileId',async(req,res)=>{
  try {
    const { electionFileId,electionId,title,description,state,assembly,startDate,startTime,endDate,endTime,ballotPaper} = req.body;
    const result = await PreElectionFile.findByIdAndUpdate(
      { _id : electionFileId },
      { title,description,state,assembly,startDate,startTime,endDate,endTime,ballotPaper },
      { new: true }
    );
  
    const resultActive = await ElectionFile.findOneAndUpdate(
      {electionId : electionId },
      {$set:{ title,description,state,assembly,startDate,startTime,endDate,endTime,ballotPaper }},
      { new: true }
    );

    if (!resultActive) {
      return res.status(404).send({ message: "Election not found" });
    }

    console.log(resultActive);
    return res.status(200).send({ message: "Data updated successfully", data: resultActive });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Data updating failure" });
  }
});

app.post('/fetch-admin-details',async(req,res)=>{
  try {
    const {adminId} = req.body;
    const result = await AdminDetails.findOne({ adminId: adminId });
    console.log(result);
    return res
      .status(200)
      .send({ message: "data fetch successfully...", data: result });
  } catch (error) {
    return res.status(400).send({ message: "data fecthing failure..." });
  }
});


function generateRandomThreeDigitNumber() {
  // Generate a random number between 100 and 999
  return Math.floor(100 + Math.random() * 900);
}
// election form stage 1 file
app.post("/election-file/stage-1", async (req, res) => {
  try {
    const randomNumber = generateRandomThreeDigitNumber();
    let electionId = `${loggerAssembly}-${year}-${randomNumber}`;
    const { title, description } = req.body;
    const electionFile = new PreElectionFile({
      title,
      description,
      electionId,
      adminId: "EPI1234567",
    });
    const result = await electionFile.save();
    return res
      .status(200)
      .send({ message: "data save successfully...", data: result._id });
  } catch (error) {
    return res.status(400).send({ message: "data saving failure..." });
  }
});

// election form stage 2 file
app.post("/election-file/stage-2", async (req, res) => {
  try {
    const { electionFileId, state, assembly, startDateTime, endDateTime } =
      req.body;
    let startDate, startTime, endDate, endTime;
    if (startDateTime) {
      [startDate, startTime] = startDateTime.split("T");
    }
    if (endDateTime) {
      [endDate, endTime] = endDateTime.split("T");
    }
    const result = await PreElectionFile.findByIdAndUpdate(
      { _id: electionFileId },
      {
        state: state,
        assembly: assembly,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: "Document not found" });
    }
    return res.status(200).send({ message: "Data saved Successfully..." });
  } catch (error) {
    return res.status(400).send({ message: "Data saving failure..." });
  }
});

app.post("/election-file/stage-3/candidate-Add", async (req, res) => {
  try {
    const { electionFileId, candidateName, candidateParty } = req.body;

    const newCandidate = {
      srno: Date.now(), // Assuming srno is unique and auto-increment-like
      candidateName: candidateName,
      candidateParty: candidateParty,
    };

    const result = await PreElectionFile.findByIdAndUpdate(
      electionFileId,
      { $push: { ballotPaper: newCandidate } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Document not found" });
    }
    console.log(result);
    return res
      .status(200)
      .send({ message: "Data saved successfully", updatedDocument: result });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Data saving failure", error: error.message });
  }
});

// election form stage 3 file
app.post("/election-file/stage-3/selected-candidate-list", async (req, res) => {
  try {
    const { electionFileId } = req.body;

    const result = await PreElectionFile.findOne({ _id: electionFileId });

    if (!result) {
      return res.status(404).send({ message: "Document not found" });
    }
    console.log(result.ballotPaper);
    return res
      .status(200)
      .send({ message: "Data saved successfully", data: result.ballotPaper });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Data saving failure", error: error.message });
  }
});

// Load Election file
app.post("/election-file/state-4/load-file", async (req, res) => {
  try {
    const { electionFileId } = req.body;

    const result = await PreElectionFile.findOne({ _id: electionFileId });

    if (!result) {
      return res.status(404).send({ message: "Document not found" });
    }
    console.log(result);
    return res
      .status(200)
      .send({ message: "Data saved successfully", data: result });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Data saving failure", error: error.message });
  }
});
// election final stage processing to complete setup
// from processing state to complete state ,  move from processing to permanant database.
app.post("/election-file/state-4/file-submission", async (req, res) => {
  try {
    const { electionFileId } = req.body;
    console.log(electionFileId);

    const auditLog = {
      action: "Election file submission",
      userId: "EPI1234567",
      details: "Election file submission",
    };
    console.log(auditLog);

    // Update the PreElectionFile document and push the audit log
    const result = await PreElectionFile.findByIdAndUpdate(
      electionFileId,
      { eventCreationStatus: "completed", $push: { auditLogs: auditLog } }, // Ensure auditLogs is correct
      { new: true }
    );
    console.log(result);

    if (!result) {
      return res.status(404).send({ message: "Document not found" });
    }

    // Save the final document in the ElectionFile collection
    const finalElectionFile = new ElectionFile(result.toObject());
    const savingResult = await finalElectionFile.save();
    console.log(savingResult);

    if (!savingResult) {
      return res
        .status(404)
        .send({ message: "Failed to save in permanent database" });
    }

    return res
      .status(200)
      .send({ message: "Data saved successfully in Permanent Database" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Data saving failure", error: error.message });
  }
});

const sendInvitation = (email, subject, text) => {
  try {
    const mailOptions = {
      from: "onkarwaghmode0101@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };
    //   sendMail inbulit function of transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send({ message: "Invitation Sent Successfully..." });
    });
  } catch (error) {
    res.status(400).send({ message: "Invitation fail to Sent..." });
  }
};
// election event invitation send
app.post("/election-file/stage-5/election-invitation", async (req, res) => {
  try {
    const { state, assembly } = req.body;
    console.log(state, assembly);
    const result = await VoterDetails.find({
      voterState: state,
      voterAssembly: assembly,
    });

    if (!result) {
      return res.status(404).send({ message: "Document not found" });
    }
    const subject = "Election Commission India";
    const text =
      "Dear Voter,\nElection coming soon\nElection Link : http://localhost:3000/";
    result.forEach((voter) => {
      sendInvitation(voter.contact.email, subject, text);
    });
    return res
      .status(200)
      .send({ message: "Data saved successfully", data: result });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Data saving failure", error: error.message });
  }
});

// election event active



// result 
app.post('/voting/result/:electionFileId',async(req,res)=>{
  const {electionFileId} = req.body;
  const response = await ResultFile.find({electionFileId:electionFileId});
  console.log(response);
  res.status(200).send({data:response});
});


// app run
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
