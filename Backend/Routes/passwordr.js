const router = require('express').Router()
const userDB = require('../Models/user')
const Token = require('../Models/token')
const crypto = require("crypto")
const sendEmail = require('../Utils/sendEmail')
const bcrypt = require('bcrypt')

//send the password link
router.post('/', async (req,res) =>{
try{
    //check for user
    const user = await userDB.findOne({email:req.body.email})
    if(!user){
        return res.send({message:"User doesn't exist"})
    }
    //check token
    let token = await Token.findOne({ userId: user._id });
	if (!token) {
        // if token does not exist create new token
		token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex")
		}).save()
	}
    // if token exist send email
    const url = `http://localhost:1234/passreset/${user.id}/${token.token}`
    await sendEmail(user.email, "Password Reset", url)
    res.send({message:"Password reset link sent to email"})
}catch(error){
    res.send({message:`${error}`})
}          
    
})
//verify the link
router.get('/:id/:token', async (req,res)=>{
    try {
        //check if link is valid through id
        const user = await userDB.findOne({ _id: req.params.id })
        if(!user){
            return res.send({message:"Invalid Link"})
        }
        //check if link is valid through token
        const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		})
        if(!token){
            return res.send({message:"Invalid Link"})
        }
        //if both token and id valid then link is valid
        res.send({message:"success"})


    } catch (error) {
        res.send({message:`${error}`})
    }
})

//update password
router.post('/:id/:token', async (req,res)=>{
    try {
        //fetch user
        const user = await userDB.findOne({ _id: req.params.id })
        if(!user){
            return res.send({message:"Invalid Link"})
        }
        //fetch token
        const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		})
        if(!token){
            return res.send({message:"Invalid Link"})
        }
        // in case email is not verified
        if(!user.verified){
            user.verified = true
        }
        //hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
		const hashPassword = await bcrypt.hash(req.body.password, salt)
        //assign new password to user
        user.password = hashPassword
        await user.save()
        await token.remove()
        res.send({message:"Password reset successful!"})


    } catch (error) {
        res.send({message:`${error}`})
    }
})



module.exports = router

