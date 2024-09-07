const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const users = require("../data/users");
const error = require("../views/error");
const e = require("express");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
    if (req.query.username) {
      const user = users.find((u) => u.username == req.query.username)
      if (user) res.render("user", {user: user}) 
    } else {
      res.render("data", {title: "Users", items: users})
    }
  })

router
    .route("/:id")
    .get((req, res, next) => {
        const user = users.find((u) => u.id == req.params.id)
        if (user) res.render("user", {user: user})
        else next();
    })
    .patch((req, res, next) => {
      if (req.query.username) {
        const user = users.find((u) => u.username == req.query.username) 
      } else {
        const user = users.find((u) => u.id == req.params.id) 
      }
      const { username, email, name } = req.body;
      if (username) user.username = username;
      if (email) user.email = email;
      if (name) user.name = name;
      return res.status(200).json({ success: true, user });
    })


module.exports = router;
