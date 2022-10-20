import React from 'react';
import './Card.css';

const Card = ({className, wide, children}) => {
    return <div className={`card` || className + (wide ? "" : "container--narrow")}>{children}</div>;
};

export default Card;
