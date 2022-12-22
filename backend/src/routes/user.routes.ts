import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validation from '../middlewares/user.middleware';

const router = Router();
const userController = new UserController();

router.post('/', validation, userController.create.bind(userController));
router.get('/:id');
export default router;