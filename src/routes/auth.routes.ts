import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

/*
utiliza el endpoint Login por medio de la ruta /login
*/
router.post('/login', login);

export default router;
