import { db } from '../database/connection.database.js';

// Función para reducir el stock de un producto
const reduceStock = async (id_producto, stock) => {
    const query = {
        text: `
            UPDATE productos
            SET stock = stock - $1
            WHERE id_producto = $2 AND stock >= $1
        `,
        values: [stock, id_producto]
    };

    // Ejecutamos la consulta en la base de datos y obtenemos los resultados
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Exportamos el modelo de órdenes con la función reduceStock
export const OrderModel = {
    reduceStock
};
