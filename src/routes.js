import { Router } from 'express';

// Controller
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = Router();

// USERS
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', authMiddleware, UserController.update);

// SESSIONS
routes.post('/sessions', SessionController.store);

export default routes;
