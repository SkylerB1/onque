import dayjs from "dayjs";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi";

const TableBody = ({ events }) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {events.length === 0 ? (
        <tr>
          <td colSpan="6" className="text-center py-4 text-[#9F9F9F]">
            No data available
          </td>
        </tr>
      ) : (
        events.map((event, index) => (
          <tr key={index}>
            <td className="py-3 pl-4">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox" className="sr-only">
                  Checkbox
                </label>
              </div>
            </td>
            <td className="px-6 py-4 text-base font-medium text-gray-800 whitespace-nowrap">
              {dayjs(event.start).format("MMM D, YYYY LT")}{" "}
              {/* Format the date */}
            </td>
            <td className="px-6 py-4 text-base text-gray-800 whitespace-nowrap">
              {event.title}
            </td>
            <td className="px-6 py-4 text-base text-gray-800 whitespace-nowrap">
              {event.platform}
            </td>
            <td className="px-6 py-4 text-base text-gray-800 whitespace-nowrap"></td>
            <td className="px-6 py-4 text-base font-medium text-right whitespace-nowrap">
              <button
                className="text-green-500 hover:text-green-700 bg-blue-gray-50 pr-4 pl-4 rounded-xl shadow-md"
                href="#"
              >
                <span className="flex flex-1 justify-center conent-center">
                  <HiOutlinePencil className="mt-1 mr-2" />
                  Edit
                </span>
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableBody;
