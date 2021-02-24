const { dig } = require('digdata');
const { create } = require('apisauce');
const qs = require('query-string');

const { GIST_ID, GH_TOKEN } = process.env;
const client = create({
    headers: {
        'Authorization': `token ${GH_TOKEN}`,
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
        throw new Error(response.data);
    }
    return response.data;
}

async function main() {
    const oskaResponse = await request("GET", "https://www.instagram.com/iregalia_0714/?__a=1");
    const oskaProfile = dig(oskaResponse, 'graphql.user.profile_pic_url_hd');

    const yuzyResponse = await request("GET", "https://www.instagram.com/yuzy_lam/?__a=1");
    const yuzyProfile = dig(yuzyResponse, 'graphql.user.profile_pic_url_hd');

    let nextCursor = undefined;
    let hasNext = false;
    let numberOfPost = 13;
    const posts = [];
    do {
        const data = await request("GET", "https://www.instagram.com/graphql/query", {
            first: 12,
            query_id: 17888483320059182,
            id: 2217696854,
            after: nextCursor,
        });

        nextCursor = dig(data, 'data.user.edge_owner_to_timeline_media.page_info.end_cursor');
        hasNext = dig(data, 'data.user.edge_owner_to_timeline_media.page_info.has_next_page');

        const media = dig(data, 'data.user.edge_owner_to_timeline_media.edges.*.node');
        posts.push(...media.map(post => {
            if (numberOfPost <= 0) {
                return undefined;
            }

            const caption = dig(post, "edge_media_to_caption.edges.0.node.text");
            if (caption.includes("#fcse") || caption.includes("#oskayuzy")) {
                numberOfPost--;
                return {
                    url: `https://instagram.com/p/${post.shortcode}`,
                    timestamp: post.taken_at_timestamp,
                    image: post.display_url,
                    caption: caption,
                }
            }
            return undefined;
        }));
    } while (hasNext && numberOfPost > 0);

    await request(
        "PATCH", `https://api.github.com/gists/${GIST_ID}`,
        {
            files: {
                oskayuzy: {
                    content: JSON.stringify({
                        oska_profile: oskaProfile,
                        yuzy_profile: yuzyProfile,
                        posts: posts.filter(x => x),
                    })
                }
            }
        }
    );
}

(async () => {
    await main();
})();