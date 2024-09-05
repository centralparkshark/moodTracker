// - mood tracker [user, moods, journal]
// users - create, read, update, delete
// moods - read 
// journal - create, read, update, delete

const express = require("express");
const app = express();
const port = 3000;

let ejs = require('ejs');
app.set("views", "./views")
app.set("view engine", "ejs")

const bodyParser = require("body-parser");

const users = require("./routes/users");
const moods = require("./routes/moods");
const journal = require("./routes/journal");

const error = require("./views/error");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    const options = {
        title: "Home",
        items: [{title: "Click a link below."}],
    };
    res.render("data", options)
});

// Use Routes
app.use("/users", users);
app.use("/moods", moods);
app.use("/journal", journal);


// Error Handling
app.use((req, res, next) => {
        next(error(404, "Resource Not Found")); // could render 404 page
      });

app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({ error: err.message });
      });

app.listen(port, () => {
    console.log("Server started.")
})

// TO-DO:
// [ ] two pieces of custom middleware
// [x] error handling middleware
// [x] 3 different data categories (eg users, post, comments)
// [x] reasonable data structuring practices
// [ ] get routes for all data exposed to client
// [ ] post routes as appropriate (at least one data category)
// [ ] patch/put (at least 1)
// [ ] delete (at least 1)
// [ ] query parameters for data filtering (at least 1)
// [ ] route parameters
// [ ] adhere to REST
// [ ] at least 1 view using view template and template engine
// [ ] simple css w/ static file using express
// [ ] form that allows interaction 
// [ ] reasonable code organization practices
// [ ] runs without error
// [ ] commit frequently
// [ ] readme
// [ ] level of effort

// bonus:
// [ ] practical usage of regex in route path
// [ ] use one new third party node package 