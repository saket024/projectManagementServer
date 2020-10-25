var User = require('../models/user');


exports.allEmployees = (req, res) => {
    User.find({}, { password: 0 })
        .then(employees => {
            return res.status(200).json({ employees })
        })
        .catch(err => {
            return res.status(401).json({ error: err })
        })
}

exports.createEmployees = (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ 'msg': 'Please enter name and email' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(201).json({ 'msg': 'The user already exists. Please try with another email address' });
        }
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json("created new user " + user.name);
        });

    })
}