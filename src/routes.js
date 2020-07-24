import { Router } from 'express';
import multer from 'multer';

// Configs
import multerConfig from './config/multer';

// Controller
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

// USERS
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// SESSIONS
routes.post('/sessions', SessionController.store);

// Middleware USE
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// PROVIDER
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// SCHEDULE
routes.get('/schedules', ScheduleController.index);

// APPOINTMENT
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// NOTIFICATION
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Uploads Storage route
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
