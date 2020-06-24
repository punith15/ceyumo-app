const jwt = require('jsonwebtoken')
const Vendor = require('../models/vendorRegister')


const vendorAuth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const vendor = await Vendor.findOne({_id:decode._id, "tokens.token" : token})

        if(!vendor){
            throw new Error()
        }
        
        req.token = token
        req.vendor = vendor
        next()
    } catch (error) {
        res.status(401).send('Please Authenticate')
    }
}

module.exports = vendorAuth;