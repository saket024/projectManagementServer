var Comment = require('../models/comment')
var Task = require('../models/task')

exports.addComment = (req, res) => {

    // console.log(req.body)
    let newComment = Comment({
        taskId: req.body.taskId,
        body: req.body.comment
    })
    newComment.save((err, msg) => {
        if (err) {
            return res.status(400).json({ 'msg': err })
        }
        return res.status(200).json(msg)
    })
}


exports.getComments = (req, res) => {

    // console.log(req.query)

    Comment.find({ taskId: req.query.taskId })
        .then(comment => {
            return res.status(200).json({ comment })
        })
        .catch(err => {
            return res.status(400).json({ err })
        })
}