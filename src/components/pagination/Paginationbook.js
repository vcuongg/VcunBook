import React from "react";
import { Pagination } from "react-bootstrap";
import "./Paginationbook.css";
const Paginationbook = ({ currentPage, totalPages, onPageChange }) => {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className="d-flex justify-content-center pagination">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      ></Pagination.Prev>
      {items}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      ></Pagination.Next>
    </Pagination>
  );
};

export default Paginationbook;
