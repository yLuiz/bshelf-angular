import isAuthenticated from '@shared/http/middleware/isAuthenticated';
import { Router } from 'express';
import express from 'express';
import BookController from '../controller/bookController';
import uploadConfig from '@cofing/upload';
import multer from 'multer';

const bookRouter = Router();
const router = express();
const bookController = new BookController();
const upload = multer(uploadConfig)

router.get('/', isAuthenticated, bookController.index);
router.get('/user', isAuthenticated, bookController.showUserBooks)
router.get('/:id', isAuthenticated, bookController.show);
router.post('/',isAuthenticated, upload.single('image') ,bookController.create);
router.put('/:id', isAuthenticated, upload.single('image'), bookController.update);
router.delete('/:id', isAuthenticated, bookController.delete);

export default router;