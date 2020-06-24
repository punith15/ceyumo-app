import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../partials/Spinner'
import Alert from '../partials/Alert'

const CustomerRegister = ()=> {

    const [customer, setCustomer] = useState([])
    const [created, isCreated] = useState(false)
    const [message, setMessage] = useState([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const fetchCustomer = async ()=>{
        
        const data = await fetch('http://localhost:5000/register-customer',{
            method : 'post',
            body : JSON.stringify(customer),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const custm = await data.json()
        console.log(custm.error)
        if(!custm.error){
            setLoading(false)
            setCustomer([])
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setPhone('')
            isCreated(true)
            setMessage(["Registered Successfully, Now Please Login", "alert alert-success alert-dismissible fade show"])
        }else{
            isCreated(true)
            setLoading(false)
            setMessage([custm.error, "alert alert-danger alert-dismissible fade show"])
        }


    }

    // useEffect(()=>{
    //     fetchCustomer();
    // },[customer])

    const onNameChange = (e)=>{
        setName(e.target.value)
    }

    const onUsernameChange = (e)=>{
        setUsername(e.target.value)
    }

    const onEmailChange = (e)=>{
        setEmail(e.target.value)
    }

    const onPasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const onPhoneChange = (e)=>{
        setPhone(e.target.value)
    }

    const onHandleSubmit = (e)=>{
        e.preventDefault();
        const terms = document.getElementById('acceptterms').checked;
        console.log(terms)
        if(terms){
            const cust = { name : name, username : username, 
                email : email, password : password, phone : phone}

            //console.log(cust)
            setCustomer(customer.push(cust))
            setLoading(true)
            //console.log(customer)
            fetchCustomer()
        }
        
    }

    // render(){
        return(
            <>
            <div className="login-form">
                <div className="col-md-6 register-right-image">
                    <h3>CEYUMO</h3>
                    <p>Get Started With The Most Exiting Services We Offer !!</p>
                    {loading ? <Spinner/> : null}
                    {created ? <Alert message={message[0]} cls={message[1]} /> : null}
                </div>
    
                <div className="col-md-6">
                <div className="login-form-main">
                <h3>Customer Registration</h3>
                <form onSubmit={onHandleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={name} id="name" onChange={onNameChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" value={username} id="username" onChange={onUsernameChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" value={email} id="email" onChange={onEmailChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={password} id="password" onChange={onPasswordChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" value={phone} id="phone" onChange={onPhoneChange} required/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="acceptterms" required/>
                        <label className="form-check-label" htmlFor="acceptterms">Accept 
                        <Link to="/loginform/customer">
                         Terms & Conditions
                         </Link>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                    <p>Already Registered ? 
                        <Link to="/loginform/customer">
                         Login Now
                         </Link>
                    </p>
                </form>
                </div>
                </div>
            </div>
            <hr className="bottom-line"/>
            </>
        )
        // }
    
}

export default CustomerRegister;