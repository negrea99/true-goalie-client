import axios from 'axios';

export const register = async (data) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:1337/auth/local/register',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        data
    })
    .then((response) => response)
    .catch(error => error)
}

export const login = async (data) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:1337/auth/local',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        data,
    })
    .then((response) => response)
    .catch(error => error)
}

export const myactivity = async (data) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:1337/auth/local',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        data
    })
    .then((response) => response)
    .catch(error => error)
}

export const getUser = async () => {
    return axios({
        method: 'GET',
        url: 'http://localhost:1337/users',
    })
    .then((response) => response)
    .catch(error => error)
}