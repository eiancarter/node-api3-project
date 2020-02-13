const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  const pagination = req.query;

  Posts.get(pagination)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'error retrieving posts'})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found'})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'error retrieving that post'
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'the post is gone' })
      } else {
        res.status(404).json({ message: 'cant delete' })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'error deleting'})
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'the post cant be edited'})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'error updating'})
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
