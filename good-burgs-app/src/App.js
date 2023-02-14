import React from 'react'
import NavBar from './components/NavBar'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home'
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='menu' element={<Menu/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}