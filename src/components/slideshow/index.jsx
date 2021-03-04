import './index.css';

import React, { useEffect } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

function Slideshow(props) {

    useEffect(() => {
        $(`#slideshow-${props.id} > div:gt(0)`).hide();
        setInterval(function () {
            $(`#slideshow-${props.id} > div:first`)
                .fadeOut(props.fadeInterval)
                .next()
                .fadeIn(props.fadeInterval)
                .end()
                .appendTo(`#slideshow-${props.id}`);
        }, props.interval);

    }, []);

    return (
        <div id={`slideshow-${props.id}`} style={props.style}>
            {props.images.map((x, i) => (
                <div key={i}>
                    <img src={x} />
                </div>
            ))}
        </div>
    );
}

Slideshow.propTypes = {
    id: PropTypes.string,
    interval: PropTypes.number,
    fadeInterval: PropTypes.number,
    images: PropTypes.array,
};

export default Slideshow;