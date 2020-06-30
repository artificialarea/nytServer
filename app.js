const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // SCHWEET!!

const app = express();

app.use(morgan('dev')); // tutorial suggests 'common' format
app.use(cors());

const books = require('./books-data.js')

app.get('/books', (req, res) => {
  
  const { search = '', sort } = req.query; 

  if (sort) {
    if (!['title', 'rank'].includes(sort)) {
      return res  
      .status(400)
      .send('Sort must be one of title or rank')
    }
  }

  // ^^^^ setting default query parameter for search.
  // Then we can implement a filter function on books. To make the search case insensitive lowercase the title and the search before comparison. The includes() method of String used like this:
  // str.includes(searchString)

  let results = books
    .filter(book =>      // NOTE the filter + includes method combo
      book 
        .title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // I must revisit the a,b sorting logic, eh?
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      // return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0; // reversed
    }); 
  }

  res
    .json(results);
    // .json(books);
});

module.exports = app;

// to prepare the app for testing, need to
// seperate the server controller code 
// from the application code (everything else)
// by placing the app.listen controller code in a seperate file (server.js)
//
// app.listen(8000, () => {
//   console.log('Server listening on PORT 8000...')
// })