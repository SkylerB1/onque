import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Menu,
  MenuHandler,
  MenuList,
  Spinner,
  Typography,
} from "@material-tailwind/react";

const Filters = ({ options, selectedOptions, onChange, title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    options.reduce((acc, option) => {
      acc[option] = true; // By default, all checkboxes are checked
      return acc;
    }, {})
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (option) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  const handleApply = () => {
    setLoading(true);
    // Apply filter logic here
    const filtered = Object.keys(selectedCheckboxes).filter(
      (option) => selectedCheckboxes[option]
    );
    onChange(filtered);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setSelectedCheckboxes((prevState) =>
      Object.keys(prevState).reduce((acc, option) => {
        acc[option] = true; // Reset all checkboxes to checked
        return acc;
      }, {})
    );
    onChange(options); // Reset to show all options
  };

  return (
    <Menu
      placement="bottom-end"
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        {title ? (
          <div className="w-[14rem] rounded-md bg-white cursor-pointer h-10">
            <div className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 items-center justify-between flex whitespace-nowrap">
              {title}
              <svg
                className="-mr-1 ml-2 mt-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 0 1-.707-.293L5.414 7.707a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-.707.293z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </MenuHandler>
      <MenuList className="w-80 max-h-[70vh]">
        <div className="flex items-center justify-between p-2">
          <Button
            variant="outlined"
            size="sm"
            className="h-15"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="filled"
            size="sm"
            className="h-15"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
        {!loading && (
          <input
            type="text"
            role="menuitem"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="my-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        )}
        {loading ? (
          <Spinner size="sm" color="blue" className="mx-auto" />
        ) : (
          options.map((option, index) => (
            <div
              key={index}
              className="flex items-center w-full my-1 text-start text-sm text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200 px-2 justify-between rounded-md hover:cursor-pointer "
            >
              <div>
                <Typography>{option}</Typography>
              </div>
              <Checkbox
                ripple={false}
                checked={selectedCheckboxes[option]}
                onChange={() => handleCheckboxChange(option)}
                className="h-5 w-5 rounded-full border-gray-900 transition-all hover:scale-105 hover:before:opacity-0"
              />
            </div>
          ))
        )}
      </MenuList>
    </Menu>
  );
};

export default Filters;
