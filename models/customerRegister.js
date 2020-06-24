const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const customerRegister = new mongoose.Schema({
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
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},{
    timestamps : true
});

customerRegister.statics.findByCredentials = async (username, password)=>{

    const customer = await Customer.findOne({username})
    if(!customer){
        throw new Error('Unable to login !!!')
    }

    const isMatch = await bcrypt.compare(password, customer.password)
    if(!isMatch){
        throw new Error('Unable to login !!!')
    }

    return customer;
}

customerRegister.methods.generateAuthToken = async function(){
    const customer = this
    const token = await jwt.sign({_id:customer._id.toString()}, process.env.JWT_SECRET)
    customer.tokens = customer.tokens.concat({token})
    await customer.save()
    return token
}

customerRegister.pre('save', async function(next){
    const customer = this
    if(customer.isModified('password')){
        customer.password = await bcrypt.hash(customer.password, 8)
    }
    next();
})

const Customer = mongoose.model('Customer',customerRegister);
module.exports = Customer;