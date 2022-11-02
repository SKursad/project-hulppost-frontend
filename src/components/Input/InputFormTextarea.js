import React from 'react';

const RequestFormTitle = ({ label, nameRequest, nameReply, id, className, name, value,  placeholder, onChange, autoFocus }) => {
    return (
        <div>
            <label htmlFor={label}>
                <span>{nameRequest}</span>
                <span>{nameReply}</span>
            </label>
            <textarea
                id={id}
                className={className}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                autoFocus={autoFocus}
                required
            />
        </div>
    );
};

export default RequestFormTitle;