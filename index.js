const http = require('https');
const { dig } = require('digdata');
const { create } = require('apisauce');
const qs = require('query-string');
const { GH_TOKEN } = process.env;
const { boy, girl, gallery, gist_id } = require('./src/assets/setting.json');
const client = create({
    headers: {
        'Authorization': `token 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`,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)',
    }
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
    const boyResponse = await request("GET", `https://i.instagram.com/api/v1/users/${boy.instagram_id}/info/`);
    const boyProfile = dig(boyResponse, `user.profile_pic_url`);
    const boyImage = await toDataURL(boyProfile);
    console.log("BoyResponse: " + JSON.stringify(boyResponse));

    const girlResponse = await request("GET", `https://i.instagram.com/api/v1/users/${girl.instagram_id}/info/`);
    const girlProfile = dig(girlResponse, `user.profile_pic_url`);
    const girlImage = await toDataURL(girlProfile);
    console.log("GirlResponse: " + JSON.stringify(girlResponse));

    let nextCursor = undefined;
    let hasNext = false;
    let numberOfPost = gallery.post_count;
    const posts = [];
    const images = [];
    do {
        const data = await request("GET", "https://www.instagram.com/graphql/query", {
            first: 12,
            query_id: 17888483320059182,
            id: gallery.instagram_id,
            after: nextCursor,
        });
        console.log("ImageList: " + JSON.stringify(data));

        nextCursor = dig(data, 'data.user.edge_owner_to_timeline_media.page_info.end_cursor');
        hasNext = dig(data, 'data.user.edge_owner_to_timeline_media.page_info.has_next_page');

        const media = dig(data, 'data.user.edge_owner_to_timeline_media.edges.*.node');
        posts.push(
            ...await Promise.all(media.map(post => {
                if (numberOfPost <= 0) {
                    return undefined;
                }

                const caption = dig(post, "edge_media_to_caption.edges.0.node.text");
                const isCaptionHit = gallery.keywords.some(x => caption.includes(x));
                if (isCaptionHit) {
                    numberOfPost--;

                    return new Promise(async (resolve) => {
                        const imageData = await toDataURL(post.display_url)
                        const index = images.length;
                        images.push(imageData);
                        resolve({
                            url: `https://instagram.com/p/${post.shortcode}`,
                            timestamp: post.taken_at_timestamp,
                            image: `https://gist.githubusercontent.com/Oskang09/${gist_id}/raw/image-${index}.jpeg`,
                            caption: caption,
                        })
                    })
                }
                return Promise.resolve(undefined);
            }))
        );
    } while (hasNext && numberOfPost > 0);

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
                    content: boyImage,
                    type: 'image/jpeg'
                },
                'girl.jpeg': {
                    content: girlImage,
                    type: 'image/jpeg'
                },
                ["oskayuzy.json"]: {
                    content: JSON.stringify({
                        boy_profile: `https://gist.githubusercontent.com/Oskang09/${gist_id}/raw/boy.jpeg`,
                        girl_profile: `https://gist.githubusercontent.com/Oskang09/${gist_id}/raw/girl.jpeg`,
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