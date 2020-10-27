import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { HashRouter, HasRouter } from 'react-router-dom'

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Home from '../components/home/home'
import Footer from '../components/template/Footer'

export default props =>
    <HashRouter>
           <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
    </div> 
    </HashRouter>
