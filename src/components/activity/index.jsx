import './index.css';

import React, { useEffect, useReducer } from 'react';

import { posts } from '#/assets/local.json';
import Slide from './slide';
// import InstagramAPI from '#/api/instagram';

const initialState = {
    slideIndex: 0
};

const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
        return {
            ...state,
            slideIndex: (state.slideIndex + 1) % posts.length
        };
    }
    if (event.type === "PREV") {
        return {
            ...state,
            slideIndex:
                state.slideIndex === 0 ? posts.length - 1 : state.slideIndex - 1
        };
    }
};


function Activity() {
    const [state, dispatch] = useReducer(slidesReducer, initialState);

    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'PREV' }), 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slides">
            <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

            {[...posts, ...posts, ...posts].map((slide, i) => {
                let offset = posts.length + (state.slideIndex - i);
                return <Slide slide={slide} offset={offset} key={i} />;
            })}
            <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
        </div>
    );
}

export default Activity;