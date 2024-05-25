const mongoose = require('mongoose');

const todoschema = mongoose.Schema({
    description:String,
    status:String
})

const todoModel = mongoose.model('todo',todoschema);
module.exports = todoModel;