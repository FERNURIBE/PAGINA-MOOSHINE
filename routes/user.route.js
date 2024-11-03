
import { Router } from "express";
import { UserController } from "../controllers/user.controllers.js";
//import { VerifyToken } from "../middlewares/jwt.middleware.js";

// Creamos una instancia de Router
const router = Router();

// Ruta para registrar un nuevo usuario (signup), llamando a la función signup del UserController
router.post('/signup', UserController.signup);

// Ruta para iniciar sesión (login), llamando a la función login del UserController
router.post('/login', UserController.login);

// Exportamos el router para usarlo en el servidor principal
export default router;
