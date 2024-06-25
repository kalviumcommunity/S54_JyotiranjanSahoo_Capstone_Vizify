import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../Home'
import TextToPPT from "./../TextToPPT"
import TextToIMG from '../TextToIMG'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/text-to-ppt' element={<TextToPPT/>}/>
        <Route path='/text-to-img' element={<TextToIMG/>}/>
    </Routes>
  )
}

export default AllRoutes