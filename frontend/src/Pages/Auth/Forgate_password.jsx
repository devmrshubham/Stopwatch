import React from 'react'
import Layout from '../../Componet/Layout/Layout'
import { forgate } from '../../Api/Auth'
import { toast } from 'react-toastify';
import { useNavigate, } from 'react-router-dom';




const Forgate_password = () => {
    const navigate = useNavigate()




    const SubmitHandler = (e) => {
        e.preventDefault()


        const data = {

            email: e.target.email.value,
            password: e.target.password.value,

        }

        forgate(data)
            .then(
                (success) => {
                    console.log(success)
                    if (success.data.status === 1) {
                        toast.success(success.data.msg)
                        navigate("/login")

                        e.target.reset()


                    } else {
                        toast.error(success.data.msg)
                        navigate("/forgate_password")
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }
    return (
        <Layout title="Forgate_password">
            <div className="register">

                <form onSubmit={(e) => SubmitHandler(e)}>
                    <h1>Forgate Password</h1>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' name="email" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"> new Password :</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder=" Enter Your New Password" name="password" />
                    </div>


                    <button type="submit" className="btn btn-primary">reset</button>

                </form>

            </div>
        </Layout>
    )
}

export default Forgate_password


