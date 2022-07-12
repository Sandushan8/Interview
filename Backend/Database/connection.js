const mongoose = require('mongoose')


//Database connection
const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.Mongo_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`Connection successfull: ${con.connection.host}`)
    }
    catch(err){
        console.log('Connection error!')
        process.exit(1)
    }
}

module.exports = connectDB