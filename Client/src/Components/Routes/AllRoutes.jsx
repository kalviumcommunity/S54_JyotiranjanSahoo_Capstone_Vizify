import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../Home'
import TextToPPT from '../TextToPPT'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/texttoppt' element={<TextToPPT/>}  />
    </Routes>
  )
}

export default AllRoutes