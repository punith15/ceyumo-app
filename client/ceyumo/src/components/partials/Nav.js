import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ()=>{
    return(
        <>
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#">CEYUMO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" >
                <i className="fa fa-navicon"></i>
                </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to='/'>
                        HOME <span className="sr-only">(current)</span>
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    BOOK NOW
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">PHOTOGRAPHERS</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">EVENT MANAGERS</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">WEDDING PLANNER</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">CATERING SERVICES</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">TRAVELS</a>
                    <div className="dropdown-divider"></div>
                    </div>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to='/login'>
                        <span><i className="fa fa-user user-icon"/></span>
                    </Link>
                </li>
                </ul>
            </div>
        </nav>
        <hr style={{width:'100%',height:'1px',background:'grey',display:'block',margin:'0',opacity:'0.5'}}/>
        </>
    )
}

export default Nav;