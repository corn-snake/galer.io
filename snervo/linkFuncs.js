import { lands, links, images } from "./sb.js";
const type_res = {"image": images, "land": lands};
// includes land stuff
const getLand = async (uid, lid) => await (await lands().select().eq("user", uid).eq("id", lid)).data[0], 
    initial = async(uid)=>await getLand(uid, uid),
    resolveLink = async(uid, type, into) => await(await type_res[type]().select().eq("user", uid).eq("id", into)).data[0],
    siftLinks = async(uid, linkArray)=>linkArray
        .map(async e=>await (await links().eq("user",e.user).eq("into", e.into)).data[0])
        .filter(async e=>uid == (await e).user
            || (await e).editor !== null && (await e).editor.length > 0 && (await e).editor.indexOf(uid) > -1
            || (await e).viewer !== null && (await e).viewer.length > 0 && (await e).viewer.indexOf(uid) > -1)
        .map(async e=>await resolveLink(await e));

export {initial, getLand, siftLinks};
/*
    land {
        link->land {
            link->image
            link->image
            link->land...
            ...
        }
        link->land...
        link->image
        ...
    }
    -------------------
    link {
        type
        owner
        "+into -> T
        public
        editor[]
        viewer
    }
    ------------------
    ------------------
*/

//--------------------------------------------------------
function getPrivilege(sbResult, uid) {
    if (sbResult.owner == uid) return 2;
    if (sbResult.editor !== null && sbResult.editor.indexOf(uid) >= 0) return 1;
    if (sbResult.viewer.indexOf(uid) >= 0) return 0;
    return -1;
}

async function fetchLand(usr, realm=undefined) {
    const ltR = realm == undefined ? await sb.schema("landata").from("albums").select("name, images[1]") : await sb.schema('landata').from('albums').select('tags,images,name').eq("id", realm),
        ltD = await ltR.data;
    return JSON.stringify(await ltD);
}