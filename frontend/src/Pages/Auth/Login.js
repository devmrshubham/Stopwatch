import React from 'react'
import Layout from '../../Componet/Layout/Layout'
import { login } from '../../Api/Auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../../Api/Auth';
import { useLocation } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()




    const SubmitHandler = (e) => {
        e.preventDefault()


        const data = {

            email: e.target.email.value,
            password: e.target.password.value,

        }

        login(data)
            .then(
                (success) => {

                    if (success.data.status === 1) {
                        GetUser(success.data.User._id, success.data.token)
                            .then((success) => {

                                console.log(success)
                                if (success.data.status === 1) {
                                    e.target.reset()
                                    toast.success(success.data.msg)
                                    navigate(`${location.state ? location.state : "/"}`)
                                    localStorage.setItem("login", JSON.stringify({ user: success.data, role: true, admin: success.data.User.role }))
                                }
                            }).catch(
                                (error) => {
                                    console.log(error)
                                }
                            )
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
                    <h1>Login Page</h1>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' name="email" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password :</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder=" Enter Your Password" name="password" />
                    </div>


                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={() => navigate("/forgate_password")} type="button" class="btn btn-link">Forgate Password</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login
