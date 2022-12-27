import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validation from '../middlewares/user.middleware';
import auth from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

router.post('/signup', validation, userController.signUp.bind(userController));
router.post('/signin', userController.signIn.bind(userController));
router.get('/:id', auth, userController.getUserAccount.bind(userController));
router.post('/:id/transaction', auth, userController.newTransaction.bind(userController));
router.get('/:id/transactions', auth, userController.getTransactionsById.bind(userController));

export default router;