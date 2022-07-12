const userDB = require('../Models/user')
const bcrypt = require('bcrypt')
const Token = require('../Models/token')
const sendEmail = require('../Utils/sendEmail')
const crypto = require('crypto')


//New user
exports.create = async (req,res)=>{
    
    //check if user already registered
    let checkuser = await userDB.findOne({email:req.body.email})
    if(checkuser){
        console.log('user exists')
        return res.send({message:'User exists'})
   
    }
    // hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashpassword = await bcrypt.hash(req.body.password,salt)

    //create new user
    const newuser = new userDB({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:hashpassword
    })
    console.log(newuser)
    //save new user
    checkuser = await newuser.save(newuser).catch(err=>{res.send({message:`${err}`})})
    //generate a token for that user for verification
    const token = await new Token({
        userId:checkuser._id,
        token: crypto.randomBytes(32).toString('hex')
    }).save()
    //send and email to the user for verification
    const url = `http://localhost:1234/user/${checkuser.id}/verify/${token.token}`
    await sendEmail(checkuser.email, "Verify Email", url)
    res.send({message:"Verify the email sent to your account"})
}

//verify user
exports.verify = async (req,res)=>{
    try {
        //check if user id in link is ok
        const user = await userDB.findOne({_id:req.params.id})
        if(!user){
            return res.send({message:"Invalid link"})
        }
        //check if token in link is ok
        const token = await Token.findOne({
            userId: user._id,
            token:req.params.token
        })
        if(!token){
            return res.send({message:"Invalid link"})
        }
        //if valid link then update user verified to true and remove the generated token
        await userDB.updateOne({ _id: user._id},{verified: true });
		await token.remove()
        res.send({message: "success"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}







//get user details
exports.find = (req,res)=>{
    userDB.find().then(data=>{
        res.send(data)
    })
}
//get one user detail
exports.findone = (req,res)=>{
    let uemail = req.params.email
    userDB.findOne({email:uemail}).then(data=>{
        res.send(data)
    })
}
//update user detailsp;
exports.updatepassword = async (req,res)=>{
    let remail = req.params.email
    console.log(remail,req.body.password)
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashpassword = await bcrypt.hash(req.body.password,salt)
   
    await userDB.updateOne({email:remail}, {$set:{password:hashpassword}})
    .then(res.send({message:'Success'}))
}
