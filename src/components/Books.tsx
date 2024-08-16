import React from "react";

const apiUrl: string = "https://openlibrary.org/search.json?q=";
const userAgent =
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36";
const userAgent2 = "KeepTrack/0.1 (shoutizix@gmail.com)";
const headers: Headers = new Headers({
  //"User-Agent": userAgent,
  Accept: "application/json",
  "Access-Control-Request-Headers": "accept",
});
const options = {
  method: "GET",
  headers: headers,
};
export enum languages {
  FR = "fre",
  EN = "eng",
}

// Définir une interface pour les données de livres
export interface Book {
  id: string;
  title: string;
  author: string;
  imageId: string;
  publicationYear: Date;
}

function parseBooks(rawData): Array<Book> {
  //console.log(`rawData : ${JSON.stringify(rawData)}`);
  const books: Book[] = [];

  rawData.docs.forEach((book) =>
    books.push({
      id: book.key,
      title: book.title,
      author: book.author_name,
      imageId: book.cover_i,
      publicationYear: book.first_publish_year,
    })
  );
  return books;
}

// Fonction pour fetcher les données de livres
export async function fetchBooks(
  title: string,
  lang: languages
): Promise<Book[]> {
  try {
    const computedUrl = `${apiUrl}${title}&fields=cover_i,key,title,author_name,editions,editions.language,first_publish_year&language=${lang}`;
    const response = await fetch(computedUrl, options);

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error(`Erreur lors de la requête : ${response.status}`);
    }

    // Convertir la réponse en JSON
    const data: Book[] = await response.json();

    // Retourner les données
    return parseBooks(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    return [];
  }
}

interface BookCardProps {
  book: Book;
}

function retrieveImageURL(book: Book): string {
  const imageSize = "M";
  return book.imageId
    ? `https://covers.openlibrary.org/b/id/${book.imageId}-${imageSize}.jpg`
    : "";
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  console.log(book);
  const imageURL = retrieveImageURL(book);

  return (
    <div style={styles.card}>
      {imageURL && (
        <img
          src={retrieveImageURL(book)}
          alt={book.title}
          style={styles.coverImage}
        />
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
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    width: "300px",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  coverImage: {
    width: "100%",
    height: "auto",
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
};

// Exemple d'utilisation de la fonction
// export default fetchBooks;
