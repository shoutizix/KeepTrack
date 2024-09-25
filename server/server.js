const scrap = require("./scrap.js");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 3001; // Use another port than React

app.use(cors()); // Autorise les requêtes cross-origin pour React

app.get("/scrape-books", scrap);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
