import JogoController from "../controllers/jogo.controller.js";
import { Router } from "express";

const router = Router();
router.get("/buscar", JogoController.buscar);
router.get("/:idIGDB", JogoController.getJogo);

export default router;