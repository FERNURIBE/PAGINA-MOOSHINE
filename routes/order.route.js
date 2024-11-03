import { Router } from 'express';
import { OrderController } from '../controllers/order.controllers.js';

// Creamos una instancia de Router
const router = Router();

// Tenemos la ruta para procesar la compra llamando a la función `buy` en OrderController
router.post('/buy', OrderController.buy);

// Exportamos el router 
export default router;
