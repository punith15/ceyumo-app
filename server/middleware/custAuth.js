const jwt = require('jsonwebtoken')
const Customer = require('../models/customerRegister')


const custAuth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const customer = await Customer.findOne({_id:decode._id, "tokens.token" : token})
        console.log(customer)
        if(!customer){
            throw new Error()
        }

        req.token = token
        req.customer = customer
        next()
    } catch (error) {
        res.status(401).send('Please Authenticate')
    }
}

module.exports = custAuth;