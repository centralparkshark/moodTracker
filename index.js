// - mood tracker [user, moods, journal]
// users - create, read, update, delete
// moods - read 
// journal - create, read, update, delete

const express = require("express");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
        res.send("Hello Express!");
    });


app.listen(port, () => {
    console.log("Server started.")
})

// TO-DO:
// [ ] two pieces of custom middleware
// [ ] error handling middleware
// [ ] 3 different data categories (eg users, post, comments)
// [ ] reasonable data structuring practices
// [ ] get routes for all data exposed to cleint
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