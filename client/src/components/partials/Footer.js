import React from 'react'
import { Link} from 'react-router-dom'

const Footer = ()=>{
    return(
            <footer className="page-footer font-small">

            <div style={{backgroundColor: "rgb(218, 65, 27)"}}>
                <div className="container">
                <div className="row py-4 d-flex align-items-center">
                    <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                    <h6 className="mb-0">Get connected with us on social networks!</h6>
                    </div>
                    <div className="col-md-6 col-lg-7 text-center text-md-right">
                    <a className="fb-ic">
                        <i className="fab fa-facebook-f white-text mr-4"> </i>
                    </a>
                    <a className="tw-ic">
                        <i className="fab fa-twitter white-text mr-4"> </i>
                    </a>
                    <a className="gplus-ic">
                        <i className="fab fa-google-plus-g white-text mr-4"> </i>
                    </a>
                    <a className="li-ic">
                        <i className="fab fa-linkedin-in white-text mr-4"> </i>
                    </a>
                    <a className="ins-ic">
                        <i className="fab fa-instagram white-text"> </i>
                    </a>

                    </div>
                </div>

                </div>
            </div>
            <div className="container text-center text-md-left mt-5">
                <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase font-weight-bold">CEYUMO</h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
                    <p>Find the best photographers, event managers, wedding planners, travels, makeup artists 
                    catering services and stage decorators for all your commercial, family and corporate events.
                    </p>

                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                    <h6 className="text-uppercase font-weight-bold">Services</h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
                    <p>
                    <a href="/services">Photography</a>
                    </p>
                    <p>
                    <a href="/services">Event Management</a>
                    </p>
                    <p>
                    <a href="/services">Wedding Planner</a>
                    </p>
                    <p>
                    <a href="/services">Catering Services</a>
                    </p>

                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                    <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
                    <p>
                    <Link to="/login">Login</Link>
                    </p>
                    <p>
                    <Link to="/loginform/vendor">List Business</Link>
                    </p>
                    <p>
                    <a href="/loginform/customer">Book Now</a>
                    </p>
                    <p>
                    <a href="/services">Services</a>
                    </p>

                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                    <h6 className="text-uppercase font-weight-bold">Contact</h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
                    <p>
                    <i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                    <p>
                    <i className="fas fa-envelope mr-3"></i> info@example.com</p>
                    <p>
                    <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                    <p>
                    <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>

                </div>

                </div>

            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright : 
                <a href="#"> punithkumar.com</a>
            </div>

            </footer>
    )
}

export default Footer;