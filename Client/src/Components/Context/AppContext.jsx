import React, { createContext, useRef, useState } from 'react'

export const context = createContext()
const AppContext = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const footerRef = useRef(null)
  return (
    <context.Provider value={{isLoggedIn,setIsLoggedIn,footerRef}}>
        {children}
    </context.Provider>
  )
}

export default AppContext