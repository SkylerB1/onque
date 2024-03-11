import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#D3D3D3" : "white")};
  padding: 6px 16px;
  font-size: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  alignt-items: center;

  &:hover {
    background-color: ${(props) => (props.selected ? "#e3e3e3" : "#e3e3e3")};
  }
`;

const ToggleButton = ({ value, onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleButtonClick = () => {
    setSelected(!selected);
    onClick(value);
  };

  return (
    <Button className="justify-center mt-3 mr-3 text-black border-none border-ra" selected={selected} onClick={handleButtonClick}>
      {value}
    </Button>
  );
};

export default ToggleButton;
