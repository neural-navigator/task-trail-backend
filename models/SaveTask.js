const mongoose = require("mongoose");

const TaskSaveSchema = mongoose.Schema({
    taskId: {
        type: String,
        requied: true
    },
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})


const TaskSaver = mongoose.model('user-task-link', TaskSaveSchema);

module.exports = TaskSaver;