import React from 'react'
import Layout from '../../Componet/Layout/Layout'
import { Register as singUp } from '../../Api/Auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate()
    const SubmitHandler = (e) => {
        e.preventDefault()


        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            mobile: e.target.phone.value,
            address: e.target.address.value
        }

        singUp(data)
            .then(
                (success) => {
                    console.log(success)
                    if (success.data.status === 1) {
                        toast.success(success.data.msg)
                        e.target.reset()
                        navigate("/login")
                    } else {
                        toast.error(success.data.msg)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }
    return (
        <Layout title="register page">
            <div className="register">

                <form onSubmit={(e) => SubmitHandler(e)}>
                    <h1>Register Page</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name :</label>
                        <input type="text" className="form-control" id="exampleInputName1" placeholder='Enter Your Name' name="name" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' name="email" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password :</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder=" Enter Your Password" name="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone1" className="form-label">Phone :</label>
                        <input type="text" className="form-control" id="exampleInputPhone1" placeholder='Enter Your Phone' name="phone" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress1" className="form-label">Address :</label>
                        <input type="text" className="form-control" id="exampleInputAddresss1" placeholder=' Enter Your Addresss' name="address" />

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register
