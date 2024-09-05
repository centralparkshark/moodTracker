const express = require("express");
const router = express.Router();

const users = require("../data/users");
const error = require("../views/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    res.render("data", {title: "Users", items: users})
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
router
    .route("/:id")
    .get((req, res, next) => {
        const user = users.find((u) => u.id == req.params.id)
        if (user) res.render("user", {user: user})
        else next();
});


module.exports = router;
