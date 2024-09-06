const express = require("express");
const router = express.Router();

let journal = require("../data/journal");
const moods = require("../data/moods");
const users = require("../data/users");
const error = require("../views/error");
const { route } = require("./moods");

router
    .route("/")
    .get((req, res, next) => {
        let formattedPosts = []
        
        journal.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          let mood = moods.find((m) => m.id == post.mood.moodId)
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), post: post})
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
router
  .route('/new')
  .get((req, res) => {
    let userSelect = ""
    users.forEach(user => {
      userSelect += `<option value="${user.id}">${user.username}</option>`
    });
    let moodSelect = ""
    moods.forEach(mood => {
      moodSelect += `<option value="${mood.id}">${mood.name}</option>`
    });

    res.render("newEntry", {userSelect, moodSelect})
  })
  .post((req, res) => {
        const journalEntry = {
          id: journal[journal.length - 1].id + 1,
          userId: req.body.userId,
          mood: {
            moodId: req.body.mood,
            note: req.body.note
          }
        };
        journal.push(journalEntry);
    res.redirect('/journal')
  })

  router
    .route("/:postId")
    .get((req, res, next) => {
        let entry = []
        let post = journal.find((p) => p.id == req.params.postId)
        let user = users.find((u) => u.id == post.userId)
        let mood = moods.find((m) => m.id == post.mood.moodId)
        entry.push({user: user, mood: mood.name.toLowerCase(), post: post})
        
        if (post) res.render("journal", {title: "", items: entry})
          else next();  
      
      })
    .delete((req, res, next) => {
        journal = journal.filter(entry => entry.id != req.params.postId)
        res.json({ success: true });
    })

        

module.exports = router;
