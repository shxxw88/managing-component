import { useState } from "react";

function BookCard({ title, price, image, link, onRemove }) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div
      className={`book-card ${isSelected ? "selected" : ""}`}
      onClick={toggleSelect}
    >
      {image && <img src={image} alt={`Cover of ${title}`} />}

      <div className="book-details">
        <div className="book-title">{title}</div>
        <div className="book-price">{price || "N/A"}</div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="book-link"
          onClick={(e) => e.stopPropagation()} // prevents toggling when clicking link
        >
          Learn more
        </a>
      </div>

      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation(); // don’t toggle select when removing
          onRemove?.();
        }}
      >
        x Remove
      </button>
    </div>
  );
}

export default BookCard;
