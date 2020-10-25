const Task = require('../models/task')
const User = require('../models/user')
const mongoose = require('mongoose');
var { ObjectId } = mongoose.Schema.Types

// ###################      CREATE TASK     #################################

exports.createTasks = (req, res) => {
    // console.log(req.body);
    if (!req.body.name || !req.body.deadline) {
        return res.status(400).json({ 'msg': 'Please enter task name and deadline' });
    }

    Task.findOne({ name: req.body.name }, (err, task) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (task) {
            return res.status(400).json({ 'msg': 'The task already exists. Please try with another name' });
        }

        let newTask = Task(req.body);
        newTask.save((err, task) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json("created new task " + task.name);
        })
    })
}

// ###################      GET ALL TASK     #################################

exports.allTasks = (req, res) => {
    Task.find()
        .then(tasks => {
            return res.status(200).json({ tasks })
        })
        .catch(err => {
            return res.status(401).json({ error: err })
        })
}

// ###################      ASSIGN TASK     #################################

exports.assignTasks = (req, res) => {
    // console.log(req.body)
    Task.updateOne({ _id: req.body.taskId },
        { $push: { assignedto: [req.body.username, req.body.userId] } },
        { upsert: true })
        .catch((err) => {
            return res.status(400).json({ 'msg': err })
        })

    User.updateOne({ _id: req.body.userId },
        // { $push: { assignedTask: [req.body.taskName, req.body.taskId] } }, { upsert: true })
        { $push: { assignedTask: [taskName = req.body.taskName, taskId = req.body.taskId] } }, { upsert: true })
        .then(() => {
            return res.status(200).json('Assigned task ' + req.body.taskName + ' to ' + req.body.username + ' successfully')
        })
        .catch((err) => {
            return res.status(400).json({ 'msg': err })
        })
}



// ###################      GET MY TASK     #################################

exports.getMyTasks = (req, res) => {
    // console.log(req.query)
    let taskList = [];
    let taskId = [];
    // let taskResult = [];
    User.findById({ _id: req.query.userId }, { password: 0 })
        .then(emp => {
            this.taskList = emp.assignedTask
            this.taskId = this.taskList.filter((_, i) => (i % 2));
            // console.log(this.taskId)

            Task.find({ _id: { $in: this.taskId } })
                .then(result => {
                    // console.log(result)
                    return res.status(200).json({ result })

                })
                .catch(err => {
                    return res.status(400).json({ err })
                })
            // return res.status(200).json({ emp })
        })
        .catch(err => {
            return res.status(400).json({ err })
        })
}


exports.setProgress = (req, res) => {
    // console.log(req.body)

    Task.findByIdAndUpdate(req.body.taskId, { progress: req.body.progress })
        .then(task => {
            return res.status(200).json("successfully updated. Refresh page to see updated content")
        })
        .catch(err => {
            return res.status(400).json({ err })
        })
}