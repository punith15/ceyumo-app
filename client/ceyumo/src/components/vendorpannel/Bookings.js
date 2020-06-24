import React, { useState } from 'react'
import '../partials/Modal'
import Modal from '../partials/Modal'
import Pagination from '../partials/Pagination'

class Bookings extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view : false,
            modalbooking : {},
            bookings : [],
            total : 0,
            today : 0,
            pending : 0,
            loading : true
        }
        this.onHandleView = this.onHandleView.bind(this)
        this.fetchBookings = this.fetchBookings.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    fetchBookings = async()=>{
        const token = sessionStorage.getItem('vendorToken')
        const bookingRes = await fetch('/get-bookings', {
            method : 'get',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const bookingObj = await bookingRes.json()
        console.log(bookingObj)
        if(bookingObj.bookings){
            const pending = bookingObj.bookings.filter(book=>{
                return book.status == "PENDING"
            })
            const todaybookings = bookingObj.bookings.filter(book=>{
                return new Date(book.createdAt).toISOString().slice(0,10) == new Date().toISOString().slice(0,10)
            })
            this.setState({
                bookings : bookingObj.bookings,
                total : bookingObj.bookings.length,
                today : todaybookings.length,
                pending : pending.length,
                loading : false
            })
            console.log(bookingObj)
        }
        
        
    }

    componentDidMount(){
        this.fetchBookings()
    }

    onHandleView = (e)=>{
        console.log('clicked')
        e.preventDefault()
        console.log(JSON.parse(e.target.value))
        this.setState({
            ...this.state,
            view : true,
            modalbooking : JSON.parse(e.target.value)
        })
    }

    handleClose = (e)=>{
        e.preventDefault()
        this.setState({
            ...this.state,
            view : false
        })
        this.fetchBookings()
    }

    render(){
    return(
        <div className="container-fluid" id="dashboard">
            <div>
                {this.state.view ? <Modal booking={this.state.modalbooking} handleClose={this.handleClose} /> : ''}
                <div className="dash-heading">
                    <span className="dash-icon"><i className="fa fa-book"></i></span>
                    <h6>/ Bookings</h6>
                </div>
                <div>
                    <div className="booking-count-block">
                        <div className="col-md-4 booking-count ">
                            <div style={{display:'flex'}}>
                                <div>
                                <h6>Total Bookings</h6>
                                <h2 className="bookings-total">{this.state.total}</h2>
                                </div>
                                <span className="bookings-icon">
                                <i className="fa fa-flag bk-total"></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4 booking-count">
                            <div style={{display:'flex'}}>
                                <div>
                                <h6>Today Bookings</h6>
                                <h2 className="bookings-today">{this.state.today}</h2>
                                </div>
                                <span className="bookings-icon">
                                <i className="fa fa-flag bk-today"></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4 booking-count">
                        <div style={{display:'flex'}}>
                                <div>
                                <h6>Total Pending</h6>
                                <h2 className="bookings-pending">{this.state.pending}</h2>
                                </div>
                                <span className="bookings-icon">
                                <i className="fa fa-flag bk-pending"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                    <table className="table table-striped booking-list">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Service</th>
                            <th scope="col">Event Day</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            { !this.state.loading ? this.state.bookings ? this.state.bookings.map((booking, i)=>{
                                return <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{booking.name}</td>
                                <td>{booking.phone}</td>
                                <td style={{textTransform:'capitalize'}}>{booking.servicename}</td>
                                <td>{booking.eventdate}</td>
                                {booking.status == "PENDING" ? 
                                    <td style={{textTransform:'uppercase'}}><span className="badge badge-danger text-center">{booking.status}</span></td> : ''
                                }
                                {booking.status === "IN PROGRESS" ? 
                                    <td><span className="badge badge-warning text-center">{booking.status}</span></td> : ''
                                }
                                {booking.status === "COMPLETED" ? 
                                    <td style={{textTransform:'uppercase'}}><span className="badge badge-success text-center">{booking.status}</span></td> : ''
                                }
                                
                                <td className="action"><button value={JSON.stringify(booking)} className="view-btn btn btn-primary"
                                 onClick={this.onHandleView} >VIEW</button></td>
                                </tr>
                            }) : <h4 style={{marginLeft:"20px"}}>No Bookings Available !!!</h4> :
                            <div class="loader"></div>}
                            
                        </tbody>
                        </table>
                        <Pagination/>
                    </div>

                </div>
            </div>
        </div>
    )
    }
}

export default Bookings;