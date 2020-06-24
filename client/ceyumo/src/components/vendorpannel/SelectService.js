import React from 'react'

const SelectService = props=>{

    return(
        <div>
            <div className="form-group col-md-12">
                    <label>Services Offered</label>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="photogrphy" id="reg-photography"/>
                        <label className="custom-control-label" htmlFor="reg-photography">Photography</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="event management" id="reg-event-mgt"/>
                        <label className="custom-control-label" htmlFor="reg-event-mgt">Event Management</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="wedding planner" id="reg-wed-planner"/>
                        <label className="custom-control-label" htmlFor="reg-wed-planner">Wedding Planner</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="catering" id="reg-catering"/>
                        <label className="custom-control-label" htmlFor="reg-catering">Catering</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="makeup artist" id="reg-makeup"/>
                        <label className="custom-control-label" htmlFor="reg-makeup">Makeup Artist</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="travels" id="reg-travels"/>
                        <label className="custom-control-label" htmlFor="reg-travels">Travels</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" 
                        onChange={props.onSelected} value="stage decoration" id="reg-stage-decor"/>
                        <label className="custom-control-label" htmlFor="reg-stage-decor">Stage Decoration</label>
                    </div>
                </div>
        </div>
    )
}

export default SelectService;