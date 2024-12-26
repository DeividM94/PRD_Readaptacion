import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { NavBarApp } from '../components/NavBarApp/NavBarApp';
import { FooterApp } from '../components/FooterApp/FooterApp';
import { Servicios } from './../Pages/Servicios/Servicios';
import { PideCita } from '../Pages/PideCita/PideCita';
import { Contacto } from '../Pages/Contacto/Contacto';



export const AppRoutes = () => {
  return (
   <BrowserRouter>
   <NavBarApp/>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/servicios' element={<Servicios />} />
    <Route path='/pide-cita' element={<PideCita />} />
    <Route path='/contacto' element={<Contacto />} />
   </Routes>
   <FooterApp/>
   </BrowserRouter>
  )
}
