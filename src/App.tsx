import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import "./App.css";
import {
  fetchBooks,
  languages,
  Book,
  retrieveImageURL,
} from "./components/Books";
import { components, OptionProps, StylesConfig } from "react-select";
import BookList from "./components/BookList";

const LOCAL_STORAGE_KEY = "bookList";

type CustomOptionProps = OptionProps<Book, false>;

const CustomOption: React.FC<CustomOptionProps> = (props) => {
  const image = retrieveImageURL(props.data, "S");
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {image && (
          <img
            src={image}
            alt={props.data.title}
            style={{ width: 70, height: 85, marginRight: 10 }}
          />
        )}
        <div>{props.data.title}</div>
      </div>
    </components.Option>
  );
};

const customStyles: StylesConfig<Book, false> = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black", // texte noir normalement, blanc si sélectionné
    backgroundColor: state.isSelected ? "#007bff" : "white", // bleu pour les options sélectionnées
    ":hover": {
      backgroundColor: state.isSelected ? "#0056b3" : "#f1f1f1", // fond plus foncé au survol
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black", // texte de la valeur sélectionnée en noir
  }),
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [isBookRemoved, setIsBookRemoved] = useState<boolean>(false);

  const fBooks = (searchWords: string) => fetchBooks(searchWords, languages.FR);

  // Retrieve books from local storage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Save books to local storage whenever the list is updated
  useEffect(() => {
    if (isBookRemoved) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
      setIsBookRemoved(false);
    } else if (books.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
    }
  }, [books]);

  // Function to add a book to the list (and update local storage)
  const addBook = (newBook: Book) => {
    if (books.some((book) => book.id === newBook.id)) {
      setErrorMessage("This book is already in your list!");
      setShowError(true);
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }
    setBooks((prevSelectedBooks) => [...prevSelectedBooks, newBook]);
  };

  // Function to remove a book to the list (and update local storage)
  const removeBook = (bookIdToRemove: Book["id"]) => {
    if (!books.some((book) => book.id === bookIdToRemove)) {
      setErrorMessage("This book is not already in your list!");
      setShowError(true);
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }

    setBooks((prevSelectedBooks) =>
      prevSelectedBooks.filter((book) => book.id !== bookIdToRemove)
    );
    setIsBookRemoved(true);
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: Book[]) => void
  ) => {
    fBooks(inputValue).then((options) => callback(options));
  };

  const handleSelect = (selectedOption: Book | null) => {
    if (selectedOption) {
      addBook(selectedOption);
    }
  };

  return (
    <>
      <h1>Keep Track</h1>
      <AsyncSelect
        loadOptions={loadOptions}
        onChange={handleSelect}
        components={{ Option: CustomOption }}
        styles={customStyles}
        placeholder="Rechercher un livre"
        isClearable
      />
      {/* //loadOptions={fBooks} /> */}
      <div style={{ marginTop: "20px" }}>
        <h2>Ma liste de livres</h2>
        <div style={styles.container}>
          {errorMessage && (
            <div style={showError ? styles.errorVisible : styles.errorHidden}>
              {errorMessage}
            </div>
          )}
          <BookList key={0} books={books} removeBook={removeBook} />
          {/* {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))} */}
        </div>
      </div>
    </>
  );
}

export default App;

// Styles
const styles = {
  container: {
    position: "relative" as const,
    paddingBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
  },
  errorVisible: {
    position: "fixed" as const,
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: 1000,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    transition: "opacity 1.5s ease-in-out",
    opacity: 1, // Fully visible
  },
  errorHidden: {
    position: "fixed" as const,
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: 1000,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    transition: "opacity 0.5s ease-in-out",
    opacity: 0, // Fully hidden
    pointerEvents: "none", // Prevent interaction while hidden
  },
};
