import React, { useState, useContext, useEffect } from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import Spinner from '../partials/Spinner'
import Alert from '../partials/Alert'

const LoginForm = props =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, isLogin] = useState(false)
    const [message, setMessage] = useState([])
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    // useEffect(()=>{
    //     localStorage.clear();
    // },[])

    const fetchData = async()=>{
        // console.log(props.match.params.user)
        if(props.match.params.user === 'customer'){
            const custLogin = await fetch('/login-customer',{
                method : "post",
                body : JSON.stringify({
                    username : username,
                    password : password
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            
            const custData = await custLogin.json()
            console.log(custData)
            isLogin(true)
            if(!custData.error){
                setLoading(false)
                setMessage(["Login Successfull !!!", "alert alert-success alert-dismissible fade show"])
                setRedirect(true)
                sessionStorage.setItem('customerToken',custData.token)
                sessionStorage.setItem('customer',JSON.stringify(custData))
                props.history.push("/services")
            }else{
                setMessage(["Unable to login !!!", "alert alert-danger alert-dismissible fade show"])
                setLoading(false)
            }

        }else if(props.match.params.user === 'vendor'){
            const vendorLogin = await fetch('/login-vendor',{
                method : "post",
                body : JSON.stringify({
                    username : username,
                    password : password
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            const vendotData = await vendorLogin.json()
            isLogin(true)
            if(!vendotData.error){
                setLoading(false)
                setRedirect(true)
                sessionStorage.setItem('vendorToken',vendotData.token)
                sessionStorage.setItem('vendor',JSON.stringify(vendotData))
                props.history.push("/vendorpanel")
                //setMessage(["Login Successfull !!!", "alert alert-success alert-dismissible fade show"])
            }else{
                setLoading(false)
                setMessage(["Unable to login !!!", "alert alert-danger alert-dismissible fade show"])
            }
        }
    }

    const onUsernameChange = (e)=>{
        setUsername(e.target.value)
    }

    const onPasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const onHandleSubmit = (e)=>{
        e.preventDefault();
        try {
            sessionStorage.removeItem('customer')
            sessionStorage.removeItem('customerToken')
            sessionStorage.removeItem('vendorToken')
            sessionStorage.removeItem('vendor')
        } catch (error) {
            console.log(error.message)
        }
        setLoading(true)
        setMessage([])
        fetchData()
    }

    return(
        <div>
        <div className="login-form">
            <div className="login-main">
            <div>
            {loading ? <Spinner/> : ''}
            </div>
            {login ? <Alert message={message[0]} cls={message[1]} /> : ''}
            <div className="login-form-main col-md-5">
            <h3>Login</h3>
            <form onSubmit={onHandleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" 
                    onChange={onUsernameChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" 
                    onChange={onPasswordChange} required/>
                </div>
                
                {props.match.params.user === 'customer' ?
                    (
                        <>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                        {/* {redirect ? <Redirect to="/service" /> : ''} */}
                        <p>New to CEYUMO ? 
                            <Link to="/customer-register">
                            Register Now
                            </Link>
                        </p>
                        </>
                    ) :
                    (   
                        <>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                        {/* {redirect ? <Redirect to="/vendorpanel" /> : ''} */}
                        <p>New to CEYUMO ? 
                            <Link to="/vendor-register">
                            Register Now
                            </Link>
                        </p>
                        </>
                    )
                }
                
            </form>
            </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(LoginForm);