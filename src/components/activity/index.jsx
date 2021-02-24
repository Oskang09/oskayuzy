import './index.css';

import React, { useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
// import InstagramAPI from '#/api/instagram';

function WishCard({ id }) {
    return (
        <article className="card" key={id} style={{ boxShadow: `10px 5px 40px 20px #000` }}>
            <header
                className="card-header"
                style={{ backgroundImage: `url('')` }}
            >
                <h4 className="card-header--title">AS</h4>
            </header>
            <div className="card-body">
                <p className="date">{new Date().toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <h2>ASD</h2>
                <p className="body-content">ASD</p>
            </div>
        </article>
    );
}

function Activity() {
    let Component = ScrollMenu;
    if (import.meta.env.PROD) {
        Component = ScrollMenu.default;
    }

    const data = [
        { id: 1, title: "Title here", content: "Content information", background: "#000", cardColor: "#fff" },
        { id: 2, title: "Title here", content: "Content information", background: "#fff", cardColor: "#000" },
    ];
    const [selected, setSelected] = useState("1");
    return (
        <div style={{ backgroundColor: data.find(x => x.id == selected).background }}>
            <Component
                scrollToSelected={true}
                wrapperStyle={{ margin: 10 }}
                itemStyle={{ marginRight: 150 }}
                data={data.map(WishCard)}
                selected={selected}
                onSelect={setSelected}
                dragging={true}
                wheel={true}
                onLastItemVisible={() => {
                    // console.log("visible");
                }}
            />
        </div>
    )
}

export default Activity;