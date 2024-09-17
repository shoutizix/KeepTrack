import BookCard from "./BookCard";
import { Book } from "./Books";

interface BookListProp {
  books: Book[];
  removeBook: (id: Book["id"]) => void;
}

const BookList: React.FC<BookListProp> = ({ books, removeBook }) => {
  return (
    <div style={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} removeBook={removeBook} />
      ))}
    </div>
  );
};

export default BookList;

// Styles inline pour la grille
const styles: { grid: React.CSSProperties } = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
  },
};
