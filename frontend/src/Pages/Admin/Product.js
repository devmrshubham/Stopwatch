import { useState, useEffect, useContext } from 'react'
import Adminmenu from '../../Componet/Layout/Adminmenu'
import Layout from '../../Componet/Layout/Layout'
import { getProduct } from '../../Api/Product'
import { toast } from "react-toastify"
import { MainContext } from '../../Context/ContextHolder'
import { Link } from 'react-router-dom'

const Product = () => {

    const { Isloder } = useContext(MainContext)
    const [data, setdata] = useState([])



    useEffect(() => {
        getProduct()
            .then(
                (success) => {
                    Isloder(true)
                    if (success.data.status === 1) {
                        Isloder(false)
                        setdata(success.data)
                        toast.success(success.data.msg)



                    }

                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )

    }, [Isloder, setdata])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <Adminmenu />
                </div>
                <div className="col-md-9">
                    <h1>All Product list</h1>
                    <div className="row ">
                        {
                            data.data?.map((d) => {
                                return (
                                    <>
                                        <div className="col  col-12    col-sm-6  col-lg-4  col-md-4   col-xl-3  ">
                                            <Link to={`/dashbord/admin/update-product/${d.slug}`} className=' text-decoration-none ' key={d?._id}>
                                                <div className="card  " key={d._id}>
                                                    <img src={`${data.path}${d.image}`} className="card-img-top img-fluid " alt="img" />
                                                    <div className="card-body ">
                                                        <h5 className="card-title">{d.name} </h5>
                                                        <p className="card-text">{d.description} </p>



                                                    </div>
                                                </div>

                                            </Link>


                                        </div>

                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Product
