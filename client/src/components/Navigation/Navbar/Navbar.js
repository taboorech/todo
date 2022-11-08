import React, {useEffect, useState} from "react";
import './Navbar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import M from 'materialize-css';
import axios from "axios";
import Cookies from "js-cookie";

export default function Navbar() {

  const baseURL = 'http://localhost:3001/';
  const [isAuth, setAuth] = useState(false);
  const {pathname} = useLocation();
  useEffect(() => {
    if(Cookies.get('sid') !== undefined) {
      setAuth(true);
    }
    M.AutoInit();
  }, []);

  const logoutClickHandler = async () => {
    await axios.post(baseURL + 'auth/logout', {}, {
      withCredentials: true
    })
    .then(() => {
      setAuth(false);
      window.location.replace('/auth');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="navbar-fixed">
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <NavLink to={"/"} className="brand-logo">Todo</NavLink>          
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
              end
            >
              <div className="linkTitle">Home</div>
              <div className="activeViewer"></div>
            </NavLink>
            {isAuth ? 
              <NavLink to={'/auth'} onClick={logoutClickHandler}>
                <div className="linkTitle">Logout</div>
                <div className="activeViewer"></div>
              </NavLink> :
              <NavLink className={"col s6"} to="/auth" >
                <div className="linkTitle">Auth</div>
                <div className="activeViewer"></div>
              </NavLink>
            }
          </div>
        </div>
      </nav>      
    </div>
  )
}