import React from "react";
import './Input.css'


const Input = ({label, name,placeholder, error, nameRegister, onChange, type, alt, id, value, autoFocus,autoComplete}) => {
    // const className = error ? "is-invalid" : "form-control";
    return (
        // <>
        <div className="form-control">

            <label htmlFor={label}>
                <span>{nameRegister}</span>
            </label>
            <input
                name={name}
                placeholder={placeholder}
                className="form-control__input"
                onChange={onChange}
                type={type}
                alt={alt}
                id={id}
                autoFocus={autoFocus}
                value={value}
                autoComplete={autoComplete}/>
            <small className="is-invalid">{error}</small>
        </div>
    // </>
    );
};

export default Input;
