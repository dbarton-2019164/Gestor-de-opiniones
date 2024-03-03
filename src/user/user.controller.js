import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt.js"
import userModel from "./user.model.js";


export const registerUser = async (req, res) => {
    const { name, user, email, password } = req.body;
    try {
        
      const usuario = new userModel({ name, user, email, password});
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
      
      await usuario.save();
  
      res.status(200).json({
        usuario,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  



  export const loginUsers = async (req, res) => {
    const { user, password } = req.body;
     var token;
   
      var usuario = await userModel.findOne({ user: user });
      if (!usuario) {
        usuario = await userModel.findOne({ email : user });
        if (!usuario) {
          return res.status(400).json({
            msg: "The user was not found",
          });
        }
      }
      const acces = bcryptjs.compareSync(password, usuario.password);
      if (!acces) {
        return res.status(400).json({ msg: "Incorrect password" });
      }
       token = await generateJWT(usuario.id);
    
    res.status(200).json({
      msg: "Acceso concedido",
      token,
    });
  };