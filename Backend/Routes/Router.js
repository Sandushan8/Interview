const router = require('express').Router()

const user = require('../Controller/usercontroller')
const todo = require('../Controller/todoController')

//user routes
router.get('/user',user.find)
router.get('/user/:email',user.findone)
router.get('/user/:id/verify/:token', user.verify)
router.post('/user',user.create)
router.patch('/user/:email',user.updatepassword)

//ToDo routes
router.get('/todo',todo.find)
router.post('/todo',todo.create)
router.put('/todo/:id',todo.update)
router.delete('/todo/:id',todo.delete)


module.exports = router