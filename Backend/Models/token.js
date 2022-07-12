const mongoose = require('mongoose')
const Schema = mongoose.Schema

//token schema
const tokenS = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "users",
		unique: true,
	},
	token: { 
        type: String, 
        required: true 
    },
	createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 3600 
    }
})


const tokenDB = mongoose.model('token',tokenS)

module.exports = tokenDB