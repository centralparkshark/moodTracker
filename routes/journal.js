const express = require("express");
const router = express.Router();

const journal = require("../data/journal");
const moods = require("../data/moods");
const users = require("../data/users");
const error = require("../views/error");

router
    .route("/")
    .get((req, res, next) => {
        let formattedPosts = []
        
        journal.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          let mood = moods.find((m) => m.id == post.mood.moodId)
          let note = post.mood.note;
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), note: note})
        });

        if (formattedPosts) res.render("journal", {title: "", items: formattedPosts})
        else next();
});
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
