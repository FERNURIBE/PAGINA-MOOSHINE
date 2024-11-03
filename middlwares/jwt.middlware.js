// aqui tenemos el middleware que protege rutas, asegurándose de que solo usuarios con un token válido puedan acceder a ellas.

import jwt from 'jsonwebtoken'

 const verifyToken = (req, res, next) => {

    let token = req.headers.authorization

    if(!token){
        return res.status(401).json ({error: "Token no proporcionado"});
    }

    token  = token.split(" ")[1]

    try {
        
        const {email} = jwt.verify(token, process.env.JWT_SECRET)
        req.email = email
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Token invalido"});
    }


   
}

export const VerifyToken ={
    verifyToken

};