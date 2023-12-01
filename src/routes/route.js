const express = require("express")
const router = express.Router()

const {createUser, login, updateUser} = require('../controllers/userController')
const {assignTask, updateTask, retrieveTasks, retrieveTaskById, deleteTaskById, getCompletedTaskBefore7Day, updateTaskToCompleted} = require('../controllers/taskController')
const {authentication, authorization, adminAuthorization} = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/login', login)
router.put('/updateUser/:userId', authentication, authorization, updateUser)

router.post('/assignTask/:userId', authentication, adminAuthorization, assignTask)
router.put('/updateTask/:userId', authentication, authorization, adminAuthorization, updateTask)
router.get('/retrieveTasks/:userId', authentication, authorization, retrieveTasks) 
router.get('/user/:userId/retrieveTaskById/:taskId', authentication, authorization, retrieveTaskById)
router.put('/user/:userId/updateTaskToCompleted/:taskId', authentication, authorization, updateTaskToCompleted)
router.get('getCompletedTaskBefore7Day/:userId', authentication, authorization, getCompletedTaskBefore7Day)
// router.delete('/user/:userId/deleteTaskById/:taskId', authentication, authorization, adminAuthorization, deleteTaskById)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router