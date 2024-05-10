import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = (props) => {
  const {
    currentPage,
    onPageChange,
    pages,
    pageCount,
    handleNext,
    handlePrevious,
  } = props;

  if (pageCount <= 2) return null;
  return (
    <nav className="text-centre" aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <span
            className={currentPage === 1 ? "page-link disabled" : "page-link"}
            onClick={() => {
              if (currentPage === 1) return;
              handlePrevious();
            }}
          >
            Previous
          </span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "pag-item active" : "page-item"}
          >
            <span className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </span>
          </li>
        ))}
        <li className="page-item">
          <span
            className={
              currentPage === pageCount - 1 ? "page-link disabled" : "page-link"
            }
            onClick={() => {
              if (currentPage === pageCount - 1) return;
              handleNext();
            }}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
};
export default Pagination;
