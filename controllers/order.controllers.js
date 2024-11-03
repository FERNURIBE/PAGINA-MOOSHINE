import { OrderModel } from '../models/order.model.js';

// Función para procesar la compra de productos
const buy = async (req, res) => {
    try {
        const { productos } = req.body; 

        for (const item of productos) { 
            const { id_producto, stock } = item;

            // Lógica para reducir la cantidad del producto
            await OrderModel.reduceStock(id_producto, stock);
        }

        // Aquí tenemos la respuesta exitosa si el pedido fue completado
        return res.status(200).json({
            ok: true,
            msg: 'Pedido completado'
        });
    } catch (error) {
        // Se captura algún error que suceda en el servidor
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error del servidor'
        });
    }
};

export const OrderController = {
    buy
};
