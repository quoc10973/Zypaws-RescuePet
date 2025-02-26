import axios from "./axios.config";

const loginAPI = (email, password) => {
    const URL_API = "/authenticate/login";
    let data = {
        email: email,
        password: password,
    };
    return axios.post(URL_API, data);
}

const loginGoogleAPI = () => {
    const URL_API = "/authenticate/login-google";
    return axios.get(URL_API);
}

const getPetAvailable = () => {
    const URL_API = "/pet/getavailable";
    return axios.get(URL_API);
}

const getCurrentUserAPI = () => {
    const URL_API = "/user/getcurrent";
    return axios.get(URL_API);
}

const getPetAPI = (id) => {
    const URL_API = `/pet/${id}`;
    return axios.get(URL_API);
}

export {
    loginAPI,
    loginGoogleAPI,
    getPetAvailable,
    getCurrentUserAPI,
    getPetAPI,
};