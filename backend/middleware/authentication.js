const jwt = require("jsonwebtoken");
const User = require("../Model/User")
const fileUpload = require("express-fileupload")
const { GetRamdomImageName, ImageDesination } = require("../Helper");
const Product = require("../Model/Product")
const path = require("path")
const fs = require("fs");
const { default: slugify } = require("slugify");




exports.requireSignIn = async (req, res, next) => {
    const { token } = req.params

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                res.send(
                    {
                        msg: "user not authorized",
                        status: 0
                    }
                )
            } else {
                next()
            }
        })
    } catch (error) {
        console.log(error)
    }
}



exports.IsAdmin = async (req, res, next) => {
    const { id } = req.params

    try {
        const admin = await User.findById(id)
       
        if (admin.role === 1) {
            next()


        } else {

            res.send(
                {
                    msg: "User not Admin",
                    status: 0
                }
            )
        }
    } catch (error) {
        console.log(error)
    }
}

