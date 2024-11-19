import React from "react";

function ButtonGroup({ groups, handleClick }) {
  return (
    <div className="inline-flex rounded-md shadow-sm my-4" role="group">
      {Array.isArray(groups) && groups?.map((item, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(index)}
            className={`${index == 0 && "rounded-l-lg"} ${
              index == groups.length - 1 && "rounded-r-lg"
            } px-2 py-2 text-xs font-medium bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
