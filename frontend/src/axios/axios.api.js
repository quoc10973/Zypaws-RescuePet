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

const getAllPetAPI = () => {
    const URL_API = "/pet/getall";
    return axios.get(URL_API);
}

const createDonationAPI = (amount, message) => {
    const URL_API = "/donation/create";
    let data = {
        amount: amount,
        message: message,
    };
    return axios.post(URL_API, data);
}

const captureSuccessDonationAPI = (token) => {
    const URL_API = "/donation/success";
    let data = {
        token: token,
    };
    return axios.post(URL_API, data);
}

const createAdoptionAPI = (createAdoptionDTO) => {
    const URL_API = "/adoption/create";
    return axios.post(URL_API, createAdoptionDTO);
}

export {
    loginAPI,
    loginGoogleAPI,
    getCurrentUserAPI,
    getPetAvailable,
    getAllPetAPI,
    getPetAPI,
    createDonationAPI,
    captureSuccessDonationAPI,
    createAdoptionAPI,
};