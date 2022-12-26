import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validation from '../middlewares/user.middleware';

const router = Router();
const userController = new UserController();

router.post('/signup', validation, userController.signUp.bind(userController));
router.post('/signin', userController.signIn.bind(userController));

export default router;