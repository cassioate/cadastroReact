 import './Logo.css'
 import React from 'react'
 import logo from '../../assets/imgs/logoNintendo.png'
 import {Link} from 'react-router-dom'
 
 // eslint-disable-next-line
 export default props =>
 <aside className= "logo">
     <Link to="/" className="logo">
         <img src={logo} alt="logo" />
     </Link>
 </aside>