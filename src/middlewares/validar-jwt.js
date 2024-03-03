import  jwt  from "jsonwebtoken";
import adminModel from "../user/user.model.js";

export const validarJWT = async(req, res, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "The token is empty"
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await adminModel.findById(uid);
        
        if(!user){
            return res.status(401).json({
                msg: "The user was not found"
            });
        }

        if(!user.condition){
            return res.status(401).json({
                msg: "The user is disabled"
            });
        }

        req.user = user;

    }catch(error){
        console.log(e);
        res.status(401).json({
            msg: "Invalid token"
        })
    }
}