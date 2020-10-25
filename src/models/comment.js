const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Task = require('./task')
var { ObjectId } = mongoose.Schema.Types


const commentSchema = new mongoose.Schema({
    taskId: { type: ObjectId, ref: "Task" },
    body: { type: String },
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', commentSchema);