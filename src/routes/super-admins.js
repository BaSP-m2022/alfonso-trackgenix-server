import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidation from '../validations/super-admins';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperA)
  .get('/:id', authMiddleware, superAdminControllers.getSuperAById)
  .post('/', superAdminValidation.validateCreation, superAdminControllers.createSuperAdmin)
  .patch('/:id', authMiddleware, superAdminControllers.deleteSuperAdmin)
  .put('/:id', superAdminValidation.validateUpdate, superAdminControllers.updateSuperAdmin);

export default router;
