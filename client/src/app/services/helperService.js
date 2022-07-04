const baseURL = "http://localhost:8084";
const headers = { 'Content-Type': "application/json" }
const helperService = {
    signup: async (payload) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/signup`,
                {
                    method: 'POST',
                    body: payload,
                    headers: { ...headers }
                }
            );
            const { status, message } = await response.json()
            if (status == 201) {
                return Promise.resolve({ status, message })
            }
            return Promise.reject({status,message})
        } catch (err) {
            return Promise.reject({
                status: err.status,
                message: err.message,

            });
        }
    },
    signin: async (payload) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/signin`,
                {
                    method: 'POST',
                    body: payload,
                    headers: { ...headers }
                }
            );
            const data = await response.json()
            if (data.status == 200) {
                return Promise.resolve({ status: data.status, message: data.message, data: data.result })
            }
            return Promise.reject({ status: data.status, message: data.message })
        } catch (err) {
            return Promise.reject({
                status: err.status,
                message: err.message,
            });
        }
    },
    getUserWithToken: async () => {
        try {
            const data = localStorage.getItem('user');
            const response = await fetch(`${baseURL}/api/v1/user/get`, {
                headers: { ...headers, Authorization: `Bearer ${JSON.parse(data.token)}` }
            })
            const { status, user } = await response.json();
            return Promise.resolve({
                status,
                user
            })
        }
        catch (err) {
            return Promise.reject({ status: err.status, message: err.message })
        }
    },
    getProducts: async (payload,token) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/products`,
                {
                    method: 'GET',
                    headers: { ...headers,'Authorization' : token }
                }
            );
            const { status, message } = await response.json()
            if (status == 200) {
                return Promise.resolve({ status, message })
            }
            return Promise.reject({status,message})
        } catch (err) {
            return Promise.reject({
                status: err.status,
                message: err.message,

            });
        }
    },
    addProduct: async (payload,token) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/products`,
                {
                    method: 'POST',
                    body: payload,
                    headers: { ...headers,'Authorization' : token }
                }
            );
            const { status, message } = await response.json()
            if (status == 201) {
                return Promise.resolve({ status, message })
            }
            return Promise.reject({status,message})
        } catch (err) {
            return Promise.reject({
                status: err.status,
                message: err.message,

            });
        }
    },
    updateProduct: async (payload,token) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/products`,
                {
                    method: 'PUT',
                    body: payload,
                    headers: { ...headers,'Authorization' : token }
                }
            );
            const { status, message } = await response.json()
            if (status == 200) {
                return Promise.resolve({ status, message })
            }
            return Promise.reject({status,message})
        } catch (err) {
            return Promise.reject({
                status: err.status,
                message: err.message,

            });
        }
    },
    deleteProduct: async (payload,token) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/products`,
                {
                    method: 'DELETE',
                    body: payload,
                    headers: { ...headers,'Authorization' : token }
                }
            );
            const { status, message } = await response.json()
            if (status == 200) {
                return Promise.resolve({ status, message })
            }
            return Promise.reject({status,message})
        } catch (err) {
            return Promise.reject({
                status: err.status,
                message: err.message,

            });
        }
    },
}

export default helperService;