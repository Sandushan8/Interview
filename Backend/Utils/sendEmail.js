const nodemailer = require('nodemailer')

module.exports = async (email,subject,text) =>{

    //creating transport
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'obtinterview1@outlook.com',
        pass: 'interview123',
    },
})

//creating option to send
const options = {
    from: "obtinterview1@outlook.com",
    to: email,
    subject: subject,
    text: text
}
//sending mail
transporter.sendMail(options, function(err,info){
    if(err){
        console.log(err)
        return
    }
    console.log("success")
})

}