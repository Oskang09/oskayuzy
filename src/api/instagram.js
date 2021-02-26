import request from './index';
import { dig } from 'digdata';
import { gist_id } from '#/assets/setting.json';

async function getInstagramInfo() {
    const response = await request("GET", `https://api.github.com/gists/${gist_id}`);
    return JSON.parse(dig(response, 'files,oskayuzy.json,content', { seperator: "," }));
}

export default {
    getInstagramInfo
};