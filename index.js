const { dig } = require('digdata');
const { create } = require('apisauce');
const qs = require('query-string');
const { GH_TOKEN } = process.env;
const { boy, girl, gallery, gist_id } = require('./src/assets/setting.json');
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
        console.log(clientError, response.data)
        throw new Error(response.data);
    }
    return response.data;
}

async function main() {
    const boyResponse = await request("GET", `https://www.instagram.com/web/search/topsearch/?context=user&query=${boy.instagram_name}&rank_token=0.7810395624&include_reel=true`);
    const boyProfile = dig(boyResponse, `users.*.user.pk=${boy.instagram_id}.profile_pic_url`);

    const girlResponse = await request("GET", `https://www.instagram.com/web/search/topsearch/?context=user&query=${girl.instagram_name}&rank_token=0.7810395624&include_reel=true`);
    const girlProfile = dig(girlResponse, `users.*.user.pk=${girl.instagram_id}.profile_pic_url`);

    let nextCursor = undefined;
    let hasNext = false;
    let numberOfPost = gallery.post_count;
    const posts = [];
    do {
        const data = await request("GET", "https://www.instagram.com/graphql/query", {
            first: 12,
            query_id: 17888483320059182,
            id: gallery.instagram_id,
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
            const isCaptionHit = gallery.keywords.some(x => caption.includes(x));
            if (isCaptionHit) {
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
        "PATCH", `https://api.github.com/gists/${gist_id}`,
        {
            files: {
                ["oskayuzy.json"]: {
                    content: JSON.stringify({
                        boy_profile: boyProfile,
                        girl_profile: girlProfile,
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