import axios from "axios";

const Url = "http://localhost:5000";

export const Register = (data) => {
    return new Promise((resolve, rejected) => {
        try {
            axios.post(`${Url}/register`, data)
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

export const login = (data) => {
    return new Promise((resolve, rejected) => {
        try {
            axios.post(`${Url}/login`, data)
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

export const GetUser = (id, token) => {
    return new Promise(async (resolve, rejected) => {

        try {
            if (id !== undefined) {
                await axios.get(`${Url}/user/${token}/${id} `)
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
                await axios.get(`${Url}/user/${token}`)
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
export const forgate = (data) => {
    return new Promise((resolve, rejected) => {
        try {
            axios.post(`${Url}/forgate_password`, data)
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

export const Arthorize = (token) => {

    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/user/${token}`)
                .then(
                    (success) => {
                        console.log(success)
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

export const AdminRoute = (token, id) => {

    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/admin/${token}/${id}`)
                .then(
                    (success) => {
                        console.log(success)
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