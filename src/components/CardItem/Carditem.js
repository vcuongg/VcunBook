// Thay thế toàn bộ nội dung file này:
import React from "react";
import { useAppContext } from "../../provider/AppProvider";

const CardItem = ({ cartItem, onQuantityChange, onRemove }) => {
  const { books } = useAppContext();

  // Tìm book từ cartItem.bookId
  const book = books.find((b) => String(b.id) === String(cartItem.bookId));

  if (!book) return null;

  return (
    <div className="d-flex align-items-center p-3 border-bottom">
      {/* Book Image */}
      <div className="me-3">
        <img
          src={book.image}
          alt={book.title}
          style={{
            width: "80px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Book Info */}
      <div className="flex-grow-1">
        <h6 className="fw-bold mb-1 text-dark">{book.title}</h6>
        <p className="text-muted small mb-3">by {book.author}</p>

        {/* Quantity Controls */}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-secondary rounded-circle"
            style={{ width: "32px", height: "32px" }}
            onClick={() =>
              onQuantityChange(cartItem.bookId, cartItem.quantity - 1)
            }
          >
            −
          </button>
          <span className="mx-3 fw-medium">{cartItem.quantity}</span>
          <button
            className="btn btn-sm btn-outline-secondary rounded-circle"
            style={{ width: "32px", height: "32px" }}
            onClick={() =>
              onQuantityChange(cartItem.bookId, cartItem.quantity + 1)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="text-end">
        <h6 className="fw-bold text-danger mb-2">
          ${(book.price * cartItem.quantity).toFixed(2)}
        </h6>
        <button
          className="btn btn-sm text-muted p-1"
          onClick={() => onRemove(cartItem.bookId)}
          style={{ fontSize: "1.2rem" }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CardItem;
