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

import LoveBackground from '#/assets/images/love-bg.jpg';

import SlideOne from '#/assets/images/couple/1.jpg';
import SlideTwo from '#/assets/images/couple/2.jpg';
import SlideThree from '#/assets/images/couple/3.jpg';
import SlideFour from '#/assets/images/couple/4.jpg';
import SlideFive from '#/assets/images/couple/5.jpg';
import SlideSix from '#/assets/images/couple/6.jpg';

import DuckOne from '#/assets/images/ducks/1.jpg';
import DuckTwo from '#/assets/images/ducks/2.jpg';
import DuckThree from '#/assets/images/ducks/3.jpg';
import DuckFour from '#/assets/images/ducks/4.jpg';
import DuckFive from '#/assets/images/ducks/5.jpg';

import LionOne from '#/assets/images/lions/1.jpg';
import LionTwo from '#/assets/images/lions/2.jpg';
import LionThree from '#/assets/images/lions/3.jpg';
import LionFour from '#/assets/images/lions/4.jpg';
import LionFive from '#/assets/images/lions/5.jpg';

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
                <img style={BackgroundBanner} src={LoveBackground} />
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
                images={[
                    SlideOne,
                    SlideTwo,
                    SlideThree,
                    SlideFour,
                    SlideFive,
                    SlideSix,
                ]}
                legends={[
                    "Happy CNY",
                    "Kukup Trip",
                    "Dating Day",
                    "Zenplus Day",
                    "Yuzy's KL Trip",
                    "Melaka Home Capture"
                ]}
            />

            <div id="psyduck-container">
                <div style={PsyduckDescription}>
                    <h1>&#x1F986; Psyduck ( 鸭鸭 )</h1>
                    <p>
                        First present between us is a medium sized psyduck. At that moment girl is feel ugly about this duck and don't know what this belongs to.
                        But as time passes, she like more the duck and now ducky family have become bigger around 5-6 duck and at all size.
                        They have been together in our memories and our love journey.
                    </p>
                    <Slideshow
                        id="duck"
                        interval={3000}
                        fadeInterval={1000}
                        images={[DuckOne, DuckTwo, DuckThree, DuckFour, DuckFive]}
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
                    <h1>&#x1F981; Lion ( 狮狮 )</h1>
                    <p>
                        Lion is her love dearly doll since it have been grow together with her from she's in kindergarten so there's many memory between she and it.
                        After that lion having more friends ( duck duck ) and also it will together with us but due to it limited edition so we only having one and not more.
                        But it will always be our side since it small and easy to bring out compare to duck duck.
                        It also appearing at our memories and our love journey along the way.
                    </p>
                    <Slideshow
                        id="lion"
                        interval={3000}
                        fadeInterval={1000}
                        images={[LionOne, LionTwo, LionThree, LionFour, LionFive]}
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