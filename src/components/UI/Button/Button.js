import React from 'react';


const Button = (props) => {

    return <button
        className={props.className || "button"}
        type={props.type || "button"}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
    </button>;
};

export default Button;