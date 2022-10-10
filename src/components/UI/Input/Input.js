import React from "react";
import classes from './Input.module.css';


const Input = ({label, placeholder, error, name, onChange, type, alt, id, value, ref}) => {
    const className = error ? "form-control is-invalid" : "form-control";
    return (
        <div className={classes['form-group']}>
            <label htmlFor={label}>
            <span>{name}</span>
            </label>
            <input
                placeholder={placeholder}
                className={className}
                onChange={onChange}
                ref={ref}
                type={type}
                alt={alt}
                id={id}
                value={value}/>
            <small className={classes.alert}>{error}</small>
        </div>
    );
};

export default Input;
