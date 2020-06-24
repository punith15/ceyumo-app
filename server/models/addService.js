const mongoose = require('mongoose')
const validator = require('validator')

const addService = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    service : {
        type : Array,
        required : true
    },
    avatar : {
        type : String
    },
    gallery : {
        type : Array
    },
    city : {
        type : String
    },
    vendordata : {
        type : String
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Vendor'
    }
},
{
    timestamps : true
})

addService.virtual('vendor',{
    ref : 'Vendor',
    localField : '_id',
    foreignField : 'owner'
})

module.exports = mongoose.model('Services', addService)