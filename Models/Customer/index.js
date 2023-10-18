const mongoose = require('mongoose')

const customerModel = mongoose.Schema({
    CustomerId: {
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref:'orderData'
    },
    Name: {
        type: String,
        required:true
    },
    City: {
        type: String,
        required:true
    },
    NationalId: {
        type: String,
    },
    Phone: {
        type: String,
        required:true
    },
    OilProcessed: {
        type: String,
        required:true
    },
    OrderId: {
        type: String,
        required:true
    },
    CustomerType: {
        type: String,
        required:true
    },
    Loyalty: {
        type: String,
        required:true
    },
   
    date: {
        type: Date,
        default:Date.now
    }
    
})

module.exports=mongoose.model('customerData',customerModel)