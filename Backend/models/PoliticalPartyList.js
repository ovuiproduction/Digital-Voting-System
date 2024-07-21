const mongoose = require('mongoose');

const PoliticalPartyListSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    abbreviation:{
        type:String,
        required:true
    },
    symbol:{
        type:String,
    },
    description:{
        type:String
    }
});

module.exports = mongoose.model('PoliticalPartyList',PoliticalPartyListSchema);