import { ref } from "vue";
import router from "../router";

export const isAuth = ref(true);
export const auth = ()=>{isAuth.value = true; router.push("/")};
export const uname = ref("Sample User");