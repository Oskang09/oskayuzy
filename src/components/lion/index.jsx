import './index.css';

import React from 'react';

function Lion() {
    return (
        <div className="lion">
            <span className="mane">
                <span className="head">
                    <span className="eye left"></span>
                    <span className="eye right"></span>
                    <span className="nose"></span>
                </span>
                <span className="ear left">
                    <span className="inner"></span>
                </span>
                <span className="ear right">
                    <span className="inner"></span>
                </span>
            </span>
            <span className="body">
                <span className="paw left"></span>
                <span className="paw right"></span>
                <span className="leg left"></span>
                <span className="leg right"></span>
            </span>
        </div>
    );
}

export default Lion;