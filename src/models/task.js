const mongoose = require('mongoose');
var User = require('./user')
var { ObjectId } = mongoose.Schema.Types

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    deadline: {
        type: String,
        required: true
    },
    assignedto: [
        { type: String },
        { type: ObjectId, ref: "User" }
    ],
    progress: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);