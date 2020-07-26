const axios = require('axios');

export const postService = {
    query,
    remove,
    save,
    getById,
    // addOrRemoveLike,
    // addComment
    // getEmptyPost
}

function query() {
   
    return axios.get(`http://localhost:3000/post`)
        .then(res => res.data)
}

// function getEmptyPost() {
//     return {
//         name: '',
//         price: '',
//         type: '',
//         inStock: ''
//     }
// }

// function addComment(postId,instaUser,comment){
//     console.log(comment);
//     return axios.post(`http://localhost:3000/post/${postId}/comment/`, instaUser)
//     .then(res => res.data)
// }

// function addOrRemoveLike(postId,instaUser,like){
//     console.log(instaUser._id);
//     return (like) ? _addLike(postId,instaUser) : _removeLike(postId,instaUser._id)

// }

// function _addLike(postId,instaUser){
//     // console.log(postId,instaUser);
//     return axios.post(`http://localhost:3000/post/${postId}/likeBy/`, instaUser)
//         .then(res => res.data)

// }

// function _removeLike(postId,likeById){
//     return axios.delete(`http://localhost:3000/post/${postId}/likeBy/${likeById}`) 
// }


function getById(id) {
    return axios.get(`http://localhost:3000/post/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`http://localhost:3000/post/${id}`)
}

function save(post) {
    return (post._id) ? _update(post) : _add(post)
}

function _update(post) {
    return axios.put(`http://localhost:3000/post/${post._id}`, post)
        .then(res => res.data)
}

function _add(post) {
    return axios.post(`http://localhost:3000/post/`, post)
        .then(res => res.data)
}