import React from 'react';


const RequestFormTitle = ({ label, value, onChange, nameRequest, nameReply,id, name, placeholder}) => {
    return (
        <div>
            <label htmlFor={label}>
                <span>{nameRequest}</span>
                <span>{nameReply}</span>
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default RequestFormTitle;