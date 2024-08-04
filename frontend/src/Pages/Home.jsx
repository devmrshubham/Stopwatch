import { useState, useEffect, useContext } from 'react'
import Layout from '../Componet/Layout/Layout'
import { getCategory } from "../Api/Category"
import { getProduct, filterProduct } from "../Api/Product"
import { toast } from 'react-toastify'
import { MainContext } from "../Context/ContextHolder"
import { prices } from '../Componet/prices'
import Footer from '../Componet/Layout/Footer';
import { Checkbox, Radio } from 'antd';








const Home = () => {
    const { Isloder } = useContext(MainContext)
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [imagePath, setImagePath] = useState("")
    const [check, setCheck] = useState([])
    const [radio, setRadio] = useState([])





    const GetallProduct = () => {
        getProduct()
            .then(
                (success) => {
                    Isloder(true)
                    if (success.data.status === 1) {
                        Isloder(false)

                        toast.success(success.data.msg)
                        setProduct(success.data.data)
                        setImagePath(success.data.path)

                    }
                }
            )
    }

    const GetallCategory = () => {
        getCategory()
            .then(
                (success) => {
                    Isloder(true)
                    if (success.data.status === 1) {
                        Isloder(false)
                        setCategory(success.data.Data)
                        toast.success(success.data.msg)


                    }
                }
            )
    }
    const handleFilter = (value, id) => {
        let all = [...check]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setCheck(all)
    }


    useEffect(() => {
        if (!check.length || !radio.length) GetallProduct()
    }, [ check, radio])

    useEffect(() => {
        GetallCategory()
    }, [])

    useEffect(() => {
        if (check.length || radio.length) filterProduct(check, radio)
            .then(
                (success) => {
                  console.log(success)
                }
            ).catch(
                (error) => {

                }
            )
    }, [check, radio])



    return (
        <Layout title=" All Product - best offers">
            <div className="row ">
                <div className="col-md-3    bg-success  text-light    user-select-none   ">
                    <br />

                    <div className=" pointer-event ">
                        <h6 className='  text-center    '> Filter By Category</h6>
                        <div className=" ps-5 ">
                            {
                                category?.map((d) => {
                                    return (
                                        <>
                                            <input type="checkbox" class="form-check-input" value={d.slug} id={d._id} onChange={(e) => handleFilter(e.target.checked, d._id)} />
                                            <label className=' ps-3 ' htmlFor={d._id}>
                                                {d.name}
                                            </label> <br />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div> <br />
                    <div className="      ">
                        <h6 className='  text-center    '> Filter By price</h6>
                        <div className=" ps-5    ">

                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    prices?.map((p) => {
                                        return (
                                            <div key={p._id}>
                                                <Radio value={p.array} >
                                                    {p.name}
                                                </Radio>
                                                <br />
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>


                        </div>
                    </div>

                </div>
                <div className="col-md-9  ">
                    {
                        JSON.stringify(radio, null, 4)
                    }
                    <h1 className=''>All Product</h1>

                    <div className=" d-flex  flex-wrap     ">
                        {
                            product.map((d) => {
                                return (
                                    <>
                                        <div className="card mx-auto  mx-md-3    my-3 " key={d._id}>
                                            <img src={`${imagePath}/${d.image}`} className="card-img-top  img-fluid " alt="img" />
                                            <div className="card-body ">
                                                <h5 className="card-title">{d.name} </h5>
                                                <p className="card-text">{d.description.substring(0,30)} </p>
                                                <p className="card-text"> ${d.price} </p>
                                                <button className=' btn   btn-primary  me-5 '>More Daitals</button>
                                                <button className=' btn  btn-secondary '>Add to Cart</button>



                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default Home
