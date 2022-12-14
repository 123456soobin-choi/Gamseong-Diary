import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  input {
    width: 100%;
    height: 40px;
    border: 2px solid #c4c4c4;
  }
  input:focus,
  input.has-content + label {
    outline: none;
    border-color: #61bfad;
  }
  label {
    color: #b4b4b4;
    position: absolute;
    top: 30%;
    left: 10px;
    transition: 0.2s ease-out;
    cursor: text;
  }
  input:focus + label,
  input.has-content + label {
    color: #61bfad;
    top: -33%;
    transition: 0.2s ease-out;
    font-size: 12px;
  }
`;

function Input({ label, name, onChange, value }) {
  const [hasContent, setHasContent] = useState(false);

  const handleFloat = (event) => {
    if (event.target.value !== '') {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  };

  useEffect(() => {
    if (value !== '') {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [value]);

  return (
    <StyledInput>
      <input
        name={name}
        type="text"
        placeholder=""
        onBlur={handleFloat}
        className={hasContent ? 'has-content' : ''}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={name} className="label">
        {label}
      </label>
    </StyledInput>
  );
}

Input.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  // onChange: PropTypes.node.isRequired,
  // value: PropTypes.node.isRequired,
};

export default Input;
