import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div   className=' bg-dark  text-light w-100    text-center   p-2 '>
            <h4>footer</h4>
            <p className="links">
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/policy">Privacy Policy</Link>
            </p>
        </div>
    )
}

export default Footer
