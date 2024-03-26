import React from 'react'
import Home from './Components/Home'
import { Box } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import NavBar_Responsive from './Components/Navbar_Responsive/NavBar_Responsive'

const App = () => {
  let vw = window.innerWidth
  let vh = window.innerHeight
  console.log(vw,vh);
  return (
    <Box w={'100vw'} minH={'100vh'} bgColor={'#081825'} overflowX={'hidden'}>
      {vw<=426?<NavBar_Responsive/>:<Navbar/>}
      <Home/>
    </Box>
  )
}

export default App