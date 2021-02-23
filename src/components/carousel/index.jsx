import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function OCarousel(props) {
    const [current, setCurrent] = useState("0");
    return (
        <Carousel
            selectedItem={current}
            onChange={setCurrent}
            autoPlay={true}
            swipeable={true}
            stopOnHover={true}
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            showThumbs={false}
            useKeyboardArrows={true}
            emulateTouch={true}
            dynamicHeight={false}
        >
            {props.images.map((img, index) => (
                <div key={index} style={{ height: '100vh' }}>
                    <img style={{ height: '100%' }} src={img} />
                    <p className="legend">{props.legends[index]}</p>
                </div>
            ))}
        </Carousel>
    )
}

OCarousel.propTypes = {
    legends: PropTypes.array,
    images: PropTypes.array,
}

export default OCarousel;