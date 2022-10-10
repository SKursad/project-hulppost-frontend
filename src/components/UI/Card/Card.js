import React from 'react';
import classes from './Card.module.css';

const Card = ({className, wide, children}) => {
    // const classes = 'UI' + props.className;
    return <div className={`${classes.card} ${className}` + (wide ? "" : "container--narrow")}>{children}</div>;
};

export default Card;
