import React from "react";
import Layout from "../../Componet/Layout/Layout";
import Adminmenu from "../../Componet/Layout/Adminmenu";

const Users = () => {
    return (
        <Layout title={'Dashbord All - User'}>
            <div className="container-fluid  p-3  ">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All User</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
