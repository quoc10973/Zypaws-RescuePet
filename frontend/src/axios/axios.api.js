import axios from "./axios.config";

const loginAPI = (email, password) => {
    const URL_API = "/authenticate/login";
    let data = {
        email: email,
        password: password,
    };
    return axios.post(URL_API, data);
}

export { loginAPI };