import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AsyncSelect from "react-select/async";
import "./App.css";
import Books, {
  fetchBooks,
  languages,
  Book,
  retrieveImageURL,
} from "./components/Books";
import BookList from "./components/BookList";
import { components } from "react-select";

interface BookOption {
  value: string;
  label: string;
  image: string;
}

const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.data.image && (
          <img
            src={props.data.image}
            alt={props.data.label}
            style={{ width: 70, height: 85, marginRight: 10 }}
          />
        )}
        <div>{props.data.label}</div>
      </div>
    </components.Option>
  );
};

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "white" : "black", // texte noir normalement, blanc si sélectionné
    backgroundColor: state.isSelected ? "#007bff" : "white", // bleu pour les options sélectionnées
    ":hover": {
      backgroundColor: state.isSelected ? "#0056b3" : "#f1f1f1", // fond plus foncé au survol
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black", // texte de la valeur sélectionnée en noir
  }),
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [options, setOptions] = useState<BookOption[]>([]);

  const fBooks = (searchWords: string) =>
    fetchBooks(searchWords, languages.FR).then((books) =>
      books.map((book) => ({
        value: book.title,
        label: `${book.title}, by ${book.author}`,
        image: retrieveImageURL(book, "S"),
      }))
    );

  const loadOptions = (
    inputValue: string,
    callback: (options: BookOption[]) => void
  ) => {
    fBooks(inputValue).then((options) => callback(options));
  };

  return (
    <>
      <h1>Keep Track</h1>
      <AsyncSelect
        loadOptions={loadOptions}
        components={{ Option: CustomOption }}
        styles={customStyles}
        placeholder="Rechercher un livre"
        isClearable
      />
      {/* //loadOptions={fBooks} /> */}
      <div>{books && <BookList books={books} />}</div>
    </>
  );
}

export default App;
