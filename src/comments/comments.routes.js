import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { publicationExists, commentExists} from "../helpers/db-validator.js";
const router = Router();
import { commentPOST, commentPUT, commentDELETE } from "./comments.controller.js"
router.post(
    "/:id",
    [
        check("id").isMongoId(),
        check("id").custom(publicationExists),
        validarJWT,
        check("text", "The comment can't be empty").not().isEmpty(),
        validarCampos,
    ],
    commentPOST
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
        check("id").custom(commentExists),
        check("text", "The comment can't be empty").not().isEmpty(),
        validarCampos,
    ],
    commentPUT
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
        check("id").custom(commentExists),
        validarCampos,
    ],
    commentDELETE
);

export default router;