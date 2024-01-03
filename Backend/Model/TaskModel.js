const mongoose = require("mongoose")



const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true

    },
    task: {
        type: String,
        require: true,
    },
})

const task = mongoose.model('Task' , taskSchema);

module.exports = task;