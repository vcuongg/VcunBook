import React from "react";
import "./BookCard.css";

const BookCard = ({
  image,
  title,
  author,
  price,
  onButtonClick,
  buttonText,
}) => {
  return (
    <div className="card shadow-sm">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h6 className="card-title fw-bold">{title}</h6>
        <p className="card-text">{author}</p>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="link-red">{price}</h4>
          <button className="btn add-to-cart-btn" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
