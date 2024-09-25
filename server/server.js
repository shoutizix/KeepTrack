const scrap = require("./folio.js");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001; // Use another port than React

function handleRequest(req, res) {
  // Check the sources wanted

  // Use the appropriate sources to get data
  return scrap(req, res);
}

app.use(cors()); // Autorise les requêtes cross-origin pour React

app.get("/scrape-books", handleRequest);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
