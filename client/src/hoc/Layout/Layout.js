import React, { Component } from "react";
import './Layout.scss'
import Navbar from '../../components/Navigation/Navbar/Navbar'
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Layout extends Component {
  render() {    
    return(
      <div className={'Layout'}>
        <Navbar/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;