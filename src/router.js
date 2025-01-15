import { createRouter, createWebHistory } from "vue-router"
import LogIn from "./views/LogIn.vue"
import Landing from "./views/Landing.vue"
import Place from "./views/Place.vue";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LogIn
    },
    {
        path: '/',
        name: 'Landing',
        component: Landing
    },
    {
        path: '/a/:alb',
        name: 'Album',
        component: Place,
    }
]

const router = createRouter({
    history: createWebHistory(window.location.host.substring(0, window.location.host.indexOf('/', 7))),
    linkExactActiveClass: 'current',
    routes
});

export default router;
