const Task = require("../models/Task");
const User = require("../models/User");

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

const getTask = async(req, res) => {
    const userId = req.userId;
    try {

        if (!req.body.userFilterRequired) {
        const tasks = await Task.find(req.body.filter).select(req.body.selectFields).exec();
        console.log(tasks);
        if(tasks.length==0) {
            res.status(404).json({message: "No task found"})
        }
        res.status(200).json({tasks})
    } else {
        const newFilter = {...req.body.filter, createdBy: userId}
        const tasks = await Task.find(newFilter).select(req.body.selectFields).exec();
        console.log(tasks);
        if(tasks.length==0) {
            res.status(404).json({message: "No task found"})
        }
        res.status(200).json({tasks})
    }

    } catch(error) {
        res.status(504).json({message: "Internal Server Error"})
    }    
}

module.exports = { createTask, getTask }
