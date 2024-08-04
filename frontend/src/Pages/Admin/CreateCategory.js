import { useState, useEffect, useContext } from "react";
import Layout from "../../Componet/Layout/Layout";
import Adminmenu from "../../Componet/Layout/Adminmenu";
import { getCategory, DeleteCategory } from "../../Api/Category";
import { MainContext } from "../../Context/ContextHolder";
import { toast } from "react-toastify";
import CategoryForm from "../../Componet/form/CategoryForm";
import UpdateCategory from "../../Componet/form/UpdateCategory";

const CreateCategory = () => {
    const { Isloder } = useContext(MainContext);

    const [category, setCategory] = useState([]);

    const AllgetData = () => {
        getCategory()
            .then((success) => {
                Isloder(false);
                if (success.data) {
                    setCategory(success.data.Data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        AllgetData();
        Isloder(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const DeleteItem = (ItemId) => {
        const admin = JSON.parse(localStorage.getItem("login"));
        const id = admin.user.User?._id;
        DeleteCategory(id, ItemId)
            .then((success) => {
                console.log(success);
                if (success.data.status === 1) {
                    AllgetData();
                    toast.success(success.data.msg);
                } else {
                    toast.error(success.data.msg);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Layout title={"Dashbord - Create Category"}>
            <div className="container-fluid  p-3  ">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category </h1>
                        <div>
                            <div>
                                <CategoryForm refesh={AllgetData} />
                                <br />
                            </div>

                            <div>
                                <table className="table w-75 ">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category?.map((d) => {
                                            return (
                                                <tr>
                                                    <td key={d._id}>{d.name} </td>
                                                    <td>
                                                        <UpdateCategory slug={d.slug} name={d.name} id={d?._id} refesh={AllgetData} />
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => DeleteItem(d._id)}
                                                            className="btn  btn-danger  "
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
