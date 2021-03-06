import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .post('/', projectValidations.validateCreation, projectControllers.createProject)
  .patch('/:id', projectControllers.deleteProject)
  .put('/:id/employee', projectValidations.validateTeamAppend, projectControllers.pushEmployee)
  .put('/:id/task', projectValidations.validateTaskAppend, projectControllers.pushTask)
  .put('/:id/edit/employee', projectValidations.validateTeamAppend, projectControllers.updatePushedemployee)
  .put('/:id', projectValidations.validateModification, projectControllers.updateProject)
  .get('/', projectControllers.getAllProjects)
  .put('/:id/employee/:empid', projectControllers.pullEmployee)
  .put('/:id/task/:taskid', projectControllers.pullTask)
  .get('/:id', projectControllers.getProjectById);

export default router;
