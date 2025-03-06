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