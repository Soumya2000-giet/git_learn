const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/create-post', (req, res) => {
  const { link, description } = req.body;
  posts.push({ link, description, comments: [] });
  res.json(posts);
});

app.post('/comment', (req, res) => {
  const { postIndex, comment } = req.body;
  if (posts[postIndex]) {
    posts[postIndex].comments.push(comment);
  }
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
