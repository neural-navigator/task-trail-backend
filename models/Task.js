const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["draft", "published"]
    },
    token: {
        type: Number,
        required: true
    },
    rewardType: {
        type: String,
        required: true
    },
    rewardAmount: {
        type: Number,
        required: false
    },
    numGigs: {
        type: Number,
        required: true
    },
    lifetime: {
        type: Number,
        required: true
    },
    refLink: {
        type: String,
        required: false
    },
    taskType: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task
