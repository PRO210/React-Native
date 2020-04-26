import { Router } from 'express';
import multer from 'multer';
import multerUpImgUsers from './app/middlewares/uploadImgUser';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import PerfilController from './app/controllers/PerfilController';
import PerfilImagemController from './app/controllers/PerfilImagemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploadImgUser = multer(multerUpImgUsers);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.get('/perfil', authMiddleware, PerfilController.show);
routes.put('/perfil', authMiddleware, PerfilController.update);
routes.put('/perfil-img', authMiddleware, uploadImgUser.single('file'),  PerfilImagemController.update);

routes.post('/login', LoginController.store);

export default routes;
