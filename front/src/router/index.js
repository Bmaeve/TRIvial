import { createRouter, createWebHistory } from 'vue-router'
import AnalyseView from '../views/AnalyseView.vue'
import LoginView from '../views/LoginView.vue'
import SecoursView from '../views/SecoursView.vue'
import ComparaisonView from '../views/ComparaisonView.vue'
//The different routes of the application
const routes = [
  {
    path: '/TRIvial/Analyse',
    name: 'TRIvial',
    component: AnalyseView
  },
  {
    path: '/TRIvial',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/TRIvial/Secours',
    name: 'Secours',
    component: SecoursView
  },
  {
    path: '/TRIvial/Comparaisons',
    name: 'Comparaisons',
    component: ComparaisonView
  },
  { path: '/', redirect: '/TRIvial' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
