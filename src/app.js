const path = require("path");

const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const { response } = require("express");

/*
console.log(__dirname); // D:\Node course 3rd edition\web-server\src
console.log(__filename); // D:\Node course 3rd edition\web-server\src\app.js
console.log(path.join(__dirname, "../public")); // path.join() takes 2 argument
 1st- which path to edit, 2nd- where we want to go from that path
*/
const app = express();

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs"); // (Handlebars) allows you to set a value for given express setting, // functionality:- render dynamic documents, reusable
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath)); // it is a way to customise your server, express.static() takes path to the folder we wanna serve up

/*
app.get("", (req, res) => {
  res.send("<h1>Hello</h1>");
}); // 1st- route, 2nd- function which defines what route will do, function take 2 arguments 1- request, 2- response
*/

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Shaurya",
  }); // render helps us to render our view that is dynamic html, it takes 2 arguments 1st- views file, we only give name, path is not required, 2nd- object which contains values you want that view be able to access
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Shaurya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Can you help me",
    title: "Help",
    name: "Shaurya",
  });
});

app.get("/help", (req, res) => {
  res.send({
    name: "Shaurya",
    age: 20,
  });
});

app.get("/about", (req, res) => {
  res.send("<h2>About page</h2>");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  forecast(req.query.address, (err, resp) => {
    if (err) return res.send(err);
    res.send(resp);
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    }); // we can't send more than one response so we used return so that function do not run further
  }
  console.log(req.query); // ({ search: 'games', rating: '5' }), Query String, if we visit (http://localhost:3000/products?search=games&rating=5) then in console we can see this result
  res.send({
    products: [],
  });
});

// WE CAN ONLY SEND ONE REQUEST AND ONE RESPONSE IN ROUTE HANDLERS, IF WE SEND MORE THAN 1 RESPONSE WE GET THIS ERROR(Cannot set headers after they are sent to the client)

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessage: "Help article not found",
  });
}); // */help/* means any route that we have not listed after /help in our route handlers, This is for error handling

app.get("*", (req, res) => {
  res.render("error", {
    errorMessage: "Page not found",
  });
}); // * means any route that we have not listed in our route handlers, This is for error handling

// To start server use app.listen()
app.listen(3000, () => {
  console.log("Server is up on port 3000");
}); // 1- port number, 2-(optional) callback function which runs when server is runing
