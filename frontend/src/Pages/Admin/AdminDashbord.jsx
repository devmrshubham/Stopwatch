import { useState, useEffect } from 'react'
import Layout from "../../Componet/Layout/Layout"
import Adminmenu from '../../Componet/Layout/Adminmenu'


const AdminDashbord = () => {
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
    return (
        <Layout title={"admin-dashbord"}>
            <div className="container-fluid  p-3  ">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                       <div className="card w-75  p-3 ">
                       <h3> Admin Name: {active.user?.name} </h3>
                        <h3> Admin Email: {active.user?.email} </h3>
                        <h3> Admin Contact: {active.user?.mobile} </h3>
                       </div>
                    
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default AdminDashbord
