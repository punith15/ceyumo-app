import React, {useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Ratings from './Ratings'
import VerticalLoader from './VerticalLoader'

const ServicesModel = props=>{
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const selected = props.selected || ''
    const city = props.city || ''

    const fetchServices = async()=>{
        console.log(props.city)
        console.log(props.selected.length)
        if((selected.length === 0 || selected === '') && (city === '' || city === 'Choose...')){
            const serviceRes = await fetch('/get-services')
            const serviceObj = await serviceRes.json()
            setServices(serviceObj)
            console.log(serviceObj)
            console.log('greater')
            setLoading(false)
        }else{
            console.log('filtered')
            const serviceRes = await fetch('/service-filter?services='+selected+'&city='+city)
            const serviceObj = await serviceRes.json()
            setServices(serviceObj)
            console.log(serviceObj)
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        setLoading(true)
        fetchServices()
    },[props])

    return(
        <div>
            <div className="vertical-loader" style={{display:'flex',alignItems:'center'}}>
                <h3>All Categories</h3>
               {loading ? <VerticalLoader/> : ''}
            </div>
            {services.length == 0 ? <div style={{display:"flex", alignItems:'center'}}>
                <i class="fa fa-exclamation-triangle"></i>
                <p style={{margin:"auto 0" ,marginLeft:"10px"}} className="no-services">No Services Found</p>
            </div> :
            <div className="row service-model">
                {services.map((service,i)=>{
                    return (
                        <div className="col-md-4 service-model-item" key={i}>
                            <div>
                                <div className="serive-avatar-block">
                                <img className="avatar" src={service.avatar} />
                                <h5 className="service-name">{service.service[0]}</h5>
                                </div>
                            <div className="service-model-content">
                            <h6>{JSON.parse(service.vendordata)[0].business}</h6>
                            <Ratings/>
                            <div className="service-btn-grp">
                                <Link to={{
                                    pathname : '/viewservice',
                                    param1 : service._id
                                }}>
                                <button type="button">BOOK NOW</button>
                                </Link>
                            <span>
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                            <h6>{JSON.parse(service.vendordata)[0].city}</h6>
                            </span>
                            </div>
                            </div>
                            </div>
                        </div>
                        
                     )
                })
                } 
            </div>
            }
        </div>
    )
}

export default ServicesModel;