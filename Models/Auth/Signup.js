const mongoose = require('mongoose')

const userSignup = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    resetCode: {
        type: Number,
        default: 0,
      },
    date: {
        type: Date,
        default:Date.now
    }
})

module.exports=mongoose.model("oliveOilUsers",userSignup)