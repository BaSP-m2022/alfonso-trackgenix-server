// use "import" to import libraries

import express from 'express';

// use "require" to import JSON files

import employees from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employees);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
