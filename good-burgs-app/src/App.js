import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/LayoutPage';
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage';

export default function App() {

  return (
    <div className='body'>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<HomePage/>}/>
              <Route path='menu' element={<MenuPage/>}/>
              <Route path='account' element={<AccountPage/>}/>
              <Route path='register' element={<RegisterPage/>}/>
              <Route path='cart' element={<CartPage/>}/>
            </Route>
          </Routes>
        <Footer/>
    </BrowserRouter>
    </div>
  )
}