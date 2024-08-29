import BookCard from "./BookCard";
import { Book } from "./Books";

interface BookListProp {
  books: Book[];
}

const BookList: React.FC<BookListProp> = ({ books }) => {
  return (
    <div style={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
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
