import React, { createContext, useState } from 'react'

export const Auth = createContext();

const ContextProvider = ({ children }) => {

    const [isloggedIn, setIsloggedIn] = useState("");

    return (
        <>
            <Auth.Provider value={{ isloggedIn, setIsloggedIn }}>
                {children}
            </Auth.Provider>
        </>
    )
}

export default ContextProvider