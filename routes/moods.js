const express = require("express");
const router = express.Router();

const moods = require("../data/moods");
const error = require("../views/error");

// app.get("/users/:id", (req, res) => {
//     res.send("User:");
// });


router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "moods/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    const options = {
      title: "Moods",
      items: moods,
    };
    res.render("data", options)
  })
//   .post((req, res, next) => {
//     if (req.body.name && req.body.username && req.body.email) {
//       if (users.find((u) => u.username == req.body.username)) {
//         next(error(409, "Username Already Taken"));
//       }

//       const user = {
//         id: users[users.length - 1].id + 1,
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//       };

//       users.push(user);
//       res.json(users[users.length - 1]);
//     } else next(error(400, "Insufficient Data"));
//   });


module.exports = router;
