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
    .route("/:name")
    .get((req, res, next) => { 
        let mood = moods.find((m) => m.name.toLowerCase() == req.params.name)
        const moodPosts = journal.filter((j) => j.mood.moodId == mood.id)

        let formattedPosts = []
        
        moodPosts.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          let note = post.mood.note;
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), note: note})
        });

        if (formattedPosts) res.render("journal", {title: mood.name, items: formattedPosts})
        else next();
});

router.use((req, res, next) => {
  next(error(404, "Resource Not Found")); // could render 404 page
});

module.exports = router;
