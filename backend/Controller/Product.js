const Product = require("../Model/Product")
const fs = require("fs");
const { GetRamdomImageName, ImageDesination } = require('../Helper')
const slugify = require("slugify")
const path = require("path");




class ProductController {
    AddProduct = (req) => {
        return new Promise((resolve, rejected) => {
            const { name, slug, description, price, category, quantity, shipping } = req?.body
            const Image = req.files?.image

            try {

                if (!name && !description && !price && !category && !quantity && !shipping && !Image) {
                    rejected(
                        {
                            msg: "please fill the all input fields",
                            status: 0
                        }
                    )

                }

                else if (!name) {
                    rejected(
                        {
                            msg: " please fill the name",
                            status: 0
                        }
                    )
                } else if (!description) {
                    rejected(
                        {
                            msg: " please fill the description",
                            status: 0
                        }
                    )
                }

                else if (!price) {
                    rejected(
                        {
                            msg: " please fill the price",
                            status: 0
                        }
                    )
                }

                else if (!category) {
                    rejected(
                        {
                            msg: " please fill the category",
                            status: 0
                        }
                    )
                }

                else if (!quantity) {
                    rejected(
                        {
                            msg: " please fill the quantity",
                            status: 0
                        }
                    )
                }

                else if (Image === undefined || !Image) {
                    rejected(
                        {
                            msg: "please fill the image file",
                            status: 0
                        }
                    )
                } else {
                    const ImageArr = Image?.name.split(".")
                    const Imagetype = ImageArr[ImageArr.length - 1]
                    const AllowExt = ["png", "jpeg", "jpg", "gif", "webp"]
                    if (AllowExt.includes(Imagetype.toLowerCase())) {
                        var filename = GetRamdomImageName(Image?.name)
                        let newPath = ImageDesination("product", filename)
                        Image.mv(newPath)



                    }

                }

                const product = new Product(
                    {
                        name, slug: slugify(name), description, price, category, quantity, image: filename, shipping

                    }
                )
                product.save()
                    .then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Data Added Successfully ",
                                    status: 1,
                                    product: product,
                                    path: "http://localhost:5000/uploads/product/"
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                            rejected(
                                {
                                    msg: "Unable to Add Data",
                                    status: 0,

                                }
                            )
                        }
                    )
            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "Internal server Error",
                        status: 0
                    }
                )
            }
        })
    }


    getProduct = (slug) => {
        return new Promise(async (resolve, rejected) => {
            try {
                if (slug !== undefined) {
                    let data = await Product.findOne({ slug })
                    if (data == null) {
                        rejected(
                            {
                                msg: "data not found",
                                status: 0
                            }
                        )
                    } else {
                        resolve(
                            {
                                data: data,
                                status: 1,
                                path: "http://localhost:5000/uploads/product/",
                                msg: "singal product get"
                            }
                        )
                    }
                } else {
                    let data = await Product.find()
                    resolve(
                        {
                            status: 1,
                            data: data,
                            path: "http://localhost:5000/uploads/product/",
                            msg: "all product get",
                            total: `record of total product ${data.length}`
                        }
                    )
                }
            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "internal  server error get product",
                        status: 0
                    }
                )
            }
        })
    }

    deleteProduct = (req) => {

        return new Promise((resolve, rejected) => {

            try {
                const { id, imgName } = req?.params

                if (id && imgName !== undefined) {
                    Product.findByIdAndDelete({ _id: id })
                        .then(
                            (success) => {
                                const imagePath = path.join(__dirname, "../", "public/uploads/product/", imgName)
                                fs.unlinkSync(imagePath)

                                resolve(
                                    {
                                        msg: "Data deleted successfully done",
                                        status: 1,
                                        data: success
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                rejected(
                                    {
                                        msg: "Unable to deleted the data",
                                        status: 0
                                    }
                                )
                            }
                        )
                }

            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "error in delete product",
                        status: 0
                    }
                )
            }
        })
    }

    UpdateProduct = (req) => {

        const Image = req.files?.image
        const { id } = req.params
        const { name, description, price, category, quantity, oldimage, shipping } = req?.body

        return new Promise(async (resolve, rejected) => {

            try {

                if (!name) {
                    rejected(
                        {
                            msg: "please fill the name",
                            status: 0
                        }
                    )
                } else


                    if (!price) {
                        rejected(
                            {
                                msg: "please fill the price",
                                status: 0
                            }
                        )
                    }

                    else if (!description) {
                        rejected(
                            {
                                msg: "please fill the description",
                                status: 0
                            }
                        )
                    }

                    else if (!category) {
                        rejected(
                            {
                                msg: "please fill the category",
                                status: 0
                            }
                        )
                    }
                    else if (!shipping) {
                        rejected(
                            {
                                msg: "please select the shipping",
                                status: 0
                            }
                        )
                    }

                    else if (!quantity) {
                        rejected(
                            {
                                msg: "please fill the quantity",
                                status: 0
                            }
                        )
                    } else


                        if (Image !== undefined) {
                            const NewImageArr = Image?.name.split(".");
                            let ext = NewImageArr[NewImageArr.length - 1]
                            const AllowExt = ["png", "jpeg", "jpg", "gif", "webp"]
                            if (AllowExt.includes(ext.toLowerCase())) {
                                var NewImage = GetRamdomImageName(Image?.name);
                                const Destination = ImageDesination("product", NewImage)
                                Image.mv(Destination)



                                const Imagepath = path.join(__dirname, "../", "public/uploads/product/", oldimage);

                                fs.unlinkSync(Imagepath)

                                Product.findByIdAndUpdate(id, { name, slug: slugify(name), price, description, quantity, category, image: NewImage, shipping })
                                    .then(
                                        (success) => {

                                            resolve(
                                                {
                                                    msg: "data updated successfully with new image",
                                                    status: 1,
                                                    data: success
                                                }
                                            )

                                        }
                                    ).catch(
                                        (error) => {
                                            console.log("error in image uploading")
                                            console.log(error)
                                        }

                                    )

                            } else {
                                rejected(
                                    {
                                        msg: "only image file is avaible",
                                        status: 0
                                    }
                                )
                            }
                        } else {

                            Product.findByIdAndUpdate(id, { name, slug: slugify(name), price, description, quantity, category, shipping })
                                .then(
                                    (success) => {

                                        resolve(
                                            {
                                                msg: "data updated successfully with new image",
                                                status: 1,
                                                data: success
                                            }
                                        )

                                    }
                                ).catch(
                                    (error) => {
                                        console.log("error in image uploading")
                                        console.log(error)
                                    }

                                )

                        }
            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "error in Update product",
                        status: 0
                    }
                )
            }
        })
    }

    ProductFilter = (req) => {
        return new Promise(async (resolve, rejected) => {
            try {
                const [checked, radio] = req.body
                 console.log(checked,radio)
                let args = {};
                if (checked.length > 0) args.category = checked;
                if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
                const products = await Product.find(args);
                resolve(
                    {
                        status: 1,
                        products,
                        msg: "product is filter successfully done"
                    }
                )
            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "product filter error",
                        status: 0
                    }
                )
            }
        })
    }


}

module.exports = { ProductController }