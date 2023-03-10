import React from 'react'
import { Routes, Route } from 'react-router'
import Dashbord from '../Dashboard/Dashboard'
import Products from '../Products/Products'
import Clients from '../Clients/Clients'

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' name='Dashboard' element={<Dashbord />} />
      <Route exact path='/Products' name='Products' element={<Products />} />
      <Route exact path='/Clients' name='Clients' element={<Clients />} />
    </Routes>
  )
}

export default Router
