import { Router } from 'express';
import SessionController from '../controller/sessionController';

const sessionsRouter = Router();
const SessionsController = new SessionController();

sessionsRouter.post(
  '/',
  SessionsController.execute
);

export default sessionsRouter;