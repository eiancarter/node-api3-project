const express = require('express');
const Users = require('./userDb');
const router = express.Router();
const Posts = require("../posts/postDb");

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'error posting user'})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
   const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error posting to user"
      });
    });
   
});

router.get('/', (req, res) => {
  // do your magic!
  console.log("headers", req.headers);

  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error retrieving users" })
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error get posts from user"
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: "the user is gone gone gone" });
      } else {
        res.status(404).json({ message: "user cannot be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error removing user" })
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const changes = req.body;
  Users.update(req.params.id, changes)
    .then(count => {
      if(count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "the user cannot be found" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error updating user" })
    });
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "error retrieving that user id" })
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  if (body && body.name) {
    next();
  } else if (!body) {
    res.status(400).json({ message: "missing user data"})
  } else {
    res.status(400).json({ message: "missing name field"})
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if (body && body.text) {
    req.post = body;
    next();
  } else if (!body) {
    res.status(400).json({ message: "missing post data" })
  } else {
    res.status(400).json({ message: "missing required text field" })
  }
}

module.exports = router;
