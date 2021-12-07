const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderObject = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    },
}

const leaderSchema = new Schema(leaderObject, {timestamps: true});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;