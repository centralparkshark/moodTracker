const express = require("express");
const router = express.Router();

const moods = require("../data/moods");
const journal = require("../data/journal");
const users = require("../data/users");
const error = require("../views/error");


router
  .route("/")
  .get((req, res) => {
    const links = moods.map(mood => ({
        href: `moods/${mood.id}`,
        rel: "self",
        type: "GET",
    }));

    const options = {
      title: "Moods",
      items: moods,
      _links: links,
    };
    res.render("data", options)
  })
router
    .route("/:name")
    .get((req, res, next) => { 
        let mood = moods.find((m) => m.name.toLowerCase() == req.params.name)
        const moodPosts = journal.filter((j) => j.mood.moodId == mood.id)

        let formattedPosts = []
        
        moodPosts.forEach(post => {
          let user = users.find((u) => u.id == post.userId)
          formattedPosts.push({user: user, mood: mood.name.toLowerCase(), post: post})
        });

        if (formattedPosts.length > 0) {
          const links = {
            self: {href: `/moods/${mood.id}`, method: "GET"},
            journal: { href: `/journal?mood=${mood.name.toLowerCase()}`, method: "GET" }
          }
          res.render("journal", {title: mood.name, items: formattedPosts, _links:links,})

        } else next();
});

router.use((req, res, next) => {
  next(error(404, "Resource Not Found")); // could render 404 page
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = router;
