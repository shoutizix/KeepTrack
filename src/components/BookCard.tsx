import React from "react";
import { Book, retrieveImageURL } from "./Books";
import crossIcon from "../assets/cross.svg";

interface BookCardProps {
  book: Book;
  removeBook: (id: Book["id"]) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, removeBook }) => {
  const imageURL = retrieveImageURL(book, "M");

  const handleRemove = () => {
    removeBook(book.id);
  };

  return (
    <div style={styles.card}>
      <img
        src={crossIcon}
        alt="Remove book"
        style={styles.crossIcon}
        onClick={handleRemove}
      />
      {imageURL && (
        <img src={imageURL} alt={book.title} style={styles.coverImage} />
      )}
      <div style={styles.cardContent}>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.author}>by {book.author}</p>
        {book.publicationYear && (
          <p style={styles.year}>
            Published in {book.publicationYear.toString()}
          </p>
        )}
        {/* <p style={styles.description}>{book.description}</p> */}
      </div>
    </div>
  );
};

export default BookCard;

// Styles inline
const styles = {
  card: {
    position: "relative" as const,
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    width: "300px",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  coverImage: {
    width: "100%",
    height: "250px",
  },
  cardContent: {
    padding: "16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  author: {
    fontSize: "16px",
    margin: "0 0 8px 0",
  },
  year: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 8px 0",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
  crossIcon: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    width: "20px",
    height: "20px",
    cursor: "pointer" as const,
  },
};
