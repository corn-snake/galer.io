import sha512 from "!common/sha512.js";

let isAuth = ref(await (async () => {
    if (localStorage.getItem('stamp') == null) return false;
    const proof = await sha512(`${localStorage.getItem('uname')}+${localStorage.getItem('stamp')}`);
    let conf = await fetch(`${location.protocol}//${location.hostname}/auth`, {
        "Access-Control-Allow-Origin": '*',
        method: "POST",
        body: `["${localStorage.getItem('uname')}","${await proof}"]`
    }).then(r => {
        if (r.status == 200) {
            fetchedRefs(r.json())
            return true;
        }
        return false;
    });
    return conf;
})());
const logout = () => isAuth.value = false;
const login = () => isAuth.value = true;

async function tryAuth(usr, pwd, callback) {
    const uHash = await sha512(usr), pHash = await sha512(pwd), rn = Math.floor(Math.random() * 2048), d = Date.now();
    if (!localStorage.getItem("stamp")) {
        localStorage.setItem("stamp", await sha512(`${rn}+${d}+${usr}`));
        localStorage.setItem("uname", usr);
    }
    fetch(`${location.protocol}//${location.hostname}:800/login`, {
        "Access-Control-Allow-Origin": '*',
        method: "POST",
        body: `["${await uHash}","${await pHash}","${localStorage.getItem("stamp")}"]`
    }).then(r => {
        if (r.status != 200) return `{user: null}`
        return r.json()
    }).then(rt => {
        if (rt == "{user: null}") return;
        login();
        callback();
        fetchedRefs(rt);
        router.push("/");
    });
}

async function killLogin(callback) {
    fetch(`${location.protocol}//${location.hostname}:800/invalidate`, {
        "Access-Control-Allow-Origin": '*',
        method: "POST",
        body: localStorage.getItem("stamp")
    }).then(r => {
        callback();
        if (r.status == 204) {
            localStorage.clear();
            logout(); voidBoPs();
            router.push('/login');
        }
    });
}

export {isAuth, tryAuth, killLogin};