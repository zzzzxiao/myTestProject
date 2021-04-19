import React from 'react';
import './carousel.scss';
export const Carousel = function ({ data, width = 508, currentIndex, onClick }) {
    const len = data.length;
    return <div className="carouselSlider">
        <div
            className="carouselList"
            style={{
                width: `${len * width}px`,
                opacity: 1,
                transform: `translateX(${-currentIndex * width}px)`
            }}>
            {data.map((item, i) => <div key={`item${i}`} className="carouselItem" style={{ width: `${width}px` }}>
                {item}
            </div>)}
        </div>
        <ul className="carouselButton">
            {data.map((item, i) => <li key={`item${i}`}><button className={currentIndex === i ? 'active' : ''} onClick={onClick(i)}>{i + 1}</button></li>)}
        </ul>
    </div>;
};