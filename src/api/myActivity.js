import axios from 'axios';

export const saveVideo = async (data) => {
    const token = localStorage.getItem('token');
    return axios({
        method: 'POST',
        url: 'http://localhost:1337/videos',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
    })
    .then((response) => response)
    .catch(error => error)
}

export const deleteVideo = async (id) => {
    const token = localStorage.getItem('token');
    return axios({
        method: 'DELETE',
        url: `http://localhost:1337/videos/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => response)
    .catch((error => error))
}

export const getVideos = async (data) => {
    const token = localStorage.getItem('token');
    return axios({
        method: 'GET',
        url: `http://localhost:1337/videos?user=${data}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then((response) => response)
    .catch(error => error)
}

export const getVideo = async (data) => {
    const token = localStorage.getItem('token');
    return axios({
        method: 'GET',
        url: `http://localhost:1337/upload/files/${data}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then((response) => response)
    .catch(error => error)
}

export const manipulateVideo = async (data) => {
    const token = localStorage.getItem('token');
    return axios({
        method: 'POST',
        url: 'http://localhost:1337/videos/manipulate',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
    })
    .then((response) => response)
    .catch(error => error)
}