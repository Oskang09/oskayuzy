# oskayuzy

personal couple site just to record down the thing between us

# Development

With github actions, every night will run a script to get data from instagram, and pump into `gist`. You can see the script at `index.js` and `action.yml` for workflow setting. For frontend it's using `react` & `vitejs` to do development.

# Build

For github actions script have to build with `@vercel/ncc` before push, frontend also have to build before push. Since my github pages is set to `master` branch so it take from `docs/` folder in `master` branch. In `public/` folder having `CNAME` it's for custom domain setting ifn't the original setting will be overrided.

# Reference

| Component        | Source                                                                |
| ---------------- | --------------------------------------------------------------------- |
| Psyduck          | https://codepen.io/tiffachoo/pen/abdLKaP                              |
| Lion             | https://codepen.io/thepandalion/pen/gjske                             |
| Love Effect      | https://codepen.io/vivinantony/pen/gbENBB                             |
| Instagram Images | https://reactjsexample.com/3d-cover-flow-in-react/                    |
| Carousel         | react-responsive-carousel                                             |
| Slideshow        | https://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/ |
| Heartbeat        | https://codepen.io/fivera/pen/rzepn                                   |
| Loader           | https://loading.io/css/                                               |

# Make your own

If you want to make your own u can clone this repository, and go to `assets/setting/setting.json` update your information like instagram_id, instagram_name. Once you updated, you can run `yarn script` to push data to your `gist`.