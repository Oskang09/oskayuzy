import request from './index';
import { dig } from 'digdata';

async function getInstagramInfo() {
    const response = await request("GET", `https://api.github.com/gists/f552f4285675cce59b1c8a6e8ec90e92`);
    return JSON.parse(dig(response, 'files.oskayuzy.content'));
}

export default {
    getInstagramInfo
};