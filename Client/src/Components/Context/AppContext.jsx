import React, { createContext, useRef, useState } from 'react'

export const context = createContext()
const AppContext = ({children}) => {
    const footerRef = useRef(null)
  return (
    <context.Provider value={{ footerRef }}>
        {children}
    </context.Provider>
  )
}

export default AppContext