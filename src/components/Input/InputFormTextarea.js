import React from 'react';

const RequestFormTitle = ({
  label,
  name,
  id,
  className,
  value,
  placeholder,
  onChange,
  autoFocus
}) => {
  const displayText = name === 'nameRequest' ? 'Request' : 'Reply';

  return (
    <div>
      <label htmlFor={id}>
        <span>{displayText}</span>
      </label>
      <textarea
        id={id}
        className={className}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={autoFocus}
        // required
      />
    </div>
  );
};

export default RequestFormTitle;
