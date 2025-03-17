import { users, logins, lands } from "./sb.js";
import sha512 from "!common/sha512.js";
import { initial } from "./linkFuncs.js";

const login = async(uname, pwdHash, tknhash) => {
    const uhash = await sha512(uname),
        pw = await sha512(`${pwdHash}+${await uhash}`);
    const u = await (await users().select().eq("uname", uname)),
        d = await u.data[0];
    if (u.error !== null || u.data.length ==0) return -1;
    if (await pw == d.sfhash){
        const li = await (await logins().upsert({tknhash, uid: d.id, expires: Date.now() + 183 * 24 * 60 * 60 * 1000}, {ignoreDuplicates: true})),
            m = await initial(d.id);
        return await m;
    }
    return 0;
}

const register = async (uname, pwdHash, tknhash) => {
    const uhash = await sha512(uname),
        sfhash = await sha512(`${pwdHash}+${await uhash}`);
    const u = await (await users().insert({uhash, sfhash, uname}).select()).data[0],
        login = await (await logins().upsert({ tknhash, uid: (await u).id, expires: Date.now() + 183 * 24 * 60 * 60 * 1000 }, {ignoreDuplicates:true})),
        firstLand = await (await lands().upsert({user: (await u).id, id: (await u).id}, {ignoreDuplicates: true}));
    if((await u).error != null) return false;
    return await initial((await u).id); 
};

const logout = async (tknhash) =>{
    const dq = await logins().delete().eq("tknhash", tknhash);
    if ((await dq).error !== null) return false;
    return true;
};

export {login, register, logout}
 
//-------------------------

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

async function validateLandStanding(b, t, u, c) {
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