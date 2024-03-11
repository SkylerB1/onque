;


import React, { useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

const PostHistory = ({ events }) => {
  const data = [
    // ... your data ...
  ];
  const itemsPerPage = 5; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="min-h-[500px]">
      <div className="flex flex-1 justify-between mt-8 mb-6 ml-3">
        <h2 className="text-xl">Post</h2>
        <button className="inline-flex items-center px-6 py-1 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
          Delete
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader />
        <TableBody events={events} />
      </table>
      <TableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostHistory;
