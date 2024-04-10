import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/user',
        name: 'user',
        component: () => import ('../views/BooksListView.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import ('../components/ShoppingCart.vue')
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import ('../views/ForbiddenView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router