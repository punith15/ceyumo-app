const express = require('express')
const router = express.Router();
const fs = require('fs')
const Customer = require('../models/customerRegister')
const Vendor = require('../models/vendorRegister')
const mongoose = require('mongoose')
const key = require('../config/key')
const custAuth = require('../middleware/custAuth')
const vendorAuth = require('../middleware/vendorAuth')
const path   = require('path');
const multer = require('multer')
const sharp = require('sharp')
const AddService = require('../models/addService')
const Bookings = require('../models/booknow')

mongoose.connect(key.mongodbUrl, 
    {useCreateIndex : true, 
    useNewUrlParser : true ,
    useUnifiedTopology: true
})

router.get('/customers', async(req,res)=>{
    try {
        const customer = await Customer.find({})
        res.send(customer)
    } catch (error) {
        res.status(404).send({error : error.message})
    }
})

router.get('/get-customer',custAuth, (req,res)=>{
    try {
        const customer = req.customer
        res.send(customer)
    } catch (error) {
        res.status(500).send({error : error.message})
    }
})

router.get('/vendors', vendorAuth, (req,res)=>{
    //console.log(req.vendor)
    try {
        console.log(req.vendor)
        const vendor = req.vendor
        res.send(vendor)
    } catch (error) {
        res.status(404).send({error : error.message})
    }
})

router.get('/vendors/:id', async(req,res)=>{
    //console.log(req.vendor)
    try {
        const vendor = await Vendor.findById(req.params.id)
        res.send(vendor)
    } catch (error) {
        res.status(404).send({error : error.message})
    }
})

router.get('/service-filter', async (req,res)=>{
    try {
        console.log(req.query.services)
        console.log(req.query.city)
        const serv = req.query.services
        if(req.query.city === '' && req.query.services !== ''){
            const services = await AddService.find({service : {$in : serv}}) //, city : req.params.city}
            res.send(services)
        }
        else if(req.query.city !== '' && req.query.services === ''){
            const services = await AddService.find({city : req.query.city})
            res.send(services)
        }
        else if(req.query.city !== '' && req.query.services !== ''){
            const services = await AddService.find({service : {$in : serv}, city : req.query.city})
            res.send(services)
        }
        
    } catch (error) {
        res.status(500).send({error : error.message})
    }
})

router.post('/register-customer', async (req,res)=>{
    // console.log(req.body[0])
    const customer = new Customer({
        name : req.body[0].name,
        username : req.body[0].username,
        email : req.body[0].email,
        password : req.body[0].password,
        phone : req.body[0].phone
    });
    try {
        const token = await customer.generateAuthToken()
        res.status(201).send({customer,token})
    } catch (error) {
        res.status(400).send({error : error.message})
    }
})

router.post('/register-vendor', async(req,res)=>{
    const data = req.body[0]
    //console.log(req.body)
    
    const vendor = new Vendor({
        name : data.name,
        username : data.username,
        business : data.business,
        phone : data.phone,
        address : data.address,
        state : data.state,
        city : data.city,
        zip : data.zip,
        email : data.email,
        password : data.password,
        service : data.service
    })
    // console.log(vendor)
    // res.send(vendor)
    try {
        const token = await vendor.generateAuthToken()
        res.status(201).send({vendor,token})
    } catch (error) {
        res.status(400).send({error : error.message})
    }
})

router.post('/login-customer',async (req,res)=>{
    console.log(req.body)
    try {
        const customer = await Customer.findByCredentials(req.body.username, req.body.password);
        const token = await customer.generateAuthToken()
        console.log(token)
        await customer.save()
        res.send({customer, token})
    } catch (error) {
        console.log(error.message)
        res.status(404).send({error :error.message})
    }
})

router.post('/login-vendor',async (req,res)=>{
    try {
        const vendor = await Vendor.findByCredentials(req.body.username, req.body.password);
        const token = await vendor.generateAuthToken()
        res.send({vendor,token})
    } catch (error) {
        res.status(404).send({error :error.message})
    }
})

router.post('/logout-vendor', vendorAuth,async(req,res)=>{
    try {
        console.log(req.vendor)
        req.vendor.tokens = await req.vendor.tokens.filter(token=>{
            return token.token !== req.token
        })
        req.vendor.save()
        res.send()
    } catch (error) {
        res.status(401).send('Please Authenticate')
    }
})

router.post('/logout-customer', custAuth,async(req,res)=>{
    try {
        console.log('customer logout')
        req.customer.tokens = await req.customer.tokens.filter(token=>{
            return token.token !== req.token
        })
        req.customer.save()
        res.send()
    } catch (error) {
        res.status(401).send('Please Authenticate')
    }
})

const storageEngine = multer.diskStorage({
    destination : function(req, file, callback){
        let dir = './images'

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        callback(null, dir)
    },
    filename: function(req, file, fn){
        fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    }
}); 

const upload = multer({
    storage : storageEngine,
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload image'))
        }
        cb(undefined,true)
    }
})

router.post('/upload-header-images', upload.single('avatar'), async (req, res)=> {
    try {
        res.send(JSON.stringify({avatar : req.file.path}))
    } catch (error) {
        res.status(500).send()
    }
    
})

router.post('/upload-gallery-images', upload.array('gallery', 3), async function (req, res, next){
   
    const gallery = []
    try {
        req.files.map(file=>{
            gallery.push(file.path)
        })
        res.send(JSON.stringify({gallery : gallery}))
    } catch (error) {
        res.status(500).send()
    }
    
})

router.post('/addservice', vendorAuth, async(req,res)=>{
    console.log(req.body)
    const service = new AddService({
        title : req.body.title,
        description : req.body.description,
        service : req.body.service,
        avatar : req.body.avatar,
        gallery : req.body.gallery,
        city : req.body.vendordata[0].city,
        vendordata : JSON.stringify(req.body.vendordata),
        owner : req.vendor._id
    })
    try {
        await service.save()
        console.log(service)
        res.status(201).send(JSON.stringify({success : 'ok'}))
    } catch (error) {
        res.status(500).send({error : error.message})
    }
    res.send()
})

router.get('/get-services', async(req,res)=>{
    try {
        const services = await AddService.find({})
        //console.log(services)
        res.send(services)
        //res.send(JSON.stringify(services))
    } catch (error) {
        res.status(404).send({error : error.message})
    }
})

router.get('/get-service/:id', custAuth,async(req,res)=>{
    try {
        const services = await AddService.findById(req.params.id)
        //console.log(services)
        res.send(services)
        //res.send(JSON.stringify(services))
    } catch (error) {
        res.status(404).send({error : error.message})
    }
})

router.post('/booking', custAuth, async(req, res)=>{
    
    const booking = new Bookings({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        servicename : req.body.servicename,
        eventdate : req.body.eventdate,
        address : req.body.address,
        state : req.body.state,
        city : req.body.city,
        zip : req.body.zip,
        status : "PENDING",
        serviceid : req.body.serviceid,
        vendorid : req.body.vendorid
    })

    console.log(booking)
    //res.send()

    try {
        const book = await booking.save()
        console.log(book)
        res.status(201).send(book)
    } catch (error) {
        res.status(500).send({error : error.message})
        console.log(error.message)
    }
})

router.get('/get-bookings', vendorAuth, async(req, res)=>{
    try {
        const bookings = await Bookings.find({vendorid : req.vendor._id})
        
        console.log(bookings)

        res.send({bookings : bookings})
        
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.get('/get-booking-count', vendorAuth,async(req,res)=>{
    try {
        const bookings = await Bookings.find({vendorid : req.vendor._id})
        if(bookings){
            const pending = bookings.filter(book=>{
                return book.status == "PENDING"
            })
            const inprogress = bookings.filter(book=>{
                return book.status == "IN PROGRESS"
            })
            const completed = bookings.filter(book=>{
                return book.status == "COMPLETED"
            })
            
            res.send({total : bookings.length, pending : pending.length, inprogress : inprogress.length, completed : completed.length})
        }else{
            res.send([])
        }
        
    } catch (error) {
        res.status(500).send({error : error.message})
    }
})

router.patch('/change-status/:id', async(req, res)=>{
    console.log(req.body.status)
    try {
        const booking = await Bookings.findByIdAndUpdate(req.params.id, {
            status : req.body.status
        })
        await booking.save();
        console.log(booking)
        res.send()
    } catch (error) {
        res.status(500).send({error : error.message})
        console.log(error.message)
    }
})

module.exports = router;