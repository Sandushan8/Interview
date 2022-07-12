const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const Router = require('./Routes/Router')
const authRoute = require('./Routes/Auth')
const resetRoute = require('./Routes/passwordr')
const connection = require('./Database/connection')
require('dotenv').config()

const app = express()

//middleware and DB connection
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
connection()

//Routes
app.use('/',Router)
app.use('/auth',authRoute)
app.use('/resetp',resetRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server Running in http://localhost:3000`)
})