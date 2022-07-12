const mongoose = require('mongoose')

//todo schema
const todo = new mongoose.Schema({
    task:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    }
})


const ToDoDB = mongoose.model('ToDoList',todo)

module.exports = ToDoDB