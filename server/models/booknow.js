const mongoose = require('mongoose')
const validator = require('validator')

const bookNow = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Mobile number not valid')
            }
        }
    },
    email : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    servicename : {
        type : String,
        required : true
    },
    eventdate : {
        type : Date,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    serviceid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    vendorid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Bookings', bookNow)