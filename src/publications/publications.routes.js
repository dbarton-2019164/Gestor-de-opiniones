import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { categoryExists, getCategories, publicationExists } from "../helpers/db-validator.js";
const router = Router();
import { publicationPOST, publicationPUT, publicationDELETE } from "./publications.controller.js"
router.post(
    "/",
    [
        validarJWT,
        check("title", "The name can't be empty").not().isEmpty(),
        check("category", "The category can't be empty").not().isEmpty(),
        check("category").custom(categoryExists),
        check("text", "The message can't be empty").not().isEmpty(),
        validarCampos,
    ],
    publicationPOST
)
router.get(
    "/",
    getCategories
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
        check("id").custom(publicationExists),
        validarCampos,
    ],
    publicationPUT
)


router.delete(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
        check("id").custom(publicationExists),
        validarCampos,
    ],
    publicationDELETE
)

export default router;