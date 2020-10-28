import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line
export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/autores">
                <i className="fa fa-user-o"></i> Autores
            </Link>
            <Link to="/obras">
                <i className="fa fa-book"></i> Obras
            </Link>
        </nav>
    </aside>