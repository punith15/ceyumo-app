import React from 'react';  
import Nav from './components/partials/Nav'
import Footer from './components/partials/Footer'
import Home from './components/Home'
import Login from './components/Login'
import LoginForm from './components/login/LoginForm'
import CustomerRegister from './components/login/CustomerRegister'
import VendorRegister from './components/login/VendorRegister'
import VendorPanel from './components/VendorPanel'
import Services from './components/Services'
import ViewService from './components/service/ViewService'
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'

//withRouter(({location})
const App = withRouter(({location})=> {
  return (
    <>
      {/* <Nav/> */}
        {
          (location.pathname !== '/vendorpanel' 
          && location.pathname !== '/login' 
          && location.pathname !== '/services'
          && location.pathname !== '/viewservice'
          ) && <Nav/>
        }
        <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/loginform/:user' exact component={LoginForm}/>
        <Route path='/customer-register' exact component={CustomerRegister}/>
        <Route path='/vendor-register' exact component={VendorRegister}/>
        <Route path="/vendorpanel" exact component={VendorPanel}/>
        <Route path="/services" exact component={Services}/>
        <Route path="/viewservice" exact component={ViewService}/>
        </Switch>
        {/* <Footer/> */}
        {
          (location.pathname === '/' || location.pathname === '/services') && <Footer/>
        }
    </>
  );
})

export default App;
