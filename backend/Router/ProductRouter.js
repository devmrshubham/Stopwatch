const express = require("express");
const Router = express.Router();
const Product = require("../Model/Product")
const { ProductController } = require("../Controller/Product");
const fileUpload = require("express-fileupload");
const { IsAdmin } = require("../middleware/authentication");

Router.post(
    "/create-product/:id?", IsAdmin, (req, res) => {
        try {

            const response = new ProductController().AddProduct(req);
            response
                .then((success) => {
                    res.send(success);
                })
                .catch((error) => {
                    res.send(error);
                });
        } catch (error) {
            res.send(error);
        }
    }
);


Router.get(
    "/get-product/:slug?", (req, res) => {

        try {

            const response = new ProductController().getProduct(req.params.slug);
            response
                .then((success) => {
                    res.send(success);
                })
                .catch((error) => {
                    res.send(error);
                });
        } catch (error) {
            res.send(error);
        }
    }
);

Router.delete(
    "/delete-product/:id/:imgName?", (req, res) => {


        try {

            const response = new ProductController().deleteProduct(req);
            response
                .then((success) => {
                    res.send(success);
                })
                .catch((error) => {
                    res.send(error);
                });
        } catch (error) {
            res.send(error);
        }
    }
);




Router.put("/update_product/:id?", (req, res) => {


    try {

        const response = new ProductController().UpdateProduct(req);
        response
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.send(error);
            });
    } catch (error) {
        res.send(error);

    }
})

Router.post(
    "/product-filter", (req, res) => {
        try {

            const response = new ProductController().ProductFilter(req);
            response
                .then((success) => {
                    res.send(success);
                })
                .catch((error) => {
                    res.send(error);
                });
        } catch (error) {
            res.send(error);
        }
    }
);


module.exports = Router;
