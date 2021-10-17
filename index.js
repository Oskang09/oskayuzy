const { IgApiClient } = require('instagram-private-api');
const { create } = require('apisauce');
const qs = require('query-string');

const { GH_TOKEN, IG_USERNAME, IG_PASSWORD } = process.env;
const { boy, girl, gallery, gist_id } = require('./src/assets/setting.json');
const client = create({
    headers: { 'Authorization': `token ${GH_TOKEN}` }
});

async function request(method, path, data) {
    let response = undefined;
    let clientError = false;
    try {
        if (method === 'GET' && (typeof data === 'object' || typeof data === 'string')) {
            path += "?" + qs.stringify(data);
        }

        if (method !== "GET") {
            response = await client[method.toLowerCase()](path, data);
        } else {
            response = await client[method.toLowerCase()](path);
        }
    } catch (error) {
        clientError = !error.isAxiosError && !error.response;
        response = error.response
    }

    if (clientError || response.status >= 400) {
        console.log(clientError, response.data)
        throw new Error(response.data);
    }
    return response.data;
}

async function main() {
    const client = new IgApiClient();
    client.state.generateDevice(boy.instagram_id + girl.instagram_id);

    await client.simulate.preLoginFlow();
    const user = await client.account.login(IG_USERNAME, IG_PASSWORD);
    await client.simulate.postLoginFlow();
    const feeds = await client.feed.user(user.pk);

    let numberOfPost = gallery.post_count;
    const posts = [];
    do {
        const items = await feeds.items();
        posts.push(...items.
            filter(item => item.image_versions2).
            filter(item => gallery.keywords.some(x => item.caption.text.includes(x))).
            map(item => {
                numberOfPost--;

                return {
                    url: `https://instagram.com/p/${item.code}`,
                    timestamp: item.taken_at,
                    image: item.image_versions2.candidates,
                    caption: item.caption.text,
                }
            })
        )
    } while (numberOfPost > 0);

    const boyAccount = await client.user.usernameinfo(boy.instagram_name)
    const boyImage = boyAccount.profile_pic_url;

    const girlAccount = await client.user.usernameinfo(girl.instagram_name);
    const girlImage = girlAccount.profile_pic_url;

    await request(
        "PATCH", `https://api.github.com/gists/${gist_id}`,
        {
            files: {
                ["oskayuzy.json"]: {
                    content: JSON.stringify({
                        boy_profile: boyImage,
                        girl_profile: girlImage,
                        posts: posts.filter(x => x),
                    })
                },
            }
        }
    );
}

(async () => {
    await main();
})();