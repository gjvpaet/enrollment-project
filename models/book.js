const moment = require('moment');
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    placeOfPublication: {
        type: String,
        required: true
    },
    dateOfPublication: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        defaul: moment().format()
    },
    updatedAt: {
        type: Date,
        default: moment().format()
    }
});

module.exports = mongoose.model('Book', bookSchema);