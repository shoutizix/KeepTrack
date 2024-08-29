const apiUrl: string = "https://openlibrary.org/search.json?q=";
// const userAgent =
//   "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36";
//const userAgent2 = "KeepTrack/0.1";
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

export interface Book {
  id: string;
  title: string;
  author: string;
  imageId: string;
  publicationYear: Date;
}

type rawBook = {
  key: string;
  title: string;
  author_name: string;
  cover_i: string;
  first_publish_year: Date;
};

type rawBooks = {
  docs: rawBook[];
};

function parseBooks(rawData: rawBooks): Array<Book> {
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
    const data: rawBooks = await response.json();
    // Retourner les données
    return parseBooks(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    return [];
  }
}

export function retrieveImageURL(book: Book, imageSize: string = "M"): string {
  // const imageSize = "M";
  return book.imageId
    ? `https://covers.openlibrary.org/b/id/${book.imageId}-${imageSize}.jpg`
    : "";
}
