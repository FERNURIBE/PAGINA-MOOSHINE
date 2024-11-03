import { db } from '../database/connection.database.js';

// Función para crear un nuevo usuario en la base de datos
const create = async ({ nombre, email, password }) => {
    const query = {
        // Definimos la consulta SQL para insertar un nuevo usuario
        text: `
        INSERT INTO usuarios(nombre, email, password)
        VALUES ($1, $2, $3)
        RETURNING email, nombre, id_usuario
        `,
        values: [nombre, email, password]
    };

    // Ejecutamos la consulta en la base de datos
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para encontrar un usuario por email
const findOneByEmail = async (email) => {
    const query = {
        // Definimos la consulta SQL para buscar un usuario por su email
        text: `
        SELECT * FROM usuarios
        WHERE email = $1
        `,
        values: [email] 
    };

    // Ejecutamos la consulta en la base de datos
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Exportamos las funciones para su uso en otros módulos
export { create, findOneByEmail };





export const UserModel ={
    create,
    findOneByEmail
}