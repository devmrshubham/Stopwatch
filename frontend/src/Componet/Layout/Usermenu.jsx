import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
    return (
        <>
            <div className=" text-center ">
                <div className="list-group">
                    <h4>Dashbord</h4>
                    <NavLink to="/dashbord/user/profile" className="list-group-item list-group-item-action">
                        Profile
                    </NavLink>
                    <NavLink to="/dashbord/user/orders" className="list-group-item list-group-item-action">
                        Orders
                    </NavLink>

                </div>
            </div>
        </>
    )
}

export default Usermenu
