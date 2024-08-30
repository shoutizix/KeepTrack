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
  // const [options, setOptions] = useState<Book[]>([]);

  const fBooks = (searchWords: string) => fetchBooks(searchWords, languages.FR);
  // .then((books) =>
  //     books.map((book) => ({
  //       value: book.title,
  //       label: `${book.title}, by ${book.author}`,
  //       image: retrieveImageURL(book, "S"),
  //     }))
  // );
  // Retrieve books from local storage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Save books to local storage whenever the list is updated
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
    }
  }, [books]);

  // Function to add a book to the list (and update local storage)
  const addBook = (newBook: Book) => {
    setBooks((prevSelectedBooks) => [
      ...new Set([...prevSelectedBooks, newBook]),
    ]);
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
        <BookList key={0} books={books} />
        {/* {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))} */}
      </div>
    </>
  );
}

export default App;
