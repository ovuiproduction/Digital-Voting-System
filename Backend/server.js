const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// server creation
const app = express();
const port = 5000;
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(uploadDir));

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(bodyParser.json({ limit: "100mb" })); // Increase the limit as needed
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

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
const AssemblyList = require("./models/AssemblyList.js");
const PoliticalPartyList = require("./models/PoliticalPartyList.js");

// Store OTPs temporarily
const otpStore = {};

// Ensure the uploads directory exists

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
      status: "active",
    });
    const completedElections = await ResultFile.find({ voterId: voterId });

    // Create a set of completed election IDs for quick lookup
    const completedElectionIds = new Set(
      completedElections.map((election) => election.electionFileId)
    );

    // Filter out completed elections from the list of all active elections
    const activeNonCompletedElections = allActiveElections.filter(
      (election) => !completedElectionIds.has(election.electionId)
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
      electionType,
      state,
      assembly,
      voterId,
      electionFileId,
      electedCandidateId,
      electedCandidateName,
      electedCandidateParty,
    } = req.body;

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateOfAction = `${day}:${month}:${year}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Format hours and minutes to always have two digits
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const timeOfAction = `${formattedHours}:${formattedMinutes}`;

    const resultFile = new ResultFile({
      electionType,
      state,
      assembly,
      voterId,
      electionFileId,
      electedCandidateId,
      electedCandidateName,
      electedCandidateParty,
      year,
      dateOfAction,
      timeOfAction,
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
    res.status(200).send({ data: result });
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
    const { adminId } = req.body;
    const result = await PreElectionFile.find({ adminId: adminId });
    console.log(result);
    return res
      .status(200)
      .send({ message: "data fetch successfully...", data: result });
  } catch (error) {
    return res.status(400).send({ message: "data fecthing failure..." });
  }
});

app.post("/election-file/active/:electionFileId", async (req, res) => {
  try {
    const {
      electionFileId,
      electionId,
      startDate,
      startTime,
      endDate,
      endTime,
    } = req.body;

    const result = await PreElectionFile.findByIdAndUpdate(
      { _id: electionFileId },
      {
        status: "active",
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      },
      { new: true }
    );

    const resultActive = await ElectionFile.findOneAndUpdate(
      { electionId: electionId },
      {
        $set: {
          status: "active",
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Election not found" });
    }

    console.log(result);
    return res
      .status(200)
      .send({ message: "Data updated successfully", data: result });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Data updating failure" });
  }
});

app.post("/election-file/edit", async (req, res) => {
  try {
    const {
      eventCreationStatus,
      electionFileId,
      electionId,
      type,
      description,
      state,
      assembly,
      startDate,
      startTime,
      endDate,
      endTime,
      ballotPaper,
      adminId,
    } = req.body;

    const result = await PreElectionFile.findByIdAndUpdate(
      { _id: electionFileId },
      {
        type,
        description,
        state,
        assembly,
        startDate,
        startTime,
        endDate,
        endTime,
        ballotPaper,
      },
      { new: true }
    );

    if (eventCreationStatus == "processing") {
      const auditLog = {
        action: "Election file Edited",
        userId: adminId,
        details: "Election file Edited",
      };
      if (
        type &&
        description &&
        state &&
        assembly &&
        startDate &&
        startTime &&
        endDate &&
        endTime &&
        ballotPaper
      ) {
        // Update the PreElectionFile document and push the audit log
        const result = await PreElectionFile.findByIdAndUpdate(
          electionFileId,
          { eventCreationStatus: "completed", $push: { auditLogs: auditLog } }, // Ensure auditLogs is correct
          { new: true }
        );
        if (!result) {
          return res.status(404).send({ message: "Document not found" });
        }
        // Save the final document in the ElectionFile collection
        const finalElectionFile = new ElectionFile(result.toObject());
        const savingResult = await finalElectionFile.save();
        console.log(savingResult);
      }
    } else if (eventCreationStatus == "completed") {
      const resultActive = await ElectionFile.findOneAndUpdate(
        { electionId: electionId },
        {
          $set: {
            type,
            description,
            state,
            assembly,
            startDate,
            startTime,
            endDate,
            endTime,
            ballotPaper,
          },
        },
        { new: true }
      );
      if (!resultActive) {
        return res.status(404).send({ message: "Election not found" });
      }
    }
    return res.status(200).send({ message: "Data updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Data updating failure" });
  }
});

app.post("/fetch-admin-details", async (req, res) => {
  try {
    const { adminId } = req.body;
    const result = await AdminDetails.findOne({ adminId: adminId });
    console.log(result);
    return res
      .status(200)
      .send({ message: "data fetch successfully...", data: result });
  } catch (error) {
    return res.status(400).send({ message: "data fecthing failure..." });
  }
});

app.post("/fetch-assembly-list", async (req, res) => {
  try {
    const state = req.body.state;
    const result = await AssemblyList.findOne({ state: state });
    console.log(result);
    res.status(200).send({ data: result.assemblyList });
  } catch (err) {
    console.log(err);
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
    const { type, description } = req.body;
    const electionFile = new PreElectionFile({
      type,
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

app.post("/fetch-political-patry-list", async (req, res) => {
  try {
    const result = await PoliticalPartyList.find({});
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send({ msg: "internal server error" });
  }
});

app.post("/election-file/stage-3/candidate-Add", async (req, res) => {
  try {
    const {
      electionFileId,
      candidateName,
      candidatePartySymbol,
      candidateParty,
    } = req.body;

    const newCandidate = {
      srno: Date.now(), // Assuming srno is unique and auto-increment-like
      candidateName: candidateName,
      candidateParty: candidateParty,
      candidatePartySymbol: candidatePartySymbol,
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
app.post("/voting/result/:type", async (req, res) => {
  const { electionType, year } = req.body;
  const response = await ResultFile.find({
    electionType: electionType,
    year: year,
  });
  console.log(response);
  res.status(200).send({ data: response });
});




app.post("/add-political-party", upload.single("symbol"), async (req, res) => {
  try {
    const { name, abbreviation, description } = req.body;
    const symbol = req.file ? req.file.filename : "";
    console.log(req.file);
    const newParty = new PoliticalPartyList({
      name,
      abbreviation,
      symbol: symbol,
      description,
    });
    await newParty.save();

    res.status(200).send("Party added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving party details");
  }
});

// app run
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // set assembly
// app.get("/set-assembly-list", async (req, res) => {
//   // try{
//     const state = "Delhi";
//     const assemblyList = [
//       "Chandni Chowk",      // None
//       "North East Delhi",   // None
//       "East Delhi",         // None
//       "New Delhi",          // None
//       "North West Delhi",   // SC
//       "West Delhi",         // None
//       "South Delhi"         // None
//     ];
//   const stateAndassembly = new AssemblyList({ state, assemblyList });
//   const result = await stateAndassembly.save();
//   res.status(200).send("Added");
//   // }catch(err){
//   // res.status(404).send(err);
//   // }
// });
