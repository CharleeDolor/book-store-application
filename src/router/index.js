// Import necessary modules from vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Import views
import HomeView from '../views/HomeView.vue'

// Define routes
const routes = [
    {
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

// Create router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// Export the router instance
export default router
