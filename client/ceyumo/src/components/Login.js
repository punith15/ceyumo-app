import React, { useContext } from 'react'
import './login/login.css'
import {Link} from 'react-router-dom'

const Login = ()=>{

    return(
        <>
        <div>
        <div className="login-bg">
        <div className="login-bg-col"></div>
        </div>
        <div className="initial-login">
            <div className="login-text">
                <h1>Experience The Best From CEYUMO !!!</h1>
                <p>One Stop Solution For All Your Events</p>
            </div>   
        
            <div className="login-div">
                <div className="login-block">
                    <h2>Customer Login</h2>
                    <Link to="/loginform/customer">
                    <button className="cust-login-continue btn btn-primary">CONTINUE</button>
                    </Link>
                </div>
                <div className="login-block">
                    <h2>Vendor Login</h2>
                    <Link to="/loginform/vendor">
                    <button className="serv-login-continue btn btn-success">CONTINUE</button>
                    </Link>
                </div>
            </div>
            <div>
            <Link to="/">
                <button type="button" className="login-go-back">Go Back</button>
                </Link>
            </div>
        </div>
        </div>
        </>
    )
}

const newTo = { 
    pathname: "/category/595212758daa6810cbba4104", 
    param1: "Par1" 
};

export default Login;