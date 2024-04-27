
import React from "react";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-center">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className="btn btn-warning mx-1"
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
