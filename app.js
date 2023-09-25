const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .set('strictQuery', false)
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
