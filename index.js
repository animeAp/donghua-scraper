const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/donghua", async (req, res) => {
  try {
    const { data } = await axios.get("https://anime4i.com/category/chinese-anime");
    const $ = cheerio.load(data);

    let result = [];

    $(".post-show").each((i, el) => {
      const title = $(el).find(".entry-title a").text();
      const link = $(el).find(".entry-title a").attr("href");
      const img = $(el).find("img").attr("src");

      result.push({ title, link, img });
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Scraping failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Donghua scraper running on port", PORT);
});
