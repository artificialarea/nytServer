const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const books = require('./books-data.js')

app.get('/books', (req, res) => {
  
  const { search = '' } = req.query; 
  
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

  res
    // .json(books);
    .json(results);
});

app.listen(8000, () => {
  console.log('Express Server running on PORT 8000...')
});