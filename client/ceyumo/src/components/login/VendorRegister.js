import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../partials/Spinner'
import Alert from '../partials/Alert'
import SelectStateCity from '../partials/SelectStateCity'

const VendorRegister = ()=>{
    const [state, setState] = useState('');
    const [districts, setDistricts] = useState([]);
    const [vendor, setVendor] = useState([])
    const [name, setName] = useState('');
    const [username, setUsername] = useState('')
    const [business, setBusiness] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [service, setService] = useState([])
    const [created, isCreated] = useState(false)
    const [message, setMessage] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchVendor = async ()=>{
        console.log(vendor)
        const vendorData = await fetch('http://localhost:5000/register-vendor',{
            method:'post',
            body: JSON.stringify(vendor),
            headers :{
                "Content-Type" : "application/json"
            }
        })

        const vData = await vendorData.json()
        if(!vData.error){
            setLoading(false)
            setName('')
            setUsername('')
            setBusiness('')
            setPhone('')
            setAddress('')
            // document.getElementById('state').val("Choose...")
            // document.getElementById('city').val("Choose...")
            setZip('')
            setEmail('')
            setPassword('')
            setService([])
            setVendor([])
            document.getElementById('reg-photography').checked = false
            document.getElementById('reg-event-mgt').checked = false
            document.getElementById('reg-wed-planner').checked = false
            document.getElementById('reg-catering').checked = false
            document.getElementById('reg-makeup').checked = false
            document.getElementById('reg-travels').checked = false
            document.getElementById('reg-stage-decor').checked = false
            isCreated(true)
            setMessage(["Registered Successfully, Now Please Login", "alert alert-success alert-dismissible fade show"])
        }else{
            isCreated(true)
            setLoading(false)
            setMessage([vData.error, "alert alert-danger alert-dismissible fade show"])
        }
    }

    const fetchDistricts = async ()=>{
        const data = await fetch(`https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${state}`)
        const myarray = await data.json()

        let arr = [...new Set(myarray.map(dist=>dist.District))]
        setDistricts(arr)
    }

    useEffect(()=>{
        fetchDistricts();
    },[state])

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

    const onNameChange = (e)=>{
        setName(e.target.value)
    }

    const onUsernameChange = (e)=>{
        setUsername(e.target.value)
    }

    const onBusinessChange = (e)=>{
        setBusiness(e.target.value)
    }

    const onPhoneChange = (e)=>{
        setPhone(e.target.value)
    }

    const onAddressChange = (e)=>{
        setAddress(e.target.value)
    }

    const onZipChange = (e)=>{
        setZip(e.target.value)
    }

    const onEmailChange = (e)=>{
        setEmail(e.target.value)
    }

    const onPasswordChange = (e)=>{
        setPassword(e.target.value)
    }
        
    const onServiceChange = (e)=>{
        if(e.target.checked){
            setService([...service, e.target.value])
        }else{
            const arr = service.filter(function(item) {
                return item !== e.target.value
            })
            setService(arr)
        }
    }

    const onHandleSubmit = (e)=>{
        e.preventDefault();
        const data = {name : name, username : username, business : business, phone : phone,
                      address : address, state : state, city : city, zip : zip, email : email,
                    password : password, service : service}
        const terms = document.getElementById('acceptterms').checked
        if(terms && service.length > 0){
            setVendor(vendor.push(data))
            console.log(data)
            setLoading(true)
            fetchVendor();
        }else{
            isCreated(true)
            setLoading(false)
            setMessage(["Please check terms & conditions and select atleast one service", "alert alert-danger alert-dismissible fade show"])
        }
    }

    return(
        <>
        <div className="login-form">

            <div className="col-md-10 vendor-register">
            <div className="login-form-main">
            <h3>Vendor Registration</h3>
            <form onSubmit={onHandleSubmit}>
                <div style={{display:'flex'}}>
                <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={name} 
                    onChange={onNameChange} id="name" placeholder="Name" required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" value={username} 
                    onChange={onUsernameChange} id="username" placeholder="Username" required/>
                </div>
                </div>
                <div style={{display:'flex'}}>
                <div className="form-group col-md-6">
                    <label htmlFor="business-name">Business Name</label>
                    <input type="text" className="form-control" value={business} 
                    onChange={onBusinessChange} id="business-name" placeholder="Business Name" required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" value={phone} 
                    onChange={onPhoneChange} id="phone" placeholder="Phone" required/>
                </div>
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" value={address} 
                    onChange={onAddressChange} id="address" placeholder="address" required/>
                </div>

                <SelectStateCity onStateChange={onStateChange} 
                onCityChange={onCityChange} onZipChange={onZipChange} zip={zip} districts={districts}
                />

                <div style={{display:'flex'}}>
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" className="form-control" value={email} 
                    onChange={onEmailChange} id="email" placeholder="Email Address" required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={password} 
                    onChange={onPasswordChange} id="password" placeholder="Password" required/>
                </div>
                </div>
                <div className="form-group col-md-12">
                    <label>Services Offered</label>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="photogrphy" id="reg-photography"/>
                        <label className="custom-control-label" htmlFor="reg-photography">Photography</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="event management" id="reg-event-mgt"/>
                        <label className="custom-control-label" htmlFor="reg-event-mgt">Event Management</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="wedding planner" id="reg-wed-planner"/>
                        <label className="custom-control-label" htmlFor="reg-wed-planner">Wedding Planner</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="catering" id="reg-catering"/>
                        <label className="custom-control-label" htmlFor="reg-catering">Catering</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="makeup artist" id="reg-makeup"/>
                        <label className="custom-control-label" htmlFor="reg-makeup">Makeup Artist</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="travels" id="reg-travels"/>
                        <label className="custom-control-label" htmlFor="reg-travels">Travels</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={onServiceChange} value="stage decoration" id="reg-stage-decor"/>
                        <label className="custom-control-label" htmlFor="reg-stage-decor">Stage Decoration</label>
                    </div>
                </div>
                
                <div className="form-group col-md-12">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="acceptterms"/>
                    <label className="custom-control-label" style={{margin:"10px 0"}} htmlFor="acceptterms">Accept 
                    <Link to="/loginform">
                     Terms & Conditions
                     </Link>
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">REGISTER</button>
                <p>Already Registered ? 
                    <Link to="/loginform/vendor">
                     Login Now
                     </Link>
                </p>
                </div>
            </form>
            </div>
            </div>
        </div>
        {loading ? <Spinner/> : null}
        {created ? <Alert message={message[0]} cls={message[1]} /> : null}
        </>
    )
}

export default VendorRegister;