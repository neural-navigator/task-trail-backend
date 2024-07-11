const Task = require("../models/Task");
const User = require("../models/User");
const SaveTask = require("../models/SaveTask")

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
        // console.log(tasks);
        if(tasks.length==0) {
            res.status(404).json({message: "No task found"})
        }
        res.status(200).json({tasks})
    } else {
        const newFilter = {...req.body.filter, createdBy: userId}
        const tasks = await Task.find(newFilter).select(req.body.selectFields).exec();
        // console.log(tasks);
        if(tasks.length==0) {
            res.status(404).json({message: "No task found"})
        }
        res.status(200).json({tasks})
    }

    } catch(error) {
        res.status(504).json({message: "Internal Server Error"})
    }    
}

const saveTasks = async(req, res) => {
    const userId = req.userId;
    try {
        const payload = req.body;
        const existLinkStatus = await SaveTask.find({userId: userId, taskId: req.body.taskId}).select('category');
        if (existLinkStatus.length===0) {
            const taskLink = new SaveTask({userId, ...payload});
            taskLink.save();
            res.status(201).json({message: "Task saved successfully!"})
        } else {
            await SaveTask.updateOne({userId: userId, taskId: req.body.taskId}, {category: req.body.category, updatedOn: Date.now()})
            res.status(201).json({message: `Task status updated to ${req.body.category}`})
        }
    } catch (error) {
        res.status(500).json({message: "Server error"})
        console.log(`Error :: ${error}`);
    }
}

const userTaskActivity = async(req, res) => {
    const userId = req.userId;
    try {
        const result = SaveTask.find({category: req.body.taskType, userId: userId}).select('taskId');
        if(result.length===0) {
            res.status(404).json("no collection found")
        } else {
            const tasks = Task.find({_id: {$in: result}});
            res.status(200).json({message: `${tasks.length} number of tasks found`, tasks})
        }
    } catch(error) {
        res.status(502).json({message: `server error ::: ${error}`, tasks: []});
    }
}


module.exports = { createTask, getTask, saveTasks, userTaskActivity }
