const Task = require("../models/Task")

const createTask = async(req, res) => {

    const userId = req.userId;
    const taskJson = {...req.body, createdBy: userId}
    try {
        const task = new Task(taskJson)
        task.save();
        res.status(201).json({message: "Task created successful!"})
    } catch(error) {
        res.status(504).json({error: "Server error while creating the task"})
    }
}

module.exports = createTask
