import express from 'express';
import employees from './resources/employees';
import timesheets from './resources/time-sheets';
import admins from './resources/admins';
import projects from './resources/projects';
import tasks from './resources/tasks';
import superAdminsRouter from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employees);
app.use('/superAdmin', superAdminsRouter);
app.use('/admins', admins);
app.use('/projects', projects);
app.use('/tasks', tasks);
app.use('/time-sheets', timesheets);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
