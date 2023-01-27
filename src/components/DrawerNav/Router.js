import React from 'react'
import { Routes, Route } from 'react-router'
import Dashbord from '../Dashboard/Dashboard'

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' name='Dashboard' element={<Dashbord />} />
    </Routes>
  )
}

export default Router
