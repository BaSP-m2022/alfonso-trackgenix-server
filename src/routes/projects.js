import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .post('/', projectValidations.validateCreation, projectControllers.createProject)
  .delete('/:id', projectControllers.deleteProject)
  .put('/:id', projectValidations.validateModification, projectControllers.updateProject)
  .get('/', projectControllers.getAllProjects)
  .get('/:id', projectControllers.getProjectById);

export default router;
