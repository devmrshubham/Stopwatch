import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import { Outlet } from "react-router-dom";


const Private = ({ Component }) => {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"))
        if (data?.role) {
            setOk(true)
        }

    }, [setOk])


    return ok ? <Outlet />  : <Spinner />;
};

export default Private;
