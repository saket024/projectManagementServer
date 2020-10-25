const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Task = require('./task')
var { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "employee",
        enum: ["employee", "admin"]
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "password@123",
    },
    designation: {
        type: String
    },
    // assignedTask: [{ type: String }, { type: ObjectId, ref: "Task" }]
    assignedTask: [taskName = { type: String }, taskId = { type: ObjectId, ref: "Task" }]

},
    { timestamps: true }
);

// UserSchema.pre('save', function (next) {
//     var user = this;

//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(10, function (err, salt) {
//         if (err) return next(err);

//         bcrypt.hash(user.password, salt, function (err, hash) {
//             if (err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };
// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//     if (candidatePassword == this.password) {
//         return cb(true, false);
//     } else {
//         return cb(false, true);
//     }
// };

module.exports = mongoose.model('User', UserSchema);