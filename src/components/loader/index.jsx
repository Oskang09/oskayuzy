import './index.css'
import React from 'react';

function Loader() {
    return (
        <div className="lds-heart"><div></div></div>
    )
}

export function renderLoadable(isLoading, render) {
    if (isLoading) {
        return Loader();
    }

    if (typeof render === 'function') {
        return render();
    }
    return render;
}

export default Loader