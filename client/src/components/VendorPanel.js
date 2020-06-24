import React, { useEffect,useState, useContext } from 'react'
import SidebarNav from './vendorpannel/SidebarNav';
import Unauthorised401 from './partials/Unauthorised401'
import {VendorContext} from './login/VendorContext'

class VendorPanel extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            vendor : [],
            login : false,
            token : ''
        }

        this.getToken = this.getToken.bind(this)
        //this.fetchVendor = this.fetchVendor.bind(this)
    }

    getToken = async()=>{
        const vendortoken = await sessionStorage.getItem('vendorToken')
        const tokenValid = vendortoken !== null
        console.log(tokenValid)
        this.setState({
            login : tokenValid,
            token : vendortoken
        })
        //console.log(localStorage.getItem('vendorToken'))
        //this.fetchVendor()
    }

    componentDidMount(){
        return this.getToken()
    }

    render(){
        return(
            <div>
                {this.state.login ? <SidebarNav token={this.state.token} /> : <Unauthorised401 user="vendor" />}
            </div>
        )
    }
    
}

export default VendorPanel;