const axios = require("axios");
const cheerio = require("cheerio");

async function scrap(req, res) {
  try {
    // URL TO SCRAP
    const rootUrl = "https://www.folio-lesite.fr";
    const url = "https://www.folio-lesite.fr/catalogue";
    const pagesToScrape = ["?page=0%2C0"];
    const pagesDiscovered = ["?page=0%2C0"];
    const limit = 10;
    let currentPageNumber = 1;

    const books = [];

    while (pagesToScrape.length !== 0 && currentPageNumber <= limit) {
      // retrieve the current page to scrape
      const pageURL = pagesToScrape.shift();
      const { data } = await axios.get(url + pageURL);
      const $ = cheerio.load(data);

      // Parsing the data logic
      $(".node--ouvrage").each((i, element) => {
        const title = $(element).find(".card--ouvrage__title").text().trim();
        const author = $(element)
          .find(".field--contributeurs--multi--listing")
          .text()
          .trim();
        const image = $(element).find("img").attr("src")
          ? rootUrl + $(element).find("img").attr("src")
          : "";
        const price = $(element).find(".field--prix").text().trim();
        const tag =
          $(element).find(".field--idees-de-lecture").text().trim() || "No tag";
        const id = price + tag;
        books.push({ id: id, title: title, author: author, imageId: image });
      });

      // Go to the next page logic
      $("li.pager__item").each((j, paginationHTMLElement) => {
        const attributesPageButton = paginationHTMLElement.attributes;
        if (
          attributesPageButton[0].value === "pager__item" ||
          attributesPageButton[0].value === "pager__item is-active"
        ) {
          // get the pagination link URL
          const paginationURL = $(paginationHTMLElement).find("a").attr("href");

          // if the page discovered is new
          if (paginationURL && !pagesDiscovered.includes(paginationURL)) {
            pagesDiscovered.push(paginationURL);

            // if the page discovered should be scraped
            if (!pagesToScrape.includes(paginationURL)) {
              pagesToScrape.push(paginationURL);
            }
          }
        }
      });

      console.log(currentPageNumber);
      currentPageNumber++;
    }
    // Send the result to the front end logic
    // console.log(books);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error scraping the data.");
  }
}

module.exports = scrap;
