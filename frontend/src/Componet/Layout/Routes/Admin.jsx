import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Spinner from '../../Spinner'

const Admin = () => {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"))
        if (data?.role && data.admin === 1) {
            setOk(true)
        }

    }, [setOk])
    return ok ? <Outlet /> : <Spinner path='/' />


}

export default Admin
