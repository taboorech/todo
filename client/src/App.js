import React, {Component} from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.scss';
// import axios from "axios"
import Layout from './hoc/Layout/Layout';
import ToDo from './containers/ToDo/ToDo';
import {useParams} from 'react-router-dom'
import Auth from "./containers/Auth/Auth";

const ToDoWithParamsId = () => {
  const {id} = useParams();  
  return (
    <ToDo paramsId={id} />
  );
}

class App extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      isLoaded: false,
      error: null
    }
  }  
  
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/:id" element={<ToDoWithParamsId />}/>
          <Route path="/auth" element={<Auth/>} end/>
        </Routes>
      </Layout>
    );
  }
}

export default App;
