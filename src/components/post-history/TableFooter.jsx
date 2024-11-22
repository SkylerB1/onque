import React from "react";

function TableFooter({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      <nav className="bg-white px-4 py-3 flex items-center rounded-lg shadow-lg">
        <ul className="flex space-x-2">
          {Array.isArray(pageNumbers) && pageNumbers.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`${
                  currentPage === page
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                } px-3 py-1 rounded-lg focus:outline-none`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default TableFooter;
