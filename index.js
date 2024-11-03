import 'dotenv/config';
import express from 'express';


import userRouter from './routes/user.route.js';
import publicRouter from './routes/public.route.js';
import orderRouter from './routes/order.route.js';
import path from 'path';

// Creamos una instancia de la aplicación Express
const app = express();

// Aqui tenemos el middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/imagenes', express.static(path.join(process.cwd(), 'imagenes')));

// Configuramos las rutas de la aplicación
app.use('/', publicRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

// Establecemos el puerto en el que escuchará el servidor
const PORT = process.env.PORT || 3002;

// Iniciamos el servidor y escuchamos en el puerto def
app.listen(PORT, () => console.log('Servidor andando en ' + PORT));
