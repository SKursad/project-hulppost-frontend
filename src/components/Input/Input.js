import React from "react";


const Input = ({label, name, placeholder, error, nameRegister, onChange, type, alt, id, value}) => {
    const className = error ? "is-invalid" : "form-control";
    return (
        <div className='form-control'>
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
                value={value}/>
            <small className="is-invalid">{error}</small>
        </div>
    );
};

export default Input;
