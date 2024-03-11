import React from "react";

function TableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" colSpan="6" className="py-3 pl-4">
          <div className="relative max-w-xs">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="block w-full p-3 pl-10 text-base font-normal border-none rounded-md focus:border-white focus:ring-white dark:bg-gray-800 dark:border-gray-800 dark:text-gray-100 text-gray-400"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </th>
      </tr>
      <tr>
        {/* <th scope="col" className="py-3 pl-4">
          <div className="flex items-center h-5">
            <input
              id="checkbox-all"
              type="checkbox"
              className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
            />
            <label htmlFor="checkbox" className="sr-only">
              Checkbox
            </label>
          </div>
        </th> */}
        <th
          scope="col"
          className="px-6 py-3 text-sm font-normal text-left text-gray-500 uppercase"
        >
          Date
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-sm font-normal text-left text-gray-500 uppercase"
        >
         Post content 
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-sm font-normal text-right text-gray-500 uppercase"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-sm font-normal text-right text-gray-500 uppercase"
        >
          Edit
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
