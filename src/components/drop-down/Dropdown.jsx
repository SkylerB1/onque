import {
  Menu,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import React, { useState } from "react";

function Dropdown({ children, options }) {
  const [open, setOpen] = useState(false);
  const handleClick = (onClick) => {
    onClick();
  };
  const handler = () => {
    setOpen(!open);
  };
  return (
    <>
      <Menu open={open} handler={handler} placement="bottom-end">
        <MenuHandler>{children}</MenuHandler>
        <MenuList className="px-0">
          {options.map((option, index) => (
            <MenuItem
              className="flex items-center gap-4 py-2 pl-2 pr-8 rounded-none"
              key={index}
              value={option.value}
              onClick={() => handleClick(option.onClick)}
            >
              {option.icon && option.icon}
              <p className="text-sm font-medium">{option.label}</p>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default Dropdown;
