import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { isAuth } from './stores/login';

router.beforeEach(async (to, from) => {
    if (!isAuth.value && to.name !== "Login") return { name: 'Login' };
    if (isAuth.value && to.name == "Login") return { name: 'Landing' };
});

const app = createApp(App).use(router).mount('#app');
