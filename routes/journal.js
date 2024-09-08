const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

let journal = require("../data/journal");
const moods = require("../data/moods");
const users = require("../data/users");
const error = require("../views/error");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const formatPosts = (posts) => {
  return posts.map(post => {
    let user = users.find((u) => u.id == post.userId);
    let mood = moods.find((m) => m.id == post.mood.moodId);
    return {
      user,
      mood: mood.name.toLowerCase(),
      post: post,
      links: [
        {rel: "self", href: `/journal/${post.id}`},
        {rel: "user", href: `/users/${user.id}`},
        {rel: "mood", href: `/moods/${mood.id}`},
      ]
    }
  })
}

router
    .route("/")
    .get((req, res, next) => {
      let filteredPosts = []
      let title = ""
      //
      if (req.query.mood) {
        let mood = moods.find((m) => m.name.toLowerCase() == req.query.mood)
        if (mood) {
          const moodPosts = journal.filter((j) => j.mood.moodId == mood.id)
          filteredPosts = formatPosts(moodPosts)
          title = mood.name
        } else {
          return next();
        }
      } else if (req.query.username) {
        let user = users.find((u) => u.username == req.query.username)
        if (user) {
          const usersPosts = journal.filter((j) => j.userId == user.id)
          filteredPosts = formatPosts(usersPosts)
        } else {
          return next();
        }
      } else {
        filteredPosts = formatPosts(journal);
      }
    res.render("journal", {title, items: filteredPosts})
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
        let post = journal.find((p) => p.id == req.params.postId)
        if (post) {
          let user = users.find((u) => u.id == post.userId)
          let mood = moods.find((m) => m.id == post.mood.moodId)
          res.render("journal", {
            title: "",
            items: [{
              user,
              mood: mood.name.toLowerCase(),
              post: {
                ...post,
                links: [
                  {rel: 'self', href: `/journal/${post.id}`},
                  {rel: 'user', href: `/users/${user.id}`},
                  {rel: 'mood', href: `/moods/${mood.id}`},
                ]
              }
            }]
          })
        } else {
          next();
        }
      
      })
    .delete((req, res, next) => {
        journal = journal.filter(entry => entry.id != req.params.postId)
        res.json({ success: true });
    })

    router.use((req, res, next) => {
      next(error(404, "Resource Not Found")); // could render 404 page
    });
    router.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({ error: err.message });
    });


module.exports = router;
