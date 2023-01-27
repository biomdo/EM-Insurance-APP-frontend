import React from 'react'
import { Routes, Route } from 'react-router'
import Dashbord from '../Dashboard/Dashboard'
import Product from '../Products/Product'

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' name='Dashboard' element={<Dashbord />} />
      <Route exact path='/Products' name='Products' element={<Product />} />
    </Routes>
  )
}

export default Router
