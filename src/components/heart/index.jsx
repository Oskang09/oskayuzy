import './index.css';

import React from 'react';
import Love from '#/assets/images/love.png';
import { start_date } from '#/assets/setting.json';

const Container = {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
}

function Heart() {
    const date = new Date(start_date + "T00:00:00.000Z");
    const diff = Date.now() - date;
    const days = parseInt(diff / (24 * 3600 * 1000));
    return (
        <div style={Container}>
            <img width={256} height={181} className="heartbeat" src={Love} />
            <div className="heartbeat-text">{days + 1}<br />Days</div>
        </div>
    );
}

export default Heart;