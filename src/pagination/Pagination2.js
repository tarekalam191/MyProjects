import React from "react";

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="text-center ">
            {pages.map((page, index) => (
                <button className="btn btn-warning mx-1" key={index} onClick={() => setCurrentPage(page)}>
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
