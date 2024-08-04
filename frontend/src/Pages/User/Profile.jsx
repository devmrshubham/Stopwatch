import React from 'react'
import Layout from '../../Componet/Layout/Layout'
import Usermenu from '../../Componet/Layout/Usermenu'

const Profile = () => {
    return (
        <Layout title={"User - Profile"}>
            <div className=" container-fluid  m-3  p-3 ">
                <div className=" row">
                    <div className=" col-md-3 ">
                        <Usermenu />
                    </div>
                    <div className=" col-md-9 ">
                        User Profile
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
