import './app.css';

import React, { useEffect, useState } from 'react';

import Heart from '#/components/heart';
import LoveEffect from '#/components/love-effect';
import Psyduck from '#/components/psyduck';
import Slideshow from '#/components/slideshow';
import Lion from '#/components/lion';
import Carousel from '#/components/carousel';
import Activity from '#/components/activity';
import { renderLoadable } from '#/components/loader';

import OskaBackground from '#/assets/images/oska-bg.jpg';
import YuzyBackground from '#/assets/images/yuzy-bg.jpg';

import InstagramAPI from '#/api/instagram';

const RootContainer = {
    position: 'relative',
    margin: 0,
    border: 'none',
};

const BackgroundBanner = {
    opacity: 0.3,
    position: 'absolute',
    top: 0, left: 0,
    zIndex: -998,
    height: '100%',
    width: '100%',
};

const TogetherContainer = {
    textAlign: 'center',
    position: 'relative',
};

const PsyduckDescription = {
    margin: 20,
    marginLeft: 30,
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}

const LionDescription = {
    margin: 20,
    marginLeft: 30,
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}

const Avatar = {
    borderRadius: '50%',
    width: 192, height: 192
};

const LoveText = {
    fontSize: 20,
    color: 'black',
};

function Application() {

    const [boyProfile, setBoyProfile] = useState(null);
    const [girlProfile, setGirlProfile] = useState(null);
    const [data, setData] = useState([]);

    const loadFromGist = async function load() {
        const { boy_profile, girl_profile, posts } = await InstagramAPI.getInstagramInfo();
        setBoyProfile(boy_profile);
        setGirlProfile(girl_profile);
        setData(posts);
    };

    useEffect(loadFromGist, []);

    return (
        <div style={RootContainer}>
            <div id="header-bar">
                <h1 id="header-boy">&#x1f466;</h1>
                <h1>OskaYuzy</h1>
                <h1 id="header-girl">&#x1f467;</h1>
            </div>

            <div style={TogetherContainer}>
                <LoveEffect />
                <img style={BackgroundBanner} src={OskaBackground} />
                <div id="love-container">
                    <div style={{ flex: 1 }}>
                        {renderLoadable(!boyProfile, <img style={Avatar} src={boyProfile} />)}
                    </div>
                    <div style={{ paddingTop: 15, paddingBottom: 15, flex: 2 }}>
                        <div style={LoveText} className="column">
                            We have been together
                        </div>
                        <Heart />
                        <div style={LoveText} className="column">
                            Have a better tomorrow
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        {renderLoadable(!girlProfile, <img style={Avatar} src={girlProfile} />)}
                    </div>
                </div>
            </div>

            <Carousel
                images={[OskaBackground, YuzyBackground]}
                legends={[
                    "Oska & Yuzy",
                    "Duck Ducks"
                ]}
            />

            <div id="psyduck-container">
                <div style={PsyduckDescription}>
                    <h1>HeaderHeader</h1>
                    <p>some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description</p>
                    <Slideshow
                        interval={3000}
                        fadeInterval={1000}
                        images={[OskaBackground, YuzyBackground]}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Psyduck />
                </div>
            </div>

            <div id="lion-container">
                <div style={{ flex: 1 }}>
                    <Lion className="column" />
                </div>
                <div style={LionDescription}>
                    <h1>HeaderHeader</h1>
                    <p>some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description</p>
                    <Slideshow
                        interval={3000}
                        fadeInterval={1000}
                        images={[OskaBackground, YuzyBackground]}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', paddingTop: 100, paddingBottom: 160 }}>
                {
                    renderLoadable(
                        !data || data.length === 0,
                        <Activity posts={data} />,
                    )
                }
            </div>
        </div >
    );
}

export default Application;