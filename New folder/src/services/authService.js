import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

// ======================
// REGISTER USER
// ======================
export const registerUser = (data) => {
    return axios.post(`${BASE_URL}/register`, data);
};

// ======================
// LOGIN USER
// ======================
export const loginUser = (data) => {
    return axios.post(`${BASE_URL}/login`, data);
};

// ======================
// OPTIONAL: SAVE TOKEN
// ======================
export const saveToken = (token) => {
    localStorage.setItem("token", token);
};

// ======================
// OPTIONAL: GET TOKEN
// ======================
export const getToken = () => {
    return localStorage.getItem("token");
};

// ======================
// OPTIONAL: AUTH HEADER
// ======================
export const authHeader = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};