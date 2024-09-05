const express = require("express");
const router = express.Router();

const moods = require("../data/moods");
const journal = require("../data/journal");
const users = require("../data/users");
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
router
    .route("/:id")
    .get((req, res, next) => {
        const moodPosts = journal.filter((j) => j.mood.moodId == req.params.id)
        
        let formattedPosts = []
        
        moodPosts.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          let mood = moods.find((m) => m.id == post.mood.moodId)
          let note = post.mood.note;
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), note: note})
        });

        if (formattedPosts) res.render("journal", {title: "Happy", items: formattedPosts})
        else next();
});

module.exports = router;
