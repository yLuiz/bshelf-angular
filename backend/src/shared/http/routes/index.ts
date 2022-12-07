import bookRouter from '@modules/book/routes/book.routes';
import sessionRouter from '@modules/user/routes/session.routes';
import userRouter from '@modules/user/routes/user.routes';
import express from 'express';

const routes = express();

routes.use('/book', bookRouter)
routes.use('/user', userRouter)
routes.use('/session', sessionRouter)


export default routes;