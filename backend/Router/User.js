const express = require("express");
const Router = express.Router();
const { UserController } = require("../Controller/User");
const jwt = require("jsonwebtoken");
const User = require("../Model/User")
const { requireSignIn } = require("../middleware/authentication")

Router.post("/register", (req, res) => {
    try {
        const response = new UserController().register(req.body);
        response
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    } catch (error) {
        res.send(error)
    }
})

Router.post("/login", (req, res) => {
    try {
        const response = new UserController().Login(req.body);
        response
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    } catch (error) {
        res.send(error)
    }
})

Router.post("/forgate_password", (req, res) => {
    try {
        const response = new UserController().Forgate_password(req.body);
        response
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    } catch (error) {
        res.send(error)
    }
})




Router.get("/user/:token/:id?", requireSignIn, (req, res) => {
    const { id } = req.params

    try {

        const response = new UserController().GetData(id);
        response
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )



    } catch (error) {
        res.send(error)
    }
})



module.exports = Router