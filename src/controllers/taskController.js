const taskModel = require('../models/taskModel')

module.exports = {
    assignTask: async (req, res) => {
        try {
            let saveData = await taskModel.create(req.body)
            return res.status(201).send({ status: true, msg: "Task created successfully", Task: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateTask: async (req, res) => {
        try {
            let { taskId, userId } = req.params
            let data = req.body
            if (Object.keys(data).length < 1) {
                return res.status(400).send({ status: false, message: "Please enter data whatever you want to update" })
            }

            data['updatedAt'] = new Date().toLocaleString()
            let updateData = await taskModel.findOneAndUpdate({ _id: taskId, userId: userId }, data, { new: true })
            if (!updateData) {
                return res.status(404).send({ status: false, msg: "Task not found" })
            }
            return res.status(200).send({ status: false, Task: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    retrieveTasks: async (req, res) => {
        try {
            let data = await taskModel.findOne({userId: req.params.userId})
            if (!data) {
                return res.status(404).send({ status: false, msg: "No task is assigned to you yet" })
            }
            return res.status(200).send({ status: true, Task: data })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    retrieveTaskById: async (req, res) => {
        try {
            let data = await taskModel.findOne({_id : req.params.taskId, userId: req.params.userId})
            if (!data) {
                return res.status(404).send({ status: false, msg: "task is not available" })
            }
            return res.status(200).send({ status: true, Task: data })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    updateTaskToCompleted : async (req, res) => {
        try {
            let data = await taskModel.findOneAndUpdate({_id : req.params.taskId, userId: req.params.userId}, {status: 'completed'}, {new: true})
            if (!data) {
                return res.status(404).send({ status: false, msg: "task is not available" })
            }
            return res.status(200).send({ status: true, Task: data })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    // deleteTaskById: async (req, res) => {
    //     try {
    //         let data = await taskModel.findByIdAndDelete(req.params.taskId)
    //         if (!data) {
    //             return res.status(404).send({ status: false, msg: "No task is available" })
    //         }
    //         return res.status(204).send({ status: true, Task: 'Task deleted successfully' })
    //     } catch (error) {
    //         return res.status(500).send({ status: false, message: error.message })
    //     }
    // },

    getCompletedTaskBefore7Day: async (req, res) => {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            console.log(sevenDaysAgo)
            const completedTasks = await taskModel.find({
                userId: req.params.userId,
                status: 'completed',
                $or: [
                    { updatedAt: { $gte: sevenDaysAgo } },
                    { createdAt: { $gte: sevenDaysAgo } }
                ]
            });
            return res.status(200).send({ status: true, Tasks: completedTasks })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}