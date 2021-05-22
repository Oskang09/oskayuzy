async function getInstagramInfo() {
    const response = await fetch('https://gist.githubusercontent.com/Oskang09/f552f4285675cce59b1c8a6e8ec90e92/raw/oskayuzy.json')
    const json = await response.json();
    return json;
}

export default {
    getInstagramInfo,
};