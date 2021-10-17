const { IgApiClient } = require('instagram-private-api');
const { create } = require('apisauce');
const http = require('https');
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


const toDataURL = async (originalURL) => {
    return new Promise((resolve) => {
        http.get(originalURL, function (response) {
            response.setEncoding('base64');
            let body = "data:" + response.headers["content-type"] + ";base64,";
            response.on('data', (data) => { body += data });
            response.on('end', () => resolve(body));
        })
    })
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
    const images = [];
    do {
        const items = await feeds.items();
        posts.push(...items.
            filter(item => item.image_versions2).
            filter(item => gallery.keywords.some(x => item.caption.text.includes(x))).
            map(item => {
                numberOfPost--;

                return new Promise(async (resolve) => {
                    const image = await toDataURL(item.image_versions2.candidates[0].url);
                    const index = images.length;
                    images.push(image);
                    resolve({
                        url: `https://instagram.com/p/${item.code}`,
                        timestamp: item.taken_at,
                        image: `https://gist.githubusercontent.com/Oskang09/${gist_id}/raw/image-${index}.jpeg`,
                        caption: item.caption.text,
                    })

                });
            })
        )
    } while (numberOfPost > 0);

    const boyAccount = await client.user.usernameinfo(boy.instagram_name)
    const boyImage = boyAccount.profile_pic_url;

    const girlAccount = await client.user.usernameinfo(girl.instagram_name);
    const girlImage = girlAccount.profile_pic_url;

    const objects = {};
    for (i = 0; i < images.length; i++) {
        objects['image-' + i + ".jpeg"] = {
            content: images[i],
            type: 'image/jpeg',
        };
    }

    await request(
        "PATCH", `https://api.github.com/gists/${gist_id}`,
        {
            files: {
                ...objects,
                'boy.jpeg': {
                    content: await toDataURL(boyImage),
                    type: 'image/jpeg',
                },
                'girl.jpeg': {
                    content: await toDataURL(girlImage),
                    type: 'image/jpeg',
                },
                ["oskayuzy.json"]: {
                    content: JSON.stringify({
                        boy_profile: `https://gist.githubusercontent.com/Oskang09/${gist_id}/raw/boy.jpeg`,
                        girl_profile: `https://gist.githubusercontent.com/Oskang09/${gist_id}/raw/girl.jpeg`,
                        posts: await Promise.all(posts),
                    })
                },
            }
        }
    );
}

(async () => {
    await main();
})();