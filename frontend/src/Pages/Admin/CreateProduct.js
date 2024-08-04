import { useContext, useState, useEffect } from "react";
import Layout from "../../Componet/Layout/Layout";
import Adminmenu from "../../Componet/Layout/Adminmenu";
import { MainContext } from "../../Context/ContextHolder";
import { getCategory } from "../../Api/Category";
import { AddProduct } from "../../Api/Product";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";



const CreateProduct = () => {
    const { Isloder } = useContext(MainContext);
    const [category, setCategory] = useState([]);
    const [Photo, setPhote] = useState("");
    const navigate = useNavigate()



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

    // handel create product function

    const SubmitHandler = (e) => {

        e.preventDefault()

        const Isadmin = JSON.parse(localStorage.getItem("login"))

        const id = Isadmin.user.User._id

        const formdata = new FormData()

        formdata.append("name", e.target.name.value)
        formdata.append("category", e.target.category.value)
        formdata.append("image", e.target.photo.files[0])
        formdata.append("quantity", e.target.quantity.value)
        formdata.append("price", e.target.price.value)
        formdata.append("description", e.target.description.value)
        formdata.append("shipping", e.target.shipping.value)
        AddProduct(formdata, id)
            .then(
                (success) => {
                    Isloder(true)
                    if (success.data.status === 1) {
                        Isloder(false)
                        toast.success(success.data.msg)
                        setPhote("")
                        e.target.reset()
                        navigate("/dashbord/admin/products")


                    } else {
                        toast.error(success.data.msg)
                        Isloder(false)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )

    }

    return (
        <Layout title={"Dashbord - Category Product"}>
            <div className="container-fluid  p-3  ">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product Page</h1>
                        <div className=" m-1 w-75  ">
                            <form
                                onSubmit={SubmitHandler}
                                encType="multipart/form-data"
                                className=" w-75  mt-4 rounded-3  shadow-lg    border  border-2  p-5  mx-auto "
                            >
                                <div>
                                    <label htmlFor="exampleDataList" className="form-label">
                                        Select Category :
                                    </label>

                                    <input
                                        className="form-control"
                                        list="datalistOptions"
                                        name="category"
                                        id="exampleDataList"
                                        placeholder="Type to search category..."
                                    />
                                    <datalist id="datalistOptions">
                                        {category?.map((d, i) => {
                                            return (
                                                <>
                                                    <option key={d?._id} value={d.name}>

                                                    </option>
                                                </>
                                            );
                                        })}
                                    </datalist>
                                </div>
                                <div className="my-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Product Name :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="exampleFormControlInput1"
                                        placeholder="write a name"
                                    />
                                </div>

                                <div className="my-3">
                                    <label
                                        htmlFor="formFile"
                                        className=" btn  btn-outline-warning col-md-12  "
                                    >
                                        {Photo ? Photo.name : "Upload Image"}
                                        <input
                                            className="form-control"
                                            name="photo"
                                            accept="image/*"
                                            type="file"
                                            id="formFile"
                                            hidden
                                            onChange={(e) => setPhote(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                                <div className="">
                                    {Photo && (
                                        <div className=" text-center ">
                                            <img
                                                src={URL.createObjectURL(Photo)}
                                                style={{ height: "6.5rem" }}
                                                alt=" product img"
                                                className=" img-fluid "
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Product Price :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        id="exampleFormControlInput1"
                                        placeholder="write a price"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Quantity :
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="write a Quantity"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label"
                                    >
                                        Description :
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        id="exampleFormControlTextarea1"
                                        rows={3}
                                        defaultValue={""}
                                        placeholder="write a description"
                                    />
                                </div>
                                <div className="">
                                    <select
                                        className="form-select"
                                        name="shipping"
                                        aria-label="Default select example"
                                    >
                                        <option value={""}>
                                            Select Shipping
                                        </option>
                                        <option value={"yes"}>Yes</option>
                                        <option value={"No"}>No</option>
                                    </select>
                                </div>
                                <br />
                                <br />

                                <div className="">
                                    <button type="submit" className="btn btn-primary">
                                        Create Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
