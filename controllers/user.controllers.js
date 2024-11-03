import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { UserModel } from '../models/user.model.js'; 

// Función de registro de usuarios - Ruta: /api/v1/users/signup
const signup = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        //Aqui tendremos algunas validaciones para el registro

        // Validación de campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Faltan campos obligatorios: email, contraseña, nombre" });
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ ok: false, msg: "Email no válido" });
        }

        // Verificar si el usuario ya existe
        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(409).json({ ok: false, msg: "El email ya existe" });
        }

        // Validación de longitud y caracteres en el nombre
        if (nombre.length < 2) {
            return res.status(400).json({ ok: false, msg: "El nombre debe tener al menos 2 caracteres" });
        }
        const nombreRegex = /^[A-Za-z\s]+$/;
        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ ok: false, msg: "El nombre solo puede contener letras y espacios" });
        }

        //  se hace la validación de la fortaleza de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ ok: false, msg: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número" });
        }

        // Encriptamos la contraseña antes de guardarla
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);

        // Creamo el usuario en la base de datos
        const newUser = await UserModel.create({ nombre, email, password: hashedpassword });

        // Aqui la generación de un token JWT para el usuario registrado
        const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({ ok: true, msg: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        });
    }
};

// Función de inicio de sesión de usuarios - Ruta: /api/v1/users/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tenemos la validación de campos obligatorios
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan campos obligatorios: email, contraseña" });
        }

        // Se verifica si el usuario existe en la base de datos
        const user = await UserModel.findOneByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Se compara la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Tenemos la generación de un token JWT si las credenciales son correctas
        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ ok: true, msg: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        });
    }
};

// Exportamos el controlador de usuario con sus funciones de registro e inicio de sesión
export const UserController = {
    signup,
    login
};
