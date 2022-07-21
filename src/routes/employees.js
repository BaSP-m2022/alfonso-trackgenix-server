import express from 'express';
import employeeControllers from '../controllers/employees';
import employeeValidations from '../validations/employees';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .get('/', authMiddleware, employeeControllers.getAllEmployees)
  .post('/', employeeValidations.creationValidation, employeeControllers.createEmployee)
  .patch('/:id', employeeControllers.deleteEmployee)
  .put('/:id/project', employeeValidations.validateProjectAppend, employeeControllers.pushProject)
  .put('/:id/edit/project', employeeValidations.validateProjectAppend, employeeControllers.updatePushedProject)
  .put('/:id/project/:projid', employeeControllers.pullProject)
  .put('/:id', employeeValidations.updateValidation, employeeControllers.updateEmployee)
  .get('/:id', authMiddleware, employeeControllers.getEmployeeById);

export default router;
