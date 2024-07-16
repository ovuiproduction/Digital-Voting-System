const mongoose = require('mongoose');

// Schema for Ballot Paper
const BallotPaperSchema = mongoose.Schema({
    srno: {
        type: Number,
        required: true
    },
    candidateName: {
        type: String,
        required: true
    },
    candidateParty: {
        type: String,
        required: true
    },
    candidatePartySymbol: {
        type: String, // URL or path to the image
    },
    candidateDetails: {
        type: String, // Additional details about the candidate
    }
}, { _id: false }); // Prevents MongoDB from creating an _id field for subdocuments


// Schema for Election Event
const ElectionEventSchema = mongoose.Schema({
    electionId: {
        type: String,
        unique: true,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    assembly: {
        type: String,
        required: true
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
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
        required: true
    },
    ballotPaper: [BallotPaperSchema],
    auditLogs: [{
        action: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true
        },
        userId: {
            type:String
        },
        details: {
            type: String
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ElectionFile', ElectionEventSchema);

