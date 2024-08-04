import { useState } from 'react'
import { createContext } from 'react'

const MainContext = createContext()

const ContextHolder = ({ children }) => {
    const [loader, setloader] = useState(false)
    const Isloder = (value) => {
        setloader(value)
    }
    return (
        <MainContext.Provider value={{ Isloder }}>
            <div className="box" style={loader ? { display: "flex" } : { display: "none" }}>
                <div></div>
            </div>
            {children}
        </MainContext.Provider>
    )
}

export default ContextHolder
export { MainContext }
