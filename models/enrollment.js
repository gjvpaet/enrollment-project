const moment = require('moment');
const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    highSchool: {
        type: String,
        required: true
    },
    schoolClassification: {
        type: String,
        required: true
    },
    schoolLocation: {
        type: String,
        required: true
    },
    preferredStrand: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: moment().format()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: moment().format()
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);