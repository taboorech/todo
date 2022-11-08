import React from "react";
import './Layout.scss'
import Navbar from '../../components/Navigation/Navbar/Navbar'
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import Footer from "../../components/Navigation/Footer/Footer";

export default function Layout(props) {
  return(
    <div className={'Layout'}>
      <Navbar/>
      {props.children}
      <Footer/>
    </div>
  )
}