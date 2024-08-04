const categoryModel = require("../Model/CategoryModel")
const slugify = require('slugify')

class CategoryController {
    createCategory = (data) => {
        return new Promise(async (resolve, rejected) => {
            const { name } = data
            try {
                if (!name) {
                    rejected(
                        {
                            msg: "Name is require",
                            status: 0
                        }
                    )
                } else {
                    const exist = await categoryModel.findOne({ name }).sort({ desc: "desc" })
                    if (exist) {
                        rejected(
                            {
                                msg: "data already exist",
                                status: 0
                            }
                        )
                    } else {


                        const newCategory = new categoryModel({ name, slug: slugify(name) })
                        newCategory.save()
                            .then(
                                (success) => {
                                    resolve(
                                        {
                                            msg: "new category created",
                                            status: 1,
                                            category: newCategory
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    console.log(error)
                                    rejected(
                                        {
                                            msg: "unable to add the data",
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
                        msg: "error in category ",
                        status: 0
                    }
                )
            }
        })
    }

    getCategory = (slug) => {

        return new Promise(async (resolve, rejected) => {
            try {
                if (slug !== undefined) {
                    let data = await categoryModel.findOne({ slug })

                    if (data !== null) {
                        resolve(
                            {
                                data: data,
                                status: 1
                            }
                        )

                    } else {
                        rejected(
                            {
                                msg: "data not found",
                                status: 0
                            }
                        )
                    }
                } else {
                    let data = await categoryModel.find().sort({ _id: "descending" })
                    resolve(
                        {
                            msg: "get all category data",
                            Data: data,
                            status: 1
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

    CategoryUpdate = (data, id) => {


        return new Promise((resolve, rejected) => {
            const { name } = data

            try {
                if (!name) {
                    rejected(
                        {
                            msg: "Name is require",
                            status: 0
                        }
                    )
                } else {
                    categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) })
                        .then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Category Updated Successfully",
                                        status: 1,
                                        category: success
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                rejected(
                                    {
                                        msg: "Category not Updated Internal server error",
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
                        msg: "Internal server error ",
                        status: 0
                    }
                )

            }
        })
    }

    CategoryDelete = (id) => {


        return new Promise((resolve, rejected) => {


            try {
                if (id) {
                    categoryModel.findByIdAndDelete({ _id: id })
                        .then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Category deleted Successfully",
                                        status: 1,
                                        category: success
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                rejected(
                                    {
                                        msg: "Category not Updated Internal server error",
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
                        msg: "Internal server error ",
                        status: 0
                    }
                )

            }
        })
    }
}

module.exports = { CategoryController }