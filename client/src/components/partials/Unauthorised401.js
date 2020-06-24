import React from 'react'
import {Link} from 'react-router-dom'


const Unauthorised401 = props=>{
    return(
        <div>
            <div className="container">
                <div className="col-md-6" 
                style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    margin:"0 auto",
                    width:"100%",
                    height:"100vh"
                    }}>
                    <img src="https://www.adslzone.net/app/uploads-adslzone.net/2017/08/error401.jpg"
                    style={{width:"100%"}} />
                    {props.user === 'customer' ?
                        <Link to="/loginform/customer">
                        <button className="btn btn-primary" style={{padding:"10px 30px",marginTop:"20px"}}>Go To Login</button>
                        </Link>
                        : <Link to="/loginform/vendor">
                        <button className="btn btn-primary" style={{padding:"10px 30px",marginTop:"20px"}}>Go To Login</button>
                        </Link>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Unauthorised401;