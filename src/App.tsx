import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Books, { fetchBooks, languages, Book } from "./components/Books";
import BookList from "./components/BookList";

function App() {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);

  fetchBooks("Bernard Werber", languages.FR).then((fetchedBooks) =>
    setBooks(fetchedBooks)
  );

  return (
    <>
      <h1>Keep Track</h1>
      <div>{books && <BookList books={books} />}</div>
    </>
  );
}

export default App;
