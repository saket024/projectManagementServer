var express = require('express'),
    routes = express.Router();
var userController = require('./controller/user-controller');
var employeeController = require('./controller/employee-controller');
var taskController = require('./controller/task-controller');
var commentController = require('./controller/comment-controller');
var passport = require('passport');
var User = require('./models/user')



routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

routes.get('/getAllEmployees', employeeController.allEmployees);
routes.post('/createEmployees', employeeController.createEmployees);

routes.post('/createTask', taskController.createTasks);
routes.get('/getAllTasks', taskController.allTasks);
routes.post('/assignTask', taskController.assignTasks);
routes.get('/getMyTasks', taskController.getMyTasks);
routes.post('/setProgress', taskController.setProgress);

routes.post('/addComment', commentController.addComment)
routes.get('/getComments', commentController.getComments)



routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

module.exports = routes;