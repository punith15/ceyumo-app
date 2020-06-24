import React from 'react'

const listOfStates = ['Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh',
    'Chhattisgarh','Dadra and Nagar Haveli','Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh',
    'Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur',
    'Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal']

const SelectStateCity = props=>{

    return(
        <div>
            <div style={{display:'flex'}}>
                <div className="form-group col-md-4" style={props.style}>
                    <label htmlFor="state">State</label>
                    <select id="state" className="form-control" onChange={props.onStateChange} required>
                        <option defaultValue="Choose...">Choose...</option>
                        {listOfStates.map((st,i)=>{
                            return <option key={i} value={st}>{st}</option>
                        })}
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="city">City</label>
                    <select id="city" className="form-control" onChange={props.onCityChange} required>
                        <option defaultValue="Choose...">Choose...</option>
                        {props.districts.map((dt,i)=>{
                           return <option key={i} value={dt}>{dt}</option>
                        })}
                        
                    </select>
                </div>
                    <div className="form-group col-md-2">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" value={props.zip} 
                    onChange={props.onZipChange} id="zip" placeholder="Zip" required/>
                </div>
                </div>
        </div>
    )
}

export default SelectStateCity;