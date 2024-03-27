import React from 'react'
import Home from './Components/Home'
import { Box } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import NavBar_Responsive from './Components/Navbar_Responsive/NavBar_Responsive'
import Footer from './Components/Footer'


const App = () => {
  let vw = window.innerWidth

  return (
    <Box minW={'100%'} minH={'100vh'} bgColor={'#081825'}>
      {vw<=426?<NavBar_Responsive/>:<Navbar/>}
      <Home/>
      <Footer />
    </Box>
  )
}

export default App