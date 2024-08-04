import React from 'react'
import Layout from '../../Componet/Layout/Layout'
import Usermenu from '../../Componet/Layout/Usermenu'

const Orders = () => {
    return (
        <Layout title={"User - Orders"}>
            <div className=" container-fluid p-3 m-3 ">
                <div className="row">
                    <div className=" col-md-3 ">
                        <Usermenu />
                    </div>
                    <div className=" col-md-9 ">
                        <h1>All Orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
