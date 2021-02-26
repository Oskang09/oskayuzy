import './index.css';

import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import Slide from './slide';

function Activity({ posts }) {
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

Activity.propTypes = {
    posts: PropTypes.array,
}

export default Activity;