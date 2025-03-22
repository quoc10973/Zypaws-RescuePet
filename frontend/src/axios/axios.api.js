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

const getAllUserAPI = () => {
    const URL_API = "/user/getall";
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

const deletePetAPI = (id) => {
    const URL_API = `/pet/delete/${id}`;
    return axios.delete(URL_API);
}

const updatePetAPI = (id, updatePetDTO) => {
    const URL_API = `/pet/update/${id}`;
    return axios.put(URL_API, updatePetDTO);
}

const createPetAPI = (createPetDTO) => {
    const URL_API = "/pet/create";
    return axios.post(URL_API, createPetDTO);
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

const addPetToFavoriteAPI = (petId) => {
    const URL_API = `/user/add-favorites/${petId}`;
    return axios.post(URL_API);
}

const getUserFavoritesAPI = () => {
    const URL_API = "/user/get-favorites";
    return axios.get(URL_API);
}

const removePetFromFavoriteAPI = (petId) => {
    const URL_API = `user/remove-favorites/${petId}`;
    return axios.delete(URL_API);
}

const getUserInquiriesAPI = () => {
    const URL_API = "/adoption/get-user-adoptions";
    return axios.get(URL_API);
}

const updateUserAPI = (id, updateUserDTO) => {
    const URL_API = `/user/update/${id}`;
    return axios.put(URL_API, updateUserDTO);
}

const deleteUserAPI = (id) => {
    const URL_API = `/user/delete/${id}`;
    return axios.delete(URL_API);
}

const createUserAPI = (createUserDTO) => {
    const URL_API = "/user/create";
    return axios.post(URL_API, createUserDTO);
}

const getDonationStatisticsAPI = () => {
    const URL_API = "/donation/statistics";
    return axios.get(URL_API);
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
    addPetToFavoriteAPI,
    getUserFavoritesAPI,
    removePetFromFavoriteAPI,
    getUserInquiriesAPI,
    getAllUserAPI,
    updateUserAPI,
    deleteUserAPI,
    createUserAPI,
    deletePetAPI,
    updatePetAPI,
    createPetAPI,
    getDonationStatisticsAPI,
};