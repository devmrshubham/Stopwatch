import axios from "axios";
const Url = "http://localhost:5000";

export const getProduct = (slug) => {
    return new Promise(async (resolve, rejected) => {

        try {
            if (slug === undefined) {
                await axios.get(`${Url}/get-product`)
                    .then(
                        (success) => {
                            resolve(success)
                        }
                    ).catch(
                        (error) => {
                            rejected(error)
                        }
                    )
            } else {
                await axios.get(`${Url}/get-product/${slug}`)
                    .then(
                        (success) => {
                            resolve(success)
                        }
                    ).catch(
                        (error) => {
                            rejected(error)
                        }
                    )
            }

        } catch (error) {
            rejected(error)
        }
    })
}

export const filterProduct = (checked, radio) => {
    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/product-filter`, { checked, radio })
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {
            rejected(error)
        }
    })

}

export const AddProduct = (data, id) => {
    return new Promise((resolve, rejected) => {
        try {

            axios.post(`${Url}/create-product/${id}`, data)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )



        } catch (error) {
            rejected(error)
        }
    })
}

export const DeleteProduct = (id, imgName) => {
    return new Promise((resolve, rejected) => {
        try {

            axios.delete(`${Url}/delete-product/${id}/${imgName}`)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )



        } catch (error) {
            rejected(error)
        }
    })
}

export const updateProduct = (id, data) => {
    return new Promise((resolve, rejected) => {
        try {

            axios.put(`${Url}/update_product/${id}`, data)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )



        } catch (error) {
            rejected(error)
        }
    })
}