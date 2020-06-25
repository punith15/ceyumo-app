import React, {useState, useEffect} from 'react'
import SelectStateCity from '../partials/SelectStateCity'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import Spinner from '../partials/Spinner'
import Alert from '../partials/Alert'

const BookNow = props=>{
    const [selectedDate, handleDateChange] = useState(new Date());
    const [state, setState] = useState('');
    const [districts, setDistricts] = useState([]);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [customerData, setCustomerData] = useState([])
    const [bookingObj, setBookingObj] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const fetchBooking = async()=>{
        const token = sessionStorage.getItem('customerToken')
        console.log(token)
        console.log(bookingObj)
        const bookingRes = await fetch('/booking', {
            method : 'post',
            body : JSON.stringify(bookingObj[0]),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        setLoading(false)
        console.log(bookingRes.status)
        //const books = await bookingRes.json()
        if(bookingRes.status == 201){
            setMessage("Booking Successfull !!!")
        }else{
            setMessage("Unable to Book, Try again !!!")
        }
        handleDateChange(new Date())
        setState('')
        setDistricts([])
        setAddress('')
        setCity('')
        setZip('')
        setCustomerData([])
        setBookingObj([])
    }

    const fetchDistricts = async ()=>{
        const data = await fetch(`https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${state}`)
        const myarray = await data.json()

        let arr = [...new Set(myarray.map(dist=>dist.District))]
        setDistricts(arr)
    }

    const fetchCustomer = async()=>{
        const token = sessionStorage.getItem('customerToken')
        const customerRes = await fetch('/get-customer', {
            method : 'get',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const customerObj = await customerRes.json()
        setCustomerData([...customerData, customerObj])
    }

    useEffect(()=>{
        fetchDistricts();
        fetchCustomer()
    },[state])

    const onAddressChange = (e)=>{
        setAddress(e.target.value)
    }

    const onStateChange = (e)=>{
        let stateName = e.target.value;
        if(stateName !== 'Choose...'){
            console.log(stateName)
            setState(stateName)
        }
    }

    const onCityChange = (e)=>{
        let cityName = e.target.value;
        if(cityName !== 'Choose...'){
            setCity(cityName)
        }
    }

    const onZipChange = (e)=>{
        setZip(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(selectedDate)
        const customer = customerData[0]
        const data = {name : customer.name, phone : customer.phone, email : customer.email, 
        servicename : props.service.service[0], eventdate : selectedDate, address : address, state : state, 
        city : city, zip : zip, serviceid : props.service._id, vendorid : props.service.owner }
        setBookingObj(bookingObj.push(data))
        fetchBooking()
        setLoading(true)
        console.log(data)
    }

    return(
        <div>
            <div className="book-now-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" 
                        onChange={onAddressChange} id="address" placeholder="Enter Address" value={address}/>
                    </div>
                    
                    <SelectStateCity style={{paddingLeft : '0'}} onStateChange={onStateChange} 
                    onCityChange={onCityChange} onZipChange={onZipChange} zip={zip} districts={districts}
                    />

                    <div className="form-group">
                        <label htmlFor="event-date">Event Date and Time</label>
                        {/* <input id="event-date" className="form-control" type="datetime-local" name="event-date"/> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <DateTimePicker value={selectedDate} format="dd/MM/yyyy HH:mm" className="form-control" onChange={handleDateChange} 
                                />
                            </MuiPickersUtilsProvider>
                    </div>
                    <div style={{display:'flex'}}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                        <div style={{marginLeft:'20px'}}>
                        {loading ? <Spinner/> : ''}
                        {message ? <h5 style={{color:'red'}}>{message}</h5> : ''}
                        </div>
                    </div>
                    
                </form>
                
            </div>
        </div>
    )
}

export default BookNow;