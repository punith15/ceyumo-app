import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const ServiceNav = props=>{

    const fetchLogout = ()=>{
        const token = sessionStorage.getItem('customerToken')
        console.log(token)
        const custLogout = fetch('/logout-customer', {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        
        if(custLogout){
            sessionStorage.removeItem('customerToken')
            sessionStorage.removeItem('customer')
            sessionStorage.removeItem('service_id')
            sessionStorage.removeItem('viewService')
            props.history.push('/')
        }
    }

    const onLogout = (e)=>{
        e.preventDefault()
        fetchLogout()
    }

    return(
        <>
        <nav className="navbar service-navbar navbar-expand-lg">
            <a className="service-navbar-brand" href="#">CEYUMO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" >
                <i className="fa fa-navicon"></i>
                </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <span className="logout-cust" onClick={onLogout}><i className="fa fa-sign-out user-icon"/> LOGOUT</span>
                </li>
                </ul>
            </div>
        </nav>
        <hr style={{width:'100%',height:'1px',background:'grey',display:'block',margin:'0',opacity:'0.5'}}/>
        </>
    )
}

export default withRouter(ServiceNav);