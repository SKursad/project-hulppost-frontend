import React from 'react';
import './FlashMessages.css';

const FlashMessages = (props) => {
    return (
        <div className="floating-alerts">
            {props.messages.map((msg, index) => {
                return (
                    <div key={index} className="alert alert-succes text-center floating-alert">
                        {msg}
                    </div>
                );
            })}
        </div>
    );
};

export default FlashMessages;