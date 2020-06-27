const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/books', (req, res) => {
  // to be or not to be, that is the question
})

app.listen(8000, () => {
  console.log('Express Server running on PORT 8000...')
})