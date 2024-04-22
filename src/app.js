const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Define paths for Express config
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const PORT = process.env.PORT || 8000;

app.get("", (req, res) => {
  res.render("index", {
    title: "Use this to get you weather!",
    description: "Type in a location in the search field.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Meeeeeeeeee",
    description: "Im that guy you heard about!",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "HELP!",
    title: "Hes trying to kill me",
    description: "...with kindness!",
  });
});

app.get("/weather", (req, res) => {
  const geocode = require("./utils/geocode");
  const forecast = require("./utils/forecast");

  geocode(
    req.query.address,
    (error, { location, longtitute, latitude } = {}) => {
      if (error) {
        return res.send({ error });
      } else if (!req.query.address) {
        return res.send({
          error: "You must provide a search term.",
        });
      }

      forecast(longtitute, latitude, (error, dataForecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          dataForecast,
          Address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    help_title: "404",
    description: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    help_title: "404",
    description: "PAGE NOT FOUND!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
