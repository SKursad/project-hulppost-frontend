import React from "react";
import './Input.css'


const Input = ({label, name,placeholder, error, nameRegister, onChange, type, alt, id, value, autoFocus,autoComplete, required}) => {
    const className = error ? "form-control__is-invalid" : "form-control";
    return (
        // <>
        <div className="form-control">
            <label htmlFor={label}>
                <span>{nameRegister}</span>
            </label>
            <input
                name={name}
                placeholder={placeholder}
                className={className}
                onChange={onChange}
                type={type}
                alt={alt}
                id={id}
                autoFocus={autoFocus}
                value={value}
                autoComplete={autoComplete}
                required={required}/>
            <small className="form-control__is-invalid">{error}</small>
        </div>
    // </>
    );
};

export default Input;
