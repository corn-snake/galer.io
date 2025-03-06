async function validateUser(b) {
    if ((await b)[1].trim().length !== 128 || (await b)[0].match(/\*/)) return false;
    const authquery = await sb.schema("udata").from("users").select("uid,logins(tknhash,expires)").eq('uname', (await b)[0].trim());
    if ((await authquery).data == null
        || (await authquery).data.length !== 1
        || (await authquery).data[0].expires < Date.now()
    ) return false;
    let ad = false;
    const uname = (await b)[0].trim();
    for (const it of await authquery.data[0].logins) {
        const task = await sha512(`${await uname}+${(await it).tknhash}`);
        if (await task == (await b)[1].trim()) ad = await it;
    }
    if (ad === false || ad.expires < Date.now()) return false;
    ad = await authquery.data[0];
    return ad;
}

async function validatLandStanding(b, t, u, c) {
    let type = ["owner", "editor", "viewer"];
    const authquery = await sb.schema("landata").from("externalAccesss").select(`${type[c] ?? "viewer"}`).eq("user", linkUser).eq("link", linkLink);
    if ((await authquery).data == null
        || (await authquery).data.length !== 1
    ) return false;
    switch (c) {
        case 2:
            if ((await authquery).data[0].host == u)
                return true;
            break;
        default:
            const num = (await authquery).data[0][["viewer", "editor"][c] ?? "viewer"].indexOf(u);
            if (num >= 0)
                return num;
    }
    return false;
}

async function killLogin(b) {
    const dq = await sb.schema("udata").from('logins').delete().eq('tknhash', await b);
    if ((await dq).error !== null) return false;
    return true;
}