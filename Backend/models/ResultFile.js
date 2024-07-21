const mongoose = require('mongoose');

const ResultFileSchema = mongoose.Schema({
        state:{
            type:String
        },
        assembly:{
            type:String
        },
        electionType:{
            type:String
        },
        electionFileId:{
            type:String
        },
        voterId:{
            type:String
        },
        electedCandidateId:{
            type:String
        },
        electedCandidateName:{
            type:String
        },
        electedCandidateParty:{
            type:String
        },
        year:{
            type:String
        },
        dateOfAction:{
            type:String
        },
        timeOfAction:{
            type:String
        }
});

module.exports = mongoose.model('ResultFile',ResultFileSchema);