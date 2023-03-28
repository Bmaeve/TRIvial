import { createRouter, createWebHistory } from 'vue-router'
import AnalyseView from '../views/AnalyseView.vue'
import LoginView from '../views/LoginView.vue'
import SecoursView from '../views/SecoursView.vue'

const routes = [
  {
    path: '/TRIvial/Analyse',
    name: 'TRIvial',
    component: AnalyseView
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/TRIvial/Secours',
    name: 'Secours',
    component: SecoursView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
