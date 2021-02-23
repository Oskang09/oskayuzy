import './index.css';

import React from 'react';

function Psyduck() {
    return (
        <div className="psy-container">
            <div className="psy">
                <div className="psy-head">
                    <div className="psy-face">
                        <div className="psy-eye-wrap">
                            <div className="psy-eye psy-eye-left"></div>
                        </div>
                        <div className="psy-eye-wrap">
                            <div className="psy-eye psy-eye-right"></div>
                        </div>
                        <div className="psy-blush psy-blush-left"></div>
                        <div className="psy-blush psy-blush-right"></div>
                    </div>
                    <div className="psy-beak">
                        <div className="psy-beak-nose"></div>
                    </div>
                    <div className="psy-hair"></div>
                </div>
                <div className="psy-body">
                    <div className="psy-arm psy-arm-left">
                        <div className="psy-arm-claw"></div>
                    </div>
                    <div className="psy-arm psy-arm-right">
                        <div className="psy-arm-claw"></div>
                    </div>
                    <div className="psy-tube psy-tube-front"></div>
                    <div className="psy-tube psy-tube-back"></div>
                    <div className="psy-torso"></div>
                    <div className="psy-foot psy-foot-left">
                        <div className="psy-foot-web"></div>
                    </div>
                    <div className="psy-foot psy-foot-right">
                        <div className="psy-foot-web"></div>
                    </div>
                    <div className="water-magic"></div>
                    <div className="water-ripple water-ripple-highlight"></div>
                    <div className="water-ripple water-ripple-shadow"></div>
                </div>
                <div className="psy-thoughts psy-thoughts-1">
                    <span className="psy-thoughts-symbol">?</span>
                </div>
                <div className="psy-thoughts psy-thoughts-2">
                    <span className="psy-thoughts-symbol">?</span>
                </div>
            </div>
        </div>
    );
}

export default Psyduck;