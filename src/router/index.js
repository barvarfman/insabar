import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.cmp.vue'
import home from '../views/insta-app.cmp.vue'
import profilePage from '../views/profile-page.cmp.vue'
import addPhoto from '../views/add-photo.cmp.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/prfile-page',
    name: 'profilePage',
    component: profilePage
  },
  {
    path: '/add-photo',
    name: 'addPhoto',
    component: addPhoto
  },
 
]

const router = new VueRouter({
  routes
})

export default router
