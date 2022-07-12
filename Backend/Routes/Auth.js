const router = require('express').Router()
const user = require('../Models/user')
const bcrypt = require('bcrypt')
const Token = require('../Models/token')
const sendEmail = require('../Utils/sendEmail')
const crypto = require('crypto')

//user login authentication
router.post('/userauth', async (req,res)=>{
    try{
        //check for existing users
    const users = await user.findOne({email:req.body.email})
    if(!users){
        return res.send({message:'No user with that email'})
    }
    //check password
    const validPassword = await bcrypt.compare(
        req.body.password, users.password
    )
    
    if(!validPassword){
        return res.send({message:"Inavlid password"})
    }
    //check user verification
    if(!users.verified){
        let token = await Token.findOne({userId:users._id})
        //if not verified and no token create a token
        if(!token){
            token = await new Token({
                userId:users._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save()
        //if not verified but have a token send an email
            const url = `http://localhost:1234/user/${users.id}/verify/${token.token}`
            await sendEmail(users.email, "Verify Email", url)
        }
        return res.send({message:'Verify the email sent to your account'})
    }
    //login auth token 
    const token = users.generateAuthToken()
    
    res.send({ data:token, message:"Successfully logged in"})
    }
    catch(error){
        res.send({message:'Internal server error'})
    }
})




module.exports = router