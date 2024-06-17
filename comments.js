//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//Read comments from file
app.use(bodyParser.json());
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const comments = JSON.parse(data);
      res.json(comments);
    }
  });
});

//Add comment to file
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments, null, 2), err => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        }
      });
    }
  });
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});