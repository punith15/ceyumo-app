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
                <li className="nav-item">
                    <Link className="nav-link" to='/services'>
                        <span className="nav-book-now">BOOK NOW</span>
                    </Link>
                </li>

                <li className="nav-item active">
                    <Link className="nav-link" to='/loginform/vendor'>
                        LIST BUSINESS
                    </Link>
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