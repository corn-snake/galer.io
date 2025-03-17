import { initial, getLand, siftLinks } from "./linkFuncs.js";
import { login, logout, register } from "./usrFuncs.js";
import file from "./fakebe.json" with { type: "json" };
import sha512 from "../common/sha512.js";

Deno.serve({port:80}, async(r)=>{
    switch (r.method){
        case "POST":
            if (r.url.endsWith("/addPic")) {
                //[]
            }
            if (r.url.endsWith('/land')) {
                //[uname,signed]
                const b = (await r).json();
                const c = await validateUser(await b);
                if (c === false) return small403();
                const fetchedBoP = await fetchBoPStuff(c, (await b)[2], (await b)[3], (await b)[4]);
                return fetchedBoP;
            }
            if (r.url.endsWith('/login')) {
                //[uname,phash,tknhash]
                const a = (await r).json();
                if (!Array.isArray(await a) || (await a).length !== 3 || (await a)[1].length !== 128 || (await a)[2].length !== 128) return new Response('payload length is wrong.', {
                    status: 400,
                    headers: {
                        "Access-Control-Allow-Origin": '*'
                    }
                });
                const b = (await a).map((e) => e.trim()),
                    c = await login((await b)[0], (await b)[1], (await b)[2]);
                if (await c == -1) return new Response("null", {
                    status: 404,
                    headers: {"Access-Control-Allow-Origin":'*'}
                })
                if (await c==0) return new Response("bad pwd", {
                    status: 401,
                    headers: {"Access-Control-Allow-Origin":'*'}
                })
                return new Response(JSON.stringify(await c), {
                    status: 200,
                    headers: {
                        "Access-Control-Allow-Origin": '*'
                    } 
                }); 
            }
            if (r.url.endsWith("/signup")) {
                // [uname,tknhash,pwdhash]
                const a = await (await r).json();
                return new Response(JSON.stringify(await register(a[0], a[2], a[1])), {status: 200, headers: {"Access-Control-Allow-Origin": "*"}})
            }
            if (r.url.endsWith('/logout')) {
                const b = await r.text();
                const dq = await logout(await b);
                return dq ? new Response(null, {
                    status: 204,
                    headers: {
                        "Access-Control-Allow-Origin": '*'
                    }
                }) : new Response('db error. try again.', {
                    status: 500,
                    headers: {
                        "Access-Control-Allow-Origin": '*'
                    }
                });

            }
        break;
        case "GET":
            if (r.url.endsWith("/link")) {
                //[uname,signed,lid]
                const b = (await r).json();
                const c = await validateUser(await b);
                if (c === false) return small403();
                const fetchedBoP = await fetchBoPStuff(c, (await b)[2], (await b)[3], (await b)[4]);
                return fetchedBoP;
            }
    }
    return small404();
})