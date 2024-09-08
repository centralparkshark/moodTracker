const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const users = require("../data/users");
const error = require("../views/error");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router
  .route("/")
  .get((req, res) => {
    // renders specific user
    if (req.query.username) {
      const user = users.find((u) => u.username == req.query.username)
      if (user) res.render("user", {user: user,
        _links: {
          self: { href: `/users?username=${req.query.username}`, method: "GET"},
          update: { href: `/users/${user.id}`, method: "PATCH"}
        }
      }) 
      // renders all users
    } else {
      const links = users.map((user) => ({
      href: `/users/${user.id}`,
      rel: "self",
      type: "GET"
      }))

      res.render("data", {title: "Users", items: users, _links: {self: {href: "/users", method: "GET"}, users: links,}})
    }
  })

router
    .route("/:id")
    .get((req, res, next) => {
        const user = users.find((u) => u.id == req.params.id)
        if (user) res.render("user", {user: user,
          _links: {
            self: { href: `/users${user.id}`, method: "GET"},
            update: { href: `/users/${user.id}`, method: "PATCH"}
          }
        })
        else next();
    })
    .patch((req, res, next) => {
      if (req.params.id) {
        const user = users.find((u) => u.id == req.params.id) 
        const { username, email, name } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        if (name) user.name = name;
        return res.status(200).json({ success: true, user,  _links: {
          self: { href: `/users${user.id}`, method: "GET"},
          update: { href: `/users/${user.id}`, method: "PATCH"}
        } });
      }
      
    })

    router.use((req, res, next) => {
      next(error(404, "Resource Not Found")); // could render 404 page
    });
    router.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({ error: err.message });
    });

module.exports = router;
