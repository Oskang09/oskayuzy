import React, { useState } from 'react';
import Uploader from 'rc-upload';

import Heart from '#/components/heart';
import LoveEffect from '#/components/love-effect';
import OskaBackground from '#/assets/oska-bg.jpg';
import YuzyBackground from '#/assets/yuzy-bg.jpg';
import Psyduck from './components/psyduck';
import Slideshow from './components/slideshow';
import Lion from './components/lion';
import Carousel from './components/carousel';
import WishList, { WishCard } from './components/wish-list';
import ColorPicker from './components/color-picker';

const RootContainer = {
    position: 'relative',
    margin: 0,
    border: 'none',
};

const HeaderBar = {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#FBBBC1",
    padding: "0px 30px 0px 50px",
    height: "60px"
};

const BackgroundBanner = {
    opacity: 0.3,
    position: 'absolute',
    top: 0, left: 0,
    zIndex: -998,
    height: '100%',
    width: '100%',
};

const BackgroundContainer = {
    alignItems: 'center',
    padding: 20,
    height: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'row',
};

const TogetherContainer = {
    textAlign: 'center',
    position: 'relative',
};

const PsyduckContainer = {
    display: 'flex',
    height: 500,
    backgroundColor: '#a4ceff',
};

const PsyduckDescription = {
    margin: 20,
    marginLeft: 30,
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}

const LionContainer = {
    display: 'flex',
    height: 500,
    backgroundColor: '#DECC9C',
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

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function Application() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState();
    const [cardColor, setCardColor] = useState('#000');
    const [background, setBackground] = useState('#FFF');
    const [imageTitle, setImageTitle] = useState('');
    return (
        <div style={RootContainer}>

            <div style={HeaderBar}>
                <h1 style={{ fontSize: 24 }}>&#x1f466;</h1>
                <h1 style={{ fontSize: 24 }}>OskaYuzy</h1>
                <h1 style={{ fontSize: 24 }}>&#x1f467;</h1>
            </div>

            <div style={TogetherContainer}>
                <LoveEffect />
                <img style={BackgroundBanner} src={OskaBackground} />
                <div style={BackgroundContainer}>
                    <div style={{ flex: 1 }}>
                        <img style={Avatar} src={YuzyBackground} />
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
                        <img style={Avatar} src={YuzyBackground} />
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

            <div style={PsyduckContainer}>
                <div style={PsyduckDescription}>
                    <h1>HeaderHeaderHeaderHeader</h1>
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

            <div style={LionContainer}>
                <div style={{ flex: 1 }}>
                    <Lion className="column" />
                </div>
                <div style={LionDescription}>
                    <h1>HeaderHeaderHeaderHeader</h1>
                    <p>some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description</p>
                    <Slideshow
                        interval={3000}
                        fadeInterval={1000}
                        images={[OskaBackground, YuzyBackground]}
                    />
                </div>
            </div>

            <WishList />

            <div style={{ display: 'flex', margin: '20px 0px' }}>
                <div style={{ backgroundColor: background, margin: '0px 50px', padding: "0px 50px" }}>
                    <WishCard
                        id={"submit"}
                        imageTitle={imageTitle}
                        title={title}
                        content={content}
                        cardColor={cardColor}
                        image={file}
                        date={new Date()}
                    />
                </div>
                <div >
                    <form className="pure-form pure-form-aligned">
                        <fieldset>
                            <legend>Submit your wish now!</legend>

                            <div className="pure-control-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    placeholder="Title ..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value.replace(/[\r\n\v]+/g, ""))}
                                    placeholder="Wish Content ..."
                                />
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="background">Background</label>
                                <ColorPicker
                                    value={background}
                                    onChange={setBackground}
                                />
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="content">Card</label>
                                <ColorPicker
                                    value={cardColor}
                                    onChange={setCardColor}
                                />
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="content">Image</label>
                                <Uploader
                                    accept="image/png, image/jpg, image/jpeg"
                                    beforeUpload={async (file) => {
                                        if (["image/png", "image/jpg", "image/jpeg"].indexOf(file.type) === -1) {
                                            return false;
                                        }

                                        if (file.size / 1024 / 1024 >= 1) {
                                            return false;
                                        }
                                        setFile(await toBase64(file));
                                        return false;
                                    }}
                                >
                                    <div className="pure-button pure-button-primary">
                                        Upload
                                    </div>
                                </Uploader>
                            </div>

                            <div className="pure-control-group">
                                <label htmlFor="content">Image Title</label>
                                <input
                                    type="text"
                                    value={imageTitle}
                                    placeholder="Image Title ..."
                                    onChange={(e) => setImageTitle(e.target.value)}
                                />
                            </div>

                            <div className="pure-controls">
                                <div className="pure-button pure-button-primary">
                                    Submit
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default Application;