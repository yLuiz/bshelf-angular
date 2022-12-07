import express from 'express';
import UserController from '../controller/userController';


const router = express();
const userController = new UserController();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;