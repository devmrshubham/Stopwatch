import axios from "axios";
const Url = "http://localhost:5000";

export const getCategory = (slug) => {
    return new Promise(async (resolve, rejected) => {
        try {
            if (slug === undefined) {
                await axios.get(`${Url}/get-category`)
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
                await axios.get(`${Url}/get-category/${slug}`)
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

export const AddCategory = (data, id) => {
    return new Promise((resolve, rejected) => {
        try {

            axios.post(`${Url}/create-category/${id}`, data)
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

export const DeleteCategory = (id, itemId) => {
    return new Promise((resolve, rejected) => {
        try {

            axios.delete(`${Url}/category_delete/${id}/${itemId}`)
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

export const updateCategoryName = (id, itemId, data) => {
    return new Promise((resolve, rejected) => {
        try {

            axios.put(`${Url}/category_update/${id}/${itemId}`, data)
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