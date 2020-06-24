import React from 'react'
import SelectService from './vendorpannel/SelectService'
import ServiceModel from './partials/ServicesModel'
import ServiceNav from './partials/ServiceNav'
import './Services.css'

const listOfStates = ['Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh',
    'Chhattisgarh','Dadra and Nagar Haveli','Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh',
    'Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur',
    'Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal']

class Services extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            state : '',
            city : '',
            districts : [],
            service : []
        }
        this.onHandleServiceChange = this.onHandleServiceChange.bind(this)
        this.fetchDistricts = this.fetchDistricts.bind(this)
        this.onStateChange = this.onStateChange.bind(this)
        this.onCityChange = this.onCityChange.bind(this)
    }

    fetchDistricts = async()=>{
        const data = await fetch(`https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${this.state.state}`)
        const myarray = await data.json()

        let arr = [...new Set(myarray.map(dist=>dist.District))]
        this.setState({
            ...this.state,
            districts : arr
        })
    }

    onStateChange = (e)=>{
        let stateName = e.target.value;
        if(stateName !== 'Choose...'){
            console.log(stateName)
            this.setState({
                ...this.state,
                state : stateName
            },
            () => {
                console.log('called')
                this.fetchDistricts()}
            )
        }
    }

    onCityChange = (e)=>{
        let cityName = e.target.value;
        //if(cityName !== 'Choose...'){
            this.setState({
                ...this.state,
                city : cityName
            })
        //}
    }

    onHandleServiceChange = (e)=>{
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

    render(){
        return(
            <div>
                <div className="service-nav">
                    <ServiceNav/>
                </div>
                <div className="container-fluid service-block">
                    <div className="service-filter-block">
                        <h5>FILTER BY</h5>
                        <div className="service-filter">
                            <h6 className="filter-title">CATEGORY</h6>
                            <SelectService onSelected={this.onHandleServiceChange}/>
                            <div>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <div className="form-group">
                                    <label htmlFor="state"><h6 className="filter-title">STATE</h6></label>
                                    <select id="state" className="form-control" onChange={this.onStateChange} required>
                                        <option defaultValue="Choose...">Choose...</option>
                                        {listOfStates.map((st,i)=>{
                                            return <option key={i} value={st}>{st}</option>
                                        })}
                                    </select>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="city"><h6 className="filter-title">CITY</h6></label>
                                    <select id="city" className="form-control" onChange={this.onCityChange} required>
                                        <option defaultValue="Choose...">Choose...</option>
                                        {this.state.districts.map((dt,j)=>{
                                        return <option key={j} value={dt}>{dt}</option>
                                        })}
                                        
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="service-main-block">
                        <ServiceModel selected={this.state.service} city={this.state.city}/> 
                        {/*  */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Services;