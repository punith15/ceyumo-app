import React, {Component, useState, useEffect} from 'react'
import '../vendorpannel/Panelmain.css'
import Dashboardchart from './Dashboardchart'

const Dashboard = ()=>{
    const [date, setDate] = useState(Date)
    const [pending, setPending] = useState(0)
    const [inprogress, setInprogress] = useState(0)
    const [completed, setCompleted] = useState(0)

    const fetchCount = async()=>{
        const token = sessionStorage.getItem('vendorToken')
        const bookingRes = await fetch('/get-booking-count', {
            method : 'get',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const bookingObj = await bookingRes.json()
        if(bookingObj){
            setPending(bookingObj.pending)
            setInprogress(bookingObj.inprogress)
            setCompleted(bookingObj.completed)
        }
    }

    useEffect(()=>{
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const d = new Date().toLocaleDateString("en-US",options)
        setDate(d)
        fetchCount()
    },[])
    
        return(
            <>
            <div className="container-fluid" id="dashboard">
                <div>
                    <div className="dash-heading">
                        <span className="dash-icon"><i className="fa fa-tachometer"></i></span>
                        <h6>/ Dashboard</h6>
                    </div>
                    <div className="dashboard-block1">
                        <div className="col-md-8 chart1">
                        {/* <div id="chartdiv"></div> */}
                            <Dashboardchart/>
                        </div>
                        <div className="col-md-4 status" style={{color:'white'}}>
                            <div className="status-box col-md-12" style={{background:'rgb(220,53,69)'}}>
                                <div className="col">
                                    <h6 className="m-b-25">Pending</h6>
                                    <h3 className="f-w-700 pending">{pending}</h3>
                                    <p className="m-b-0">{date}</p>
                                </div>
                            </div>
                            <div className="status-box col-md-12" style={{background:'rgb(255, 153, 0)'}}>
                                <div className="col">
                                    <h6 className="m-b-25">In Progress</h6>
                                    <h3 className="f-w-700 inprogress">{inprogress}</h3>
                                    <p className="m-b-0">{date}</p>
                                </div>
                            </div>
                            <div className="status-box col-md-12" style={{background:'rgb(0, 153, 51)'}}>
                                <div className="col">
                                    <h6 className="m-b-25">Completed</h6>
                                    <h3 className="f-w-700 completed">{completed}</h3>
                                    <p className="m-b-0">{date}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    
}

export default Dashboard;