const express = require('express');
const server = express();

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);
 
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl}`)
  next();
}

module.exports = server;
