const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//user schema
const user  =new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    contact:{
        type:String
    },
    password:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    }
})
// generate a token for login authentication
user.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id}, process.env.JWTPkey,{expiresIn:'7d'})
    return token
}

const userDB = mongoose.model('users',user)

module.exports = userDB