import express from 'express';
import BookController from '../controller/bookController';

const router = express();
const bookController = new BookController();

router.get('/', bookController.index);
router.get('/:id', bookController.show);
router.post('/', bookController.create);
router.patch('/:id', bookController.update);
router.delete('/:id', bookController.delete);

export default router;