import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';
import authMiddleware from '../validations/auth';

const router = express.Router();

router

  .post('/', authMiddleware, projectValidations.validateCreation, projectControllers.createProject)
  .patch('/:id', authMiddleware, projectControllers.deleteProject)
  .put('/:id/employee', projectValidations.validateTeamAppend, projectControllers.pushEmployee)
  .put('/:id/task', projectValidations.validateTaskAppend, projectControllers.pushTask)
  .put('/:id/edit/employee', projectValidations.validateTeamAppend, projectControllers.updatePushedemployee)
  .put('/:id', authMiddleware, projectValidations.validateModification, projectControllers.updateProject)
  .get('/', authMiddleware, projectControllers.getAllProjects)
  .put('/:id/employee/:empid', projectControllers.pullEmployee)
  .put('/:id/task/:taskid', projectControllers.pullTask)
  .get('/:id', authMiddleware, projectControllers.getProjectById);

export default router;
