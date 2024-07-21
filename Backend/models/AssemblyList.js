const mongoose = require('mongoose');

const AssemblyListSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true, // Make the state field required
    },
    assemblyList: {
        type: [String], // Specify that the array contains strings
        required: true, // Make the assemblyList field required
    }
}, {
    timestamps: true // Add createdAt and updatedAt timestamps
});

module.exports = mongoose.model("AssemblyList", AssemblyListSchema);
