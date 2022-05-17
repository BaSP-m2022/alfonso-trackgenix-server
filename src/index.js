import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const URL = ('mongodb+srv://AlfonsoDalix:RadiumRocket@basp-tg.amp3e.mongodb.net/BaSP-TG?retryWrites=true&w=majority');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect(
  URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Fail to connect', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
