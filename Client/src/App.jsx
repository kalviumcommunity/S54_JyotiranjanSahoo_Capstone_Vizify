import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import NavBar_Responsive from './Components/Navbar_Responsive/NavBar_Responsive'
import Footer from './Components/Footer'
import { context } from './Components/Context/AppContext'
import AllRoutes from './Components/Routes/AllRoutes'


const App = () => {
  let vw = window.innerWidth
  const {NavDisplay,FooterDisplay} = useContext(context)

  return (
    <Box minW={'100%'} minH={'100vh'} bgColor={'#081825'}>
      {NavDisplay && <Box>{vw<=426?<NavBar_Responsive/>:<Navbar/>}</Box>}
      <AllRoutes/>
      {/* <TextToPPT /> */}
      {FooterDisplay && <Footer/>}
    </Box>
  )
}

export default App