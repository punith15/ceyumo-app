import React, { useState, useEffect } from 'react'
import ServiceNav from '../partials/ServiceNav'
import './ViewService.css'
import ViewServiceContent from './ViewServiceContent'
import VerticalLoader from '../partials/VerticalLoader'

class ViewService extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            service : {},
            vendor : {},
            loading : true
        }
        this.fetchService = this.fetchService.bind(this)
    }

    fetchService = async()=>{
        console.log(this.props.location.param1)
        const id = this.props.location.param1 !== undefined ? 
        this.props.location.param1 : sessionStorage.getItem('service_id')
        const token = sessionStorage.getItem('customerToken')
        const serviceRes = await fetch('/get-service/'+id, {
            method : 'get',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const serviceObj = await serviceRes.json()
        const vendorObj = JSON.parse(serviceObj.vendordata)
        this.setState({
            service : serviceObj,
            vendor : vendorObj[0],
            loading : false
        })
    
        sessionStorage.removeItem('viewService')
        sessionStorage.setItem('viewService', JSON.stringify(this.state.service))
        if(this.props.location.param1 !== undefined){
            sessionStorage.removeItem('service_id')
            sessionStorage.setItem('service_id',this.props.location.param1)
        }
        console.log(this.state.service)
    }

    componentDidMount(){
        this.fetchService()
    }

    render(){
    return(
        <div>
            <ServiceNav/>
            <div className="container view-service">
                {!this.state.loading ? <div>
                <div className="view-service-header">
                    <img className="view-service-img" src={this.state.service.avatar}/> 
                    <div className="business-name-header">
                    <h2 style={{fontWeight:'bold'}}>{this.state.vendor.business}</h2>
                    <p><i className="fa fa-home view-service-icon"></i>{this.state.vendor.address}
                        , {this.state.vendor.city}
                        , {this.state.vendor.state}
                    </p>
                    </div>
                </div>
                <div className="view-service-content">
                    <div className="vendor-info">
                    <ul className="list-group">
                        <li className="list-group-item">
                        <h6><i className="fa fa-phone view-service-icon"></i>{this.state.vendor.phone}</h6>
                        </li>
                        <li className="list-group-item">
                        <h6><i className="fa fa-envelope view-service-icon"></i>{this.state.vendor.email}</h6>
                        </li>
                    </ul>
                
                    </div>
                    <div className="vendor-gallery-book">
                        <ViewServiceContent servObj={this.state.service}/>
                    </div>
                </div>
                </div> : <VerticalLoader/>}
            </div>
        </div>
    )
    }
}

export default ViewService;