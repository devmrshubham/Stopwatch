import { useContext, useState, useEffect } from "react";
import Layout from "../../Componet/Layout/Layout";
import Adminmenu from "../../Componet/Layout/Adminmenu";
import { MainContext } from "../../Context/ContextHolder";
import { getProduct, updateProduct, DeleteProduct } from "../../Api/Product";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const { Isloder } = useContext(MainContext);
    const [product, setproduct] = useState({});
    const [oldImagePath, setOldImagePath] = useState("");
    const navigate = useNavigate()


    const [Photo, setPhote] = useState("");
    const { slug } = useParams();

    const getData = () => {
        getProduct(slug)
            .then((success) => {

                Isloder(false);
                if (success.data.status === 1) {
                    setproduct(success.data.data);
                    setOldImagePath(success.data.path);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getData();
        Isloder(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handel create product function

    const SubmitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append("name", e.target.name.value);
        formdata.append("oldimage", e.target.oldimage.value);
        formdata.append("category", e.target.category.value);
        formdata.append("image", e.target.photo.files[0]);
        formdata.append("quantity", e.target.quantity.value);
        formdata.append("price", e.target.price.value);
        formdata.append("description", e.target.description.value);
        formdata.append("shipping", e.target.shipping.value);
        updateProduct(product._id, formdata)
            .then((success) => {
                Isloder(true);
                if (success.data.status === 1) {
                    Isloder(false);
                    toast.success(success.data.msg);
                    setPhote("");
                    e.target.reset();
                    navigate("/dashbord/admin/products")
                } else {
                    toast.error(success.data.msg);
                    Isloder(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DeleteHandler = () => {
        let answer = window.prompt("are you sure to delete want to product");
        if(!answer) return
        DeleteProduct(product._id, product.image)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        toast.success(success.data.msg)
                        navigate("/dashbord/admin/products")
                    } else {
                        toast.error(success.data.msg)
                    }
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
                        <h1>Update Product Page</h1>
                        <div style={{ marginLeft: '110px', marginTop: '10px' }} className="">

                            <button onClick={() => DeleteHandler()} className="btn btn-danger  ">
                                Delete Product
                            </button>
                        </div>
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
                                        <option
                                            key={product?._id}
                                            onChange={(e) =>
                                                setproduct({
                                                    ...product,
                                                    category: e.target.category.value,
                                                })
                                            }
                                            value={product?.name}
                                        ></option>
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
                                        value={product.name}
                                        onChange={(e) =>
                                            setproduct({ ...product, name: e.target.name.value })
                                        }
                                    />
                                </div>

                                <div className="my-3">
                                    <label
                                        htmlFor="formFile"
                                        className=" btn  btn-outline-warning col-md-12  "
                                    >
                                        {Photo ? Photo.name : product?.image}
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

                                    {!Photo && (
                                        <div style={{ marginLeft: "1.25rem" }}>
                                            <p>Old Image</p>
                                            <img
                                                style={{ height: "100px" }}
                                                src={`${oldImagePath}${product?.image}`}
                                                alt="img"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input type="text" hidden name="oldimage" value={product.image} />
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
                                        value={product.price}
                                        onChange={(e) =>
                                            setproduct({ ...product, price: e.target.price?.value })
                                        }
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
                                        value={product.quantity}
                                        onChange={(e) =>
                                            setproduct({
                                                ...product,
                                                quantity: e.target.quantity?.value,
                                            })
                                        }
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
                                        value={product.description}
                                        onChange={(e) => setproduct({ ...product, description: e.target.description?.value })}
                                    />
                                </div>
                                <div className="">
                                    <select
                                        className="form-select"
                                        name="shipping"
                                        aria-label="Default select example"
                                    >

                                        <option value={""}>Select Shipping</option>
                                        <option value={"yes"}>Yes</option>
                                        <option value={"No"}>No</option>
                                    </select>
                                </div>
                                <br /> <br />

                                <div className="">

                                    <button type="submit" className="btn btn-primary  ">
                                        Update Product
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

export default UpdateProduct;
