import React, {useEffect} from "react"
import './Navbar.scss'
import {NavLink, useLocation} from 'react-router-dom'
import M from 'materialize-css'

export default function Navbar() {

  const {pathname} = useLocation();
  useEffect(() => {
    M.AutoInit();
  })
  return (
    <div className="navbar-fixed">
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <NavLink to={"/"} className="brand-logo">Name</NavLink>          
          <ul className="right hide-on-med-and-down">
            <li className={pathname !== '/auth' ? "active" : null}><NavLink to="/0">Home</NavLink></li>
            <li className={pathname === '/auth' ? "active" : null}><NavLink to="/auth">Auth</NavLink></li>
          </ul>
        </div>
        <div className="nav-content m0 s12">
          <div className="row">
            <NavLink 
              className={"col s6"}
              to="/0"
            >
              <div className="linkTitle">Home</div>
              <div className="activeViewer"></div>
            </NavLink>
            <NavLink 
              className={"col s6"}
              to="/auth"
            >
              <div className="linkTitle">Auth</div>
              <div className="activeViewer"></div>
            </NavLink>
          </div>
        </div>
      </nav>      
    </div>
  )
}