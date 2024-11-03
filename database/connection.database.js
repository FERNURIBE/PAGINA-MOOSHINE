// Importamos el módulo dotenv para manejar variables de entorno desde un archivo .env
import 'dotenv/config';

// Importamos el cliente pg para conectar con PostgreSQL
import pg from 'pg';


const { Pool } = pg;

// Configuramos la URL de conexión a la base de datos, obteniéndola desde las variables de entorno, que estan en nuestro archivo .env
const connectionString = process.env.DATABASE_URL;

// Creamos una instancia de Pool para gestionar las conexiones a la base de datos
export const db = new Pool({
    allowExitOnIdle: true, 
    connectionString       
});

// Tenemos este try catch para verificar la conexión a la base de datos
try {
    await db.query('SELECT NOW()'); 
    console.log('DATABASE connected'); // Mostramos un mensaje de éxito en la conexión
} catch (error) {
    console.log(error); // Mostramos el error si falla la conexión
}
