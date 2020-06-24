import React, { useState, useEffect } from 'react'
import SelectService from './SelectService'
import Spinner from '../partials/Spinner'
import Alert from '../partials/Alert'

class AddService extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : '',
            description : '',
            avatar : '',
            gallery : '',
            bufferAvatar : [],
            bufferGallery : [],
            service : [],
            serviceData : [],
            loading : false,
            status : false,
            vendordata : []
        }
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onServiceSelected = this.onServiceSelected.bind(this)
        this.onUploadHeader = this.onUploadHeader.bind(this)
        this.onUploadGallery = this.onUploadGallery.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.fetchAddService = this.fetchAddService.bind(this)
        this.fetchUploadHeader = this.fetchUploadHeader.bind(this)
        this.fetchUploadGallery = this.fetchUploadGallery.bind(this)
        this.fetchDataSet = this.fetchDataSet.bind(this)
        this.fetchVendor = this.fetchVendor.bind(this)
    }

    fetchAddService = async()=>{
        const token = sessionStorage.getItem('vendorToken')
        const serviceRes = await fetch('/addservice', {
            method : 'post',
            body : JSON.stringify(this.state.serviceData[0]),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : token
            }
        })
        console.log('Service Added Successfullary')
    }

    fetchDataSet = ()=>{
        const data = {title : this.state.title, description : this.state.description, 
            service : this.state.service, avatar : this.state.bufferAvatar[0], 
            gallery : this.state.bufferGallery, vendordata : this.state.vendordata}
        console.log(data)
        this.setState({
            ...this.state,
            serviceData : [...this.state.serviceData, data]
        },
        ()=> {
            this.fetchAddService()
            this.setState({
                ...this.state,
                title : '',
                description : '',
                avatar : '',
                gallery : '',
                bufferAvatar : [],
                bufferGallery : [],
                service : [],
                serviceData : [],
                loading : false,
                status : true,
                vendordata : []
            })
            const serviceInput = document.querySelectorAll("input");
            for(let i=0;i<serviceInput.length;i++){
                serviceInput[i].value = ""
            }
            const serviceCheck = document.getElementsByClassName("custom-control-input");
            for(let i=0;i<serviceCheck.length;i++){
                serviceCheck[i].checked = false
            }
        }
        )
        
    }

    fetchVendor = async()=>{
        const token = sessionStorage.getItem('vendorToken')
        const vendorRes = await fetch('/vendors',{
            method : 'get',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const vendorObj = await vendorRes.json()
        this.setState({
            ...this.state,
            vendordata : [vendorObj]
        },
        ()=> this.fetchDataSet()
        )
    }

    fetchUploadHeader = async()=>{
        const data = new FormData()
        data.append('avatar', this.state.avatar)
        const header = await fetch('/upload-header-images',{
            method : 'post',
            body : data
        })
        const headerRes = await header.json();
        this.setState({
            ...this.state,
            bufferAvatar : [...this.state.bufferAvatar ,headerRes.avatar]
        },
        ()=> this.fetchUploadGallery()
        )
        console.log(headerRes)
    }

    fetchUploadGallery = async()=>{
        var formData = new FormData();
        for (const key of Object.keys(this.state.gallery)) {
            formData.append('gallery', this.state.gallery[key])
        }
        const gall = await fetch('/upload-gallery-images', {
            method : 'post',
            body : formData
        })
        const gallRes = await gall.json();
        this.setState({
            ...this.state,
            bufferGallery : gallRes.gallery
        },
        ()=> this.fetchVendor()
        )
        console.log(gallRes.gallery)
    }

    onServiceSelected = (e)=>{
        if(e.target.checked){
            this.setState({
                service : [...this.state.service, e.target.value]
            })
        }else{
            const arr = this.state.service.filter(function(item) {
                return item !== e.target.value
            })
            this.setState({
                ...this.state,
                service : arr
            })
        }
    }

    onTitleChange = (e)=>{
        this.setState({
            ...this.state,
            title : e.target.value
        })
    }

    onDescriptionChange = (e)=>{
        this.setState({
            ...this.state,
            description : e.target.value
        })
    }

    onUploadHeader = (e)=>{
        console.log(e.target.files[0])
        this.setState({
            ...this.state,
            avatar : e.target.files[0]
        })
    }

    onUploadGallery = (e)=>{
        this.setState({
            ...this.state,
            gallery : e.target.files
        })
    }

    onHandleSubmit = (e)=>{
        e.preventDefault()
        //console.log(avatar)
        this.setState({
            ...this.state,
            loading : true
        })
        this.fetchUploadHeader()
    }

    render(){
    return(
        <div>
            <div>
                <div className="dash-heading">
                    <span className="dash-icon"><i className="fa fa-cog"></i></span>
                    <h6>/ Add Service</h6>
                </div>
                <div className="col-md-8 add-service">
                    <form onSubmit={this.onHandleSubmit} id="add-service-form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" 
                            value={this.state.title} id="title" 
                            onChange={this.onTitleChange} placeholder="Title" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" 
                            value={this.state.description} id="description" 
                            onChange={this.onDescriptionChange} rows="3" 
                            placeholder="Description" required/>
                        </div>

                        <SelectService onSelected={this.onServiceSelected} />
                       
                        <div className="form-group">
                            <label htmlFor="uploadHeaderImage" style={{color:'rgb(36, 103, 247)'}}>Header Image</label>
                            <input type="file" className="form-control-file" 
                            name="avatar" id="uploadHeaderImage" 
                            onChange={this.onUploadHeader} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="uploadGallery" style={{color:'rgb(36, 103, 247)'}}>Upload Gallery Images (Max 3)</label>
                            <input type="file" className="form-control-file" 
                            name="gallery" id="uploadGallery" 
                            onChange={this.onUploadGallery} required multiple/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <div style={{marginTop : '10px'}}>
                        {this.state.loading ? <Spinner/> : ''}
                        {this.state.status ? <Alert message="Service Created !!" cls="alert alert-success alert-dismissible fade show" /> : ''}
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    
                </div>
            </div>
        </div>
    )
    }
}

export default AddService;