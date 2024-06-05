import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../Home'
import PostLoginForm from '../PostLoginForm'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}  />
    </Routes>
  )
}

export default AllRoutes