const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const vendorRegister = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    business : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : String,
        required : true,
        minlength : 10,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Phone number is not valid')
            }
        }
    },
    address : {
        type : String,
        required : true,
        trim : true
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
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        trim : true
    },
    service : {
        type : Array,
        required : true,
        minlength : 1
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},{
    timestamps : true
});

vendorRegister.statics.findByCredentials = async (username, password)=>{

    const vendor = await Vendor.findOne({username})
    if(!vendor){
        throw new Error('Unable to login !!!')
    }

    const isMatch = await bcrypt.compare(password, vendor.password)
    if(!isMatch){
        throw new Error('Unable to login !!!')
    }

    return vendor;
}

vendorRegister.methods.generateAuthToken = async function(){
    const vendor = this
    const token = await jwt.sign({_id:vendor._id.toString()}, process.env.JWT_SECRET)
    vendor.tokens = vendor.tokens.concat({token})
    await vendor.save()
    return token
}

vendorRegister.pre('save', async function(next){
    const vendor = this
    if(vendor.isModified('password')){
        vendor.password = await bcrypt.hash(vendor.password, 8)
    }
    next();
})

const Vendor = mongoose.model('Vendor',vendorRegister);
module.exports = Vendor;