const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./Router/User")
const CategoryRoute = require("./Router/CategoryRoute")
const ProdcutRouter = require("./Router/ProductRouter");
const fileUpload = require("express-fileupload")



//dot envconfigration
dotenv.config({ path: "./config.env" })
//reset object
const app = express()
//middelware
app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static(__dirname + "/public"))

//routers
app.use("/", UserRouter)
app.use("/", CategoryRoute)
app.use("/", ProdcutRouter)
//port
const PORT = process.env.PORT || 5000;

//listern



mongoose.connect(process.env.CONNECTION_DB)
    .then(
        (success) => {
            console.log("yess database connected")
            app.listen(PORT, () => {
                console.log(`this server is running on at http://localhost:${PORT}`)
            })
        }
    ).catch(
        (error) => {
            console.log("database not connected")
            console.log(error)
        }
    )





