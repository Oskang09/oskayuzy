import './index.css';

import React, { useEffect } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';


function Slideshow(props) {

    useEffect(() => {
        $("#slideshow > div:gt(0)").hide();
        setInterval(function () {
            $('#slideshow > div:first')
                .fadeOut(props.fadeInterval)
                .next()
                .fadeIn(props.fadeInterval)
                .end()
                .appendTo('#slideshow');
        }, props.interval);

    }, []);

    return (
        <div id="slideshow" style={props.style}>
            {props.images.map((x, i) => (
                <div key={i}>
                    <img src={x} />
                </div>
            ))}
        </div>
    );
}

Slideshow.propTypes = {
    interval: PropTypes.number,
    fadeInterval: PropTypes.number,
    images: PropTypes.array,
};

export default Slideshow;