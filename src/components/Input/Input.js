import React from "react";
import './Input.css';


const Input = ({
                   label,
                   name,
                   accept,
                   placeholder,
                   error,
                   nameRegister,
                   nameLogin,
                   onChange,
                   type,
                   alt,
                   id,
                   value,
                   autoFocus,
                   autoComplete,
                   onBlur,
                   required
               }) => {
    const className = error ? "form-control__is-invalid" : "form-control";
    return (
        // <>
        <div className="form-control">
            <label htmlFor={label}>
                <span>{nameRegister}</span>
                <span>{nameLogin}</span>
            </label>
            <input
                name={name}
                accept={accept}
                placeholder={placeholder}
                className={className}
                onChange={onChange}
                type={type}
                alt={alt}
                id={id}
                autoFocus={autoFocus}
                value={value}
                autoComplete={autoComplete}
                onBlur={onBlur}
                required={required}/>
            <small className="form-control__is-invalid">{error}</small>
        </div>
        // </>
    );
};

export default Input;
