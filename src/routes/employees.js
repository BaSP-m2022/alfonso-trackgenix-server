import express from 'express';
import employeeControllers from '../controllers/employees';
import employeeValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeeControllers.getAllEmployees)
  .get('/:id', employeeControllers.getEmployeeById)
  .post('/', employeeValidations.creationValidation, employeeControllers.createEmployee)
  .delete('/:id', employeeControllers.deleteEmployee);

export default router;