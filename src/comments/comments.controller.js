import { response, request } from "express";
import commentsModel from "./comments.model.js";
import publicationsModel from "../publications/publications.model.js";


export const commentPOST = async (req, res) => {
  
    try {
        const { id } = req.params;
        const { text } = req.body;
        const usuarioAutenticado = req.usuario;
        const comentario = new commentsModel({ comment: text , creator: usuarioAutenticado.id });
        await comentario.save();


        const publicacion = await publicationsModel.findById(id);
        
        await publicacion.addCommentById(comentario._id); 


        res.status(200).json({
            msg: "posted comment",
            comentario,
        });
    } catch (error) {
        res
            .status(500)
            .json({ msg: "error publishing", error: error.message });
    }
};


export const commentPUT= async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const usuarioAutenticado = req.usuario;
    const commentnUser = await commentsModel.findById(id);
   
  
    if (commentnUser.creator.toString() !== usuarioAutenticado.id) {
        return res.status(400).json({
            msg: "You can't edit this comment"
        });
    }
 
    try {
        await commentsModel.findByIdAndUpdate(id, { comment : text });
       
        res.status(200).json({
            msg: "Updated comment",
        });
    } catch (error) {
        res.status(500).json({ msg: "Error updating", error: error.message });
    }
};


export const commentDELETE= async (req, res) => {
    const { id } = req.params;
    const usuarioAutenticado = req.usuario;
    const commentnUser = await commentsModel.findById(id);
   
    if (commentnUser.creator.toString() !== usuarioAutenticado.id) {
        return res.status(400).json({
            msg: "You can't delete this comment"
        });
    }
 
    try {
        await commentsModel.findByIdAndUpdate(id, { condition : false });
       
        res.status(200).json({
            msg: "Deleted comment",
        });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting", error: error.message });
    }
};
