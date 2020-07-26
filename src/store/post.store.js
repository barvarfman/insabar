// import { postService } from "@/services/post.service.js";
import { userService } from '@/services/user.service.js';
export const postStore = {
//   strict: true,
//   state: {
//     posts: [],
//   },
//   getters: {
//     posts(state) {
//       return state.posts;
//     },
//   },
//   mutations: {
   

//     setPosts(state, { posts }) {
//       state.posts = posts;
//     },
//     removePost(state, { id }) {
//       const postIdx = state.posts.findIndex((post) => post._id === id);
//       state.posts.splice(postIdx, 1);
//     },
//     addPost(state, { savedPost }) {
//       state.posts.unshift(savedPost);
//     },
//     updatePost(state, { savedPost }) {
//       const idx = state.posts.findIndex((post) => post._id === savedPost._id);
//       state.posts.splice(idx, 1, savedPost);
//     },
//   },
//   actions: {
//     loadPosts({ commit, state }) {
//       return userService.getById(12345).then((posts) => {
//         commit({ type: "setPosts", posts });
//         return posts;
//       });
//     },
//     removePost({ commit }, { id }) {
//       return userService.remove(id).then(() => {
//         commit({ type: "removePost", id });
//       });
//     },
//     savePost({ commit }, { post }) {
//       const type = post._id ? "updatePost" : "addPost";
//       if (!post._id) post.createdAt = Date.now();
//       return userService.save(post).then((savedPost) => {
//         commit({ type, savedPost });
//         return savedPost;
//       });
//     },

//   }
};
