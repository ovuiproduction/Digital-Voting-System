const mongoose = require('mongoose');

// Schema for Ballot Paper
const BallotPaperSchema = mongoose.Schema({
    srno: {
        type: Number,
        //  
    },
    candidateName: {
        type: String,
        //  
    },
    candidateParty: {
        type: String,
        //  
    },
    candidatePartySymbol: {
        type: String, // URL or path to the image
        //  
    },
    candidateDetails: {
        type: String, // Additional details about the candidate
    }
}, { _id: false }); // Prevents MongoDB from creating an _id field for subdocuments

// Schema for Election Event
const ProcessingElectionEventSchema = mongoose.Schema({
    electionId: {
        type: String,
        unique:true
    },
    adminId: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String
    },
    state: {
        type: String,  
    },
    assembly: {
        type: String,
    },
    startDate: {
        type: String,
    },
    startTime:{
        type:String,
    },
    endDate: {
        type: String, 
    },
    endTime:{
        type:String,
    },
    eventCreationStatus: {
        type: String,
        enum: ['processing', 'completed'],
        default: 'processing', 
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
         
    },
    ballotPaper: [BallotPaperSchema],
    auditLogs: [{
        action: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        userId: {
            type: String,
        },
        details: {
            type: String
        }
    },{ _id: false }]
}, {
    timestamps: true
});

module.exports = mongoose.model('PreElectionFile', ProcessingElectionEventSchema);

