import express from 'express'
import bookRouter from '@modules/book/routes/book.routes';
import { Request, Response } from 'express'
import { Book } from '@modules/book/model/Book.model'


/* ---------- ROTA DE CRIAÇÃO ---------- */
const routes = express();

routes.use('/book', bookRouter)

export default routes;