import React, { createContext, useRef, useState } from 'react'

const context = createContext()
const AppContext = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
  return (
    <context.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </context.Provider>
  )
}

export default AppContext