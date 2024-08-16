import BookCard from "./Books";

const BookList: React.FC = ({ books }) => {
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
const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
  },
};
