import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  width: 100%;
  max-width: 400px;
  padding-top: 35px;
  margin: 0 20px 20px 20px;
  position: relative;
  input {
    width: 100%;
    height: 25px;
    border: none;
    border-bottom: 2px solid #c4c4c4;
  }
  input:focus,
  input.has-content + label {
    outline: none;
    border-bottom-color: #5fa8d3;
  }
  label {
    color: #b4b4b4;
    position: absolute;
    top: 57%;
    left: 0;
    transition: 0.2s ease-out;
    cursor: text;
  }
  input:focus + label,
  input.has-content + label {
    color: #5fa8d3;
    top: 33%;
    transition: 0.2s ease-out;
    font-size: 12px;
  }
`;

function Input({ label, name, onChange, value }) {
  const [hasContent, setHasContent] = useState(false);

  const handleFloat = (event) => {
    if (event.target.value !== "") {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  };

  useEffect(() => {
    if (value !== "") {
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
        className={hasContent ? "has-content" : ""}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={name} className="label">
        {label}
      </label>
    </StyledInput>
  );
}

export default Input;
