import './index.css';

import React, { useRef, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import WishAPI from '#/api/instagram';


function WishCard({ id, imageTitle, title, content, image, date, cardColor }) {
    return (
        <article className="card" key={id} style={{ boxShadow: `10px 5px 40px 20px ${cardColor}` }}>
            <header
                className="card-header"
                style={{ backgroundImage: `url(${image})` }}
            >
                <h4 className="card-header--title">{imageTitle}</h4>
            </header>
            <div className="card-body">
                <p className="date">{new Date(date).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <h2>{title}</h2>
                <p className="body-content">{content}</p>
            </div>
        </article>
    );
}

function WishList() {
    const data = [
        { id: 1, title: "Title here", content: "Content information", background: "#000", cardColor: "#fff" },
        { id: 2, title: "Title here", content: "Content information", background: "#fff", cardColor: "#000" },
    ];
    const [selected, setSelected] = useState("1");
    return (
        <div style={{ backgroundColor: data.find(x => x.id == selected).background }}>
            <ScrollMenu
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

export { WishCard };
export default WishList;