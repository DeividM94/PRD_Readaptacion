import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { NavBarApp } from '../components/NavBarApp/NavBarApp';
import { FooterApp } from '../components/FooterApp/FooterApp';



export const AppRoutes = () => {
  return (
   <BrowserRouter>
   <NavBarApp/>
   <Routes>
    <Route path='/' element={<Home />} />
   </Routes>
   <FooterApp/>
   </BrowserRouter>
  )
}
