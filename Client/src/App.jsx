import React from 'react'
import Home from './Components/Home'
import { Box } from '@chakra-ui/react'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <Box w={'100vw'} h={'100vh'} bgColor={'#081825'}>
      <Navbar/>
      <Home/>
    </Box>
  )
}

export default App