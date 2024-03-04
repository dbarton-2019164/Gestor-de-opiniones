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

  export const editName = async (req, res) => {
    const  name  = req.body;
    const usuarioAutenticado = req.usuario;
      await userModel.findByIdAndUpdate(usuarioAutenticado.id, name);
    const userNew = await userModel.find({ _id : usuarioAutenticado.id });

    res.status(200).json({
      msg: "User updated successfully",
      userNew
    });
  };

  export const editPassword = async (req, res) => {
    const  {oldPassword, newPassword}  = req.body;
    const usuarioAutenticado = req.usuario;
    const jijijija = await userModel.findOne({ _id : usuarioAutenticado.id });
    const acces = bcryptjs.compareSync(oldPassword, jijijija.password);

    if(!acces){
     return res.status(400).json({
      msg: "Incorrect password"
     })
    }
    const salt = bcryptjs.genSaltSync();
    const finalPassword = bcryptjs.hashSync(newPassword, salt);
    await userModel.findByIdAndUpdate(usuarioAutenticado.id, {password : finalPassword});

    res.status(200).json({
      msg: "Password updated successfully",
  
    });
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
      msg: "access granted",
      token,
    });
  };