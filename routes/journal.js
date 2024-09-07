const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

let journal = require("../data/journal");
const moods = require("../data/moods");
const users = require("../data/users");
const error = require("../views/error");
const { route } = require("./moods");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router
    .route("/")
    .get((req, res, next) => {
      let formattedPosts = []
      let title = ""
      //
      if (req.query.mood) {
        let mood = moods.find((m) => m.name.toLowerCase() == req.query.mood)
        const moodPosts = journal.filter((j) => j.mood.moodId == mood.id)
        
        moodPosts.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), post: post})
        });
        title = mood.name
      } else if (req.query.username) {
        let user = users.find((u) => u.username == req.query.username)
        const usersPosts = journal.filter((j) => j.userId == user.id)
        
        usersPosts.forEach(post => {
          let mood = moods.find((m) => m.id == post.mood.moodId)
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), post: post})
        });
      } else {
        journal.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          let mood = moods.find((m) => m.id == post.mood.moodId)
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), post: post})
        });
      }
        if (formattedPosts) res.render("journal", {title: title, items: formattedPosts})
        else next();
});

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
