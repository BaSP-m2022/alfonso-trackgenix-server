import express from 'express';
import admins from './admins';
import projects from './projects';
import tasks from './tasks';
import superAdmins from './super-admins';
import employees from './employees';
import timeSheets from './time-sheets';
import signup from './auth';

const router = express.Router();

router.use('/admins', admins);
router.use('/projects', projects);
router.use('/tasks', tasks);
router.use('/super-admins', superAdmins);
router.use('/employees', employees);
router.use('/time-sheets', timeSheets);
router.use('/register', signup);

export default router;
