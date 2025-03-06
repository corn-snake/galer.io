Deno.serve({port:80}, async(r)=>{
    if (r.url.endsWith('/auth')) {
        // [uname,signed (hashed uname+tknhash)]
        const b = (await r).json();
        const c = await validateUser(await b);
        return c !== false ? new Response(await fetchBops({
            uname: (await b)[0],
            uid: await c.uid,
            forumpic: await c.forumpic
        }), {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        }) : small403();
    }
})