import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import ToDo from './containers/ToDo/ToDo';
import Auth from "./containers/Auth/Auth";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ToDo />}/>
        <Route path="/:id" element={<ToDo />}/>        
        <Route path="/auth" element={<Auth/>} end/>
      </Routes>
    </Layout>
  );
}
