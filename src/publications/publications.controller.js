import { response, request } from "express";
import publicationsModel from "./publications.model.js";
import { categoryExists } from "../helpers/db-validator.js";
export const publicationPOST = async (req, res) => {
    const { title, category, text } = req.body;
    const usuarioAutenticado = req.usuario;
    try {
        const publication = new publicationsModel({ title, category, text, creator: usuarioAutenticado.id });
        await publication.save();
        res.status(200).json({
            msg: "successfully published",
            publication,
        });
    } catch (error) {
        res
            .status(500)
            .json({ msg: "error publishing", error: error.message });
    }
};
export const publicationPUT = async (req, res) => {
    const { id } = req.params;
    var { title, category, text } = req.body;
    const usuarioAutenticado = req.usuario;
    const publicationUser = await publicationsModel.findById(id);
    var c = true;
    
    if (publicationUser.creator.toString() !== usuarioAutenticado.id) {
        return res.status(400).json({
            msg: "You can't edit this post"
        });
    }
    if (!title) {
        title = publicationUser.title;
    }
    if (!category) {
        category = publicationUser.category;
        c = false;
    }
    if (c) {
        const categorias = [
            "Tecnología",
            "Ciencia",
            "Arte y Cultura",
            "Deportes",
            "Entretenimiento",
            "Negocios",
            "Política",
            "Salud",
            "Viajes",
            "Educación",
            "Estilo de Vida",
            "Gastronomía",
            "Medio Ambiente",
            "Moda",
            "Historia",
            "Religión",
            "Automóviles",
            "Música",
            "Literatura",
            "Humor",
        ];
        if (!categorias.includes(category)) {
            return res.status(404).json({
                msg: "Invalid category"
            });
        
          }
    }
    if (!text) {
        text = publicationUser.text
    }
    try {
        await publicationsModel.findByIdAndUpdate(id, { title, category, text });
        const newPublication = await publicationsModel.findById(id);
        res.status(200).json({
            msg: "Updated post",
            newPublication,
        });
    } catch (error) {
        res.status(500).json({ msg: "Error updating", error: error.message });
    }
};



export const publicationDELETE= async (req, res) => {
    const { id } = req.params;
    const usuarioAutenticado = req.usuario;
    const publicationUser = await publicationsModel.findById(id);
   
    if (publicationUser.creator.toString() !== usuarioAutenticado.id) {
        return res.status(400).json({
            msg: "You can't delete this post"
        });
    }
 
    try {
        await publicationsModel.findByIdAndUpdate(id, { condition : false });
       
        res.status(200).json({
            msg: "Deleted post",
        });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting", error: error.message });
    }
};
