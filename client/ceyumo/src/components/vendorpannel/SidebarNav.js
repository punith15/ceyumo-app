import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import './SidebarNav.css'
import Dashboard from './Dashboard'
import Bookings from './Bookings'
import AddService from './AddService'

class SidebarNav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            status : false,
            login : false,
            loading : false,
            vendor : [],
            token : '',
            name : '',
            selectedMenu : 'dashboard'
        }
        this.getVendorFromSession = this.getVendorFromSession.bind(this)
        this.fetchLogout = this.fetchLogout.bind(this)
        this.onHandleProfile = this.onHandleProfile.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.onMenuSelected = this.onMenuSelected.bind(this)
        this.onMenuClick = this.onMenuClick.bind(this)
    }

    componentDidMount(){
        this.getVendorFromSession();
    }

    getVendorFromSession = ()=>{
        const vendorUser = sessionStorage.getItem('vendor')
        console.log(vendorUser)
        const vendorObj = JSON.parse(vendorUser)
        console.log(vendorObj)
        const tokenValid = this.props.token !== null
        this.setState({
            login : tokenValid,
            vendor : [this.state.vendor.push(vendorObj.vendor)],
            token : this.props.token,
            name : vendorObj.vendor.name
        })
        console.log(this.state.vendor[0].name)
    }

    fetchLogout = async()=>{
        const response = await fetch('/logout-vendor',{
            method: 'post',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.state.token}`
            }
        })
        console.log(response)
        this.setState({
            ...this.state,
            loading : false
        })
        if(!response.ok){
            this.setState({
                ...this.state,
                status : true
            })
        }
        if(this.state.login){
            try {
                sessionStorage.removeItem('vendorToken')
                sessionStorage.removeItem('vendor')
            } catch (error) {
                console.log(error.message)
            }
        }
        this.props.history.push("/")
    }

    onHandleSubmit = (e)=>{
        e.preventDefault()
        if(this.state.login){
            this.setState({
                ...this.state,
                loading : true
            })
            this.fetchLogout()
        }
    }

    onHandleProfile = (e)=>{
        e.preventDefault();
    }

    onMenuSelected = param => e =>{
        e.preventDefault()
        this.setState({
            selectedMenu : param
        })
        console.log(param)
    }

    onMenuClick = (e)=>{
        e.preventDefault()
        console.log(document.getElementById('side-nav').offsetWidth)
        if(document.getElementById('side-nav').offsetWidth <= 70){
            document.getElementById('side-nav').style.width = "250px";
            const menu = document.querySelectorAll('.menu')
            for (let index = 0; index < menu.length; index++) {
                menu[index].style.display = 'block'
            }
        }else{
            document.getElementById('side-nav').style.width = "70px";
            const menu = document.querySelectorAll('.menu')
            for (let index = 0; index < menu.length; index++) {
                menu[index].style.display = 'none'
            }
        }
    }

    render(){
    return(
        <>
        <div className="container-fluid vendor-panel">
                <div className="panel-nav">
                    <span onClick={this.onMenuClick}><i className="fa fa-bars hamburger"></i></span>
                    <h3 className="title">CEYUMO</h3>
                    <div className="dropdown show ml-auto">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.name}
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <ul className="list-group">
                            <li className="list-group-item" style={{cursor:'pointer'}} onClick={this.onHandleProfile}>Profile</li>
                            <li className="list-group-item" style={{cursor:'pointer',display: 'flex',
                                alignItems: 'center'}} onClick={this.onHandleSubmit}>
                                Logout
                                { this.state.loading ? 
                                <div className="clearfix ml-auto" style={{display:'inline-block'}}>
                                <div className="spinner-border float-right" style={{width:'20px',height:'20px'}} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </div> : ''}
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            <div className="side-nav-block">
                <div className="side-nav" id="side-nav">
                    <div>
                    <ul className="side-nav-list" id="side-nav-list">
                    <li className="list-item" onClick={this.onMenuSelected('dashboard')}>
                        <div>
                        <span><i className="fa fa-tachometer"></i></span>
                        <p className="menu">Dashboard</p>
                        </div>
                        {/* <hr style={{background:'rgba(255, 255, 255, 0.26)'}} className="menu-line"/> */}
                    </li>
                    <li className="list-item" onClick={this.onMenuSelected('bookings')}>
                        <div>
                        <span><i className="fa fa-book"></i></span>
                        <p className="menu">Bookings</p>
                        </div>
                        {/* <hr style={{background:'rgba(255, 255, 255, 0.26)'}} className="menu-line"/> */}
                    </li>
                    <li className="list-item" onClick={this.onMenuSelected('addservice')}>
                        <div>
                        <span><i className="fa fa-cog"></i></span>
                        <p className="menu">Add Service</p>
                        </div>
                        {/* <hr style={{background:'rgba(255, 255, 255, 0.26)'}} className="menu-line"/> */}
                    </li>
                    </ul>
                    </div>
                </div>
                <div className="side-main">
                    { SelectedMenu(this.state.selectedMenu) }
                </div>
            </div>
        </div>
        </>
    )
    }
}

const SelectedMenu = (menu)=>{
    if(menu == 'addservice'){
        return <AddService/>
    }else if(menu == 'bookings'){
        return <Bookings/>
    }else{
        return <Dashboard/>
    }
}

export default withRouter(SidebarNav);