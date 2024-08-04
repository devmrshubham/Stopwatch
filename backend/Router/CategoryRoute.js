const express = require("express");
const Router = express.Router();
const { CategoryController } = require("../Controller/Category");
const { IsAdmin } = require("../middleware/authentication")

Router.post("/create-category/:id?", IsAdmin, (req, res) => {

    try {
        const response = new CategoryController().createCategory(req.body);
        response
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.send(error);
            });

    } catch (error) {
        res.send(error)
    }


});

Router.get("/get-category/:slug?", async (req, res) => {
    const { slug } = req.params;
    
    try {
        const response = new CategoryController().getCategory(slug);
        response
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.send(error);
            });

    } catch (error) {
        res.send(error)
    }
});



Router.put("/category_update/:id/:itemId?", IsAdmin, (req, res) => {
    const { itemId } = req.params;
    
    try {

        const response = new CategoryController().CategoryUpdate(req.body, itemId);
        response
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.send(error);
            });

    } catch (error) {
        res.send(
            {
                msg: "internal server error",
                status: 0
            }
        )
    }

})

Router.delete("/category_delete/:id/:itemId?", IsAdmin, (req, res) => {
    const { itemId } = req.params;
   
    try {

        const response = new CategoryController().CategoryDelete(itemId);
        response
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.send(error);
            });

    } catch (error) {
        res.send(
            {
                msg: "internal server error",
                status: 0
            }
        )
    }

})

module.exports = Router;
