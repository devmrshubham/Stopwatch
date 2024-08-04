import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiShoppingBag } from "react-icons/hi"
import { toast } from "react-toastify"


const Header = () => {

    const [active, setActive] = useState({
        role: false,
        user: null

    })



    useEffect(() => {
        const login = localStorage.getItem("login")
        if (login) {
            const UserData = JSON.parse(login)

            setActive({
                ...active, user: UserData.user.User, role: UserData.role, admin: UserData.admin
            })
        }

    }, [])

    const Logout = () => {

        localStorage.removeItem("login")
        toast.success("logOut successfully")
        setActive({
            role: false,
            user: null

        })
    }



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary     ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand"> <HiShoppingBag /> Ecommers App</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link ">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link">Category</NavLink>
                            </li>
                            {
                                active.role ? (
                                    <>

                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {active.user.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li> <NavLink to={`/dashbord/${active.role && active.admin === 1 ? "admin" : "user"}`} className="nav-link" >Dashbord</NavLink></li>
                                                <li onClick={Logout}> <NavLink to="/login" className="nav-link" >LogOut</NavLink></li>

                                            </ul>
                                        </li>

                                    </>
                                )
                                    : (<>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link" >Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link" >Login</NavLink>
                                        </li></>)
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">Cart (0)</NavLink>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
