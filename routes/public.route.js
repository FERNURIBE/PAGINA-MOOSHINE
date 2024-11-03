// Importamos Router de Express para definir las rutas y path para manejar rutas de archivos
import { Router } from "express";
import path from "path";

// Creamos una instancia de Router
const router = Router();

// Definimos el directorio de archivos públicos
const __dirname = import.meta.dirname;
const publicPath = path.join(__dirname, "../public");

// Ruta para servir la página de login
router.get('/login', (req, res) => {
    res.sendFile(publicPath + "/login.html");
});

// Ruta para servir la página de registro (signup)
router.get('/signup', (req, res) => {
    res.sendFile(publicPath + "/signup.html");
});

// Exportamos el router para manejar rutas de archivos estáticos en el servidor principal
export default router;
