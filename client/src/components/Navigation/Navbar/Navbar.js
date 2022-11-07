import React, {useEffect, useState} from "react";
import './Navbar.scss';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import M from 'materialize-css';
import axios from "axios";

export default function Navbar() {

  const navigate = useNavigate();

  const baseURL = 'http://localhost:3001/';
  const [isAuth, setAuth] = useState(false);
  const {pathname} = useLocation();
  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pathname])

  const fetchData = async () => {
    await axios.get(baseURL + 'auth', { withCredentials: true })
    .then((response) => {
      if(response.status === 204) {
        setAuth(true);
      }
    })
    .catch((error) => {
      console.log(error);
      setAuth(false);
    })
  }

  const logoutClickHandler = async () => {
    await axios.post(baseURL + 'auth/logout', {}, {
      withCredentials: true
    })
    .then(() => {
      setAuth(false);
      navigate('/auth');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="navbar-fixed">
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <NavLink to={"/"} className="brand-logo">Name</NavLink>          
          <ul className="right hide-on-med-and-down">
            <li className={pathname !== '/auth' ? "active" : null}><NavLink to="/">Home</NavLink></li>
            {isAuth ?
            <li><NavLink to={'/auth'} onClick={logoutClickHandler}>Logout</NavLink></li> :
            <li className={pathname === '/auth' ? "active" : null}><NavLink to="/auth">Auth</NavLink></li>}
          </ul>
        </div>
        <div className="nav-content m0 s12">
          <div className="row">
            <NavLink 
              className={"col s6"}
              to="/"
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