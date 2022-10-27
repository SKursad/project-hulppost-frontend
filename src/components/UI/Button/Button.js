import React from 'react';
import './Button.css'


const Button = (props) => {

    return <button
        title={props.title}
        className={props.className || "button"}
        type={props.type || "button"}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
    </button>;
};

export default Button;