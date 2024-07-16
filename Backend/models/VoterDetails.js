const mongoose = require('mongoose');

// Define the schema for voter details
const voterDetailsSchema = new mongoose.Schema({
    epic: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        uppercase: true
    },
    voterName: {
        type: String,
        required: true,
        trim: true
    },
    voterState: {
        type: String,
        required: true,
        trim: true
    },
    voterDistrict: {
        type: String,
        required: true,
        trim: true
    },
    voterAssembly: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            maxlength: 6
        }
    },
    contact: {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            required: [true, 'Email address is required']
        },
        phone: {
            type: String,
            trim: true,
            match: [/^\d{10}$/, 'is invalid'],
            required: [true, 'Phone number is required']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the `updatedAt` field on save
voterDetailsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the model from the schema and export it
module.exports = mongoose.model('VoterDetails', voterDetailsSchema);
