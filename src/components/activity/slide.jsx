import React, { useEffect, useState } from 'react';

export default function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const [image, setImage] = useState('');
    useEffect(() => {
        fetch(slide.image).then(res => res.text()).then(setImage)
    }, [])
    return (
        <div
            className="slide"
            data-active={active}
            style={{
                "--offset": offset,
                "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
                "position": "relative",
            }}
        >
            <div
                className="slideBackground"
                style={{
                    backgroundImage: `url("${image}")`,
                    position: 'absolute'
                }}
            />
            <div
                className="slideContent"
                onClick={() => window.open(slide.url)}
                style={{
                    backgroundImage: `url("${image}")`,
                    backgroundSize: 'contain',
                }}
            >
                <div className="slideContentTop">
                    {new Date(slide.timestamp * 1000).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="slideContentBottom">
                    {slide.caption}
                </div>
            </div>
        </div>
    );
}