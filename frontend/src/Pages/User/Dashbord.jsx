import { useEffect, useState } from "react";
import Layout from "../../Componet/Layout/Layout";
import Usermenu from "../../Componet/Layout/Usermenu";

const Dashbord = () => {
    const [active, setActive] = useState({
        role: false,
        user: null,
    });

    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login) {
            const UserData = JSON.parse(login);

            setActive({
                ...active,
                user: UserData.user.User,
                role: UserData.role,
                admin: UserData.admin,
            });
        }
    }, []);
    return (
        <Layout title={"user-Dashbord"}>
            <div className=" container-fluid ">
                <div className="row">
                    <div className=" col-md-3 ">
                        <Usermenu />
                    </div>
                    <div className=" col-md-9 ">
                        <div className="card w-75  p-3 ">
                            <h1> {active.user?.name}</h1>
                            <h1> {active.user?.email}</h1>
                            <h1> {active.user?.address}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashbord;
