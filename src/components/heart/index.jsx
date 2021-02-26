import './index.css';

import React from 'react';
import Love from '#/assets/images/love.png';

const Container = {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
}

const Text = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 22
};

function Heart() {
    return (
        <div style={Container}>
            <img width={256} height={181} className="heartbeat" src={Love} />
            <div style={Text}>3000 Days</div>
        </div>
    );
}

export default Heart;