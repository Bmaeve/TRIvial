import { createRouter, createWebHistory} from 'vue-router'
import AnalyseView from '../views/AnalyseView.vue'
import LoginView from '../views/LoginView.vue'
import SecoursView from '../views/SecoursView.vue'

const routes = [
  {
    path: '/TRIVial/Analyse',
    name: 'TRIVial',
    component: AnalyseView
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/TRIVial/Secours',
    name: 'Secoure',
    component: SecoursView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
