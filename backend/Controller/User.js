const UserModel = require("../Model/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


class UserController {

    register = (data) => {
        return new Promise(async (resolve, rejected) => {
            const { name, email, password, address, mobile } = data
            try {
                if (!name || !email || !password || !address || !mobile) {
                    rejected(
                        {
                            msg: "please fill the data",
                            status: 0
                        }
                    )
                } else {
                    const exist = await UserModel.findOne({ email });
                    if (exist) {
                        rejected(
                            {
                                msg: "User already exist ",
                                status: 0
                            }
                        )
                    } else {
                        const newUser = new UserModel(
                            {
                                name, email, password, address, mobile, role: 0
                            }
                        )

                        newUser.save()
                            .then(
                                (success) => {
                                    resolve(
                                        {
                                            msg: "User register successfully ",
                                            user: newUser,
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    rejected(
                                        {
                                            msg: "Unable to Add data",
                                            status: 0
                                        }
                                    )
                                }
                            )


                    }
                }

            } catch (error) {
                rejected(
                    {
                        msg: "internal server error",
                        status: 0
                    }
                )
            }
        })
    }

    Login = (data) => {
        return new Promise(async (resolve, rejected) => {
            const { email, password } = data;
            try {
                if (!email || !password) {
                    rejected(
                        {
                            msg: "Please fill the inputs",
                            status: 0
                        }
                    )
                } else {
                    const user = await UserModel.findOne({ email });
                    if (!user) {
                        rejected(
                            {
                                msg: "User not exist please register",
                                status: 0
                            }
                        )
                    } else {
                        const matchpassword = await bcrypt.compare(password, user.password)
                        if (!matchpassword) {
                            rejected(
                                {
                                    msg: "password not matched",
                                    status: 0
                                }
                            )
                        } else {
                            const token = await jwt.sign({ id: user._id }, "sdghsdaofjdswfsdfjewrf", { expiresIn: "1d" })


                            resolve(
                                {
                                    msg: "User login successfully",
                                    status: 1,
                                    User: user,
                                    token: token
                                }
                            )
                        }
                    }
                }

            } catch (error) {
                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }


    Forgate_password = (data) => {
        return new Promise(async (resolve, rejected) => {
            const { email, password } = data;
            try {
                if (!email || !password) {
                    rejected(
                        {
                            msg: "Please fill the inputs",
                            status: 0
                        }
                    )
                } else {
                    const user = await UserModel.findOne({ email });
                    if (!user) {
                        rejected(
                            {
                                msg: "User not exist please register",
                                status: 0
                            }
                        )
                    } else {

                        const NewPassword = await bcrypt.hash(password, 10)


                        UserModel.findByIdAndUpdate(user._id, { password: NewPassword })
                            .then(
                                (success) => {
                                    resolve(
                                        {
                                            msg: "passwod reset successfully",
                                            status: 1,
                                            user: success
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    rejected(
                                        {
                                            msg: "Unable to reset data",
                                            status: 0
                                        }
                                    )
                                }
                            )
                    }
                }

            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }


    GetData = (id) => {
        return new Promise(async (resolve, rejected) => {
            try {
                if (id !== undefined) {
                    let data = await UserModel.findOne({ _id: id })
                    if (data === null) {
                        rejected(
                            {
                                msg: "Data not Found",
                                status: 0
                            }
                        )
                    } else {
                        resolve(
                            {
                                User: data,
                                msg: "user login successfully",
                                status: 1


                            }
                        )
                    }
                } else {
                    let data = await UserModel.find()
                    resolve(
                        {
                            User: data
                        }
                    )
                }
            } catch (error) {
                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }
}

module.exports = { UserController }