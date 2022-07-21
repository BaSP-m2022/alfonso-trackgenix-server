import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .post('/', adminValidation.validateAdmin, adminsControllers.createAdmin)
  .patch('/:id', authMiddleware, adminsControllers.deleteAdmin)
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', authMiddleware, adminsControllers.getAdminById)
  .put('/:id', adminValidation.validateAdminUpd, adminsControllers.updateAdmin);

export default router;
