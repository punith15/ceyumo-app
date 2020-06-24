import React, { useState ,useEffect } from 'react'
import Spinner from './Spinner'
import $ from 'jquery'
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Modal = props=>{
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const fetchStatusUpdate = async()=>{
        const statusRes = await fetch('/change-status/'+props.booking._id, {
            method : 'PATCH',
            body : JSON.stringify({status : status}),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        console.log(statusRes)
        //setMessage('Status updated...')
        //const statusObj = await statusRes.json()
        setLoading(false)
        if(statusRes.ok){
            setMessage('Status updated...')
        }else{
            setMessage('Error while updating status...')
        }
    }

    useEffect(()=>{
        console.log('Modal show')
        window.$('#exampleModal').modal('show');
    },[])

    const handleSaveChange = (e)=> {
        console.log(e.target.value)
        setStatus(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(status !== 'Choose...'){
            fetchStatusUpdate()
            setLoading(true)
        }
    }

    return(

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Booking Details</strong>
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6><strong style={{color:'green'}}>Name : </strong>{props.booking.name}</h6>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <h6><strong style={{color:'green'}}>Address : </strong>{props.booking.address}</h6>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <div style={{display:'flex'}}>
                                    <h6><strong style={{color:'green'}}>State : </strong>{props.booking.state}</h6>
                                    <h6 style={{marginLeft:'10px'}}><strong style={{color:'green'}}>City : </strong>{props.booking.city}</h6>
                                    <h6 style={{marginLeft:'10px'}}><strong style={{color:'green'}}>Zip : </strong>{props.booking.zip}</h6>
                                </div>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <h6><strong style={{color:'green'}}>Phone : </strong>{props.booking.phone}</h6>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <h6><strong style={{color:'green'}}>Email : </strong>{props.booking.email}</h6>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <h6><strong style={{color:'green'}}>Service : </strong>{props.booking.servicename}</h6>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <h6><strong style={{color:'green'}}>Event Date : </strong>{props.booking.eventdate}</h6>
                                <hr style={{background:'rgba(0,0,0,0.24)'}}/>

                                <div style={{display:'flex'}}>
                                {/* {ChangeStatusForm(props)} */}
                                <ChangeStatusForm onStatus={handleSaveChange}/>
                                <div className="modal-status">
                                    <h6>Current Status</h6>
                                    <p>{props.booking.status}</p>
                                </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={props.handleClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* data-dismiss="modal" */}
                                <button type="button" onClick={handleSubmit} className="btn btn-primary">Save changes</button>
                            </div>
                            {loading ? <Spinner/> : ''}
                            {message ? <h6>{message}</h6> : ''}
                        </div>
                    </div>
                </div>
    )
}

const ChangeStatusForm = props=>{
    return(
        <div style={{display:'flex',flexDirection:'column'}}>
        <h6 style={{color:'red'}}>Change Status</h6>
        <form>
            <div className="form-row align-items-center">
                <div className="col-auto my-1">
                <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>
                <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={props.onStatus}>
                    <option defaultChecked>Choose...</option>
                    <option value="PENDING">PENDING</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Modal;