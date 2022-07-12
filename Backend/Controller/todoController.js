const todo = require('../Models/todo')


//create a todo
exports.create = async (req,res)=>{
   const newtodo = new todo({
    task:req.body.task,
    date:req.body.date,
    time:req.body.time
   }) 

   await newtodo
   .save(newtodo)
   .then(data=>{res.send(data)})
   .catch(err=>{res.send(err)})
}
//find all todo
exports.find = async (req,res) =>{
    await todo.find().then(data=>{
        res.send(data)
    })
}
//update existing todo
exports.update = async (req,res) =>{
    let id = req.params.id
    await todo.findByIdAndUpdate(id,req.body)
    .then(data=>{
        res.send(data)
    })
}
//delete todo
exports.delete = async (req,res) =>{
    let id = req.params.id
    await todo.findByIdAndDelete(id)
    .then(res.send('success'))
}