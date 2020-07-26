const axios = require('axios');

export const userService = {
    query,
    remove,
    save,
    getById,
}

function query() {
    return axios.get(`http://localhost:3000/user`)
        .then(res => res.data)
}

function getById(id) {
    return axios.get(`http://localhost:3000/user/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`http://localhost:3000/user/${id}`)
}

function save(user) {
    return (user._id) ? _update(user) : _add(user)
}

function _update(user) {
    return axios.put(`http://localhost:3000/user/${user._id}`, user)
        .then(res => res.data)
}

function _add(user) {
    return axios.post(`http://localhost:3000/user/`, user)
        .then(res => res.data)
}