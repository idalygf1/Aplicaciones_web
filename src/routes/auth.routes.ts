import { Router } from "express";
import { getTimeToken, login, updateToken } from "../controllers/auth.controller";

const router = Router();

/*
utiliza el endpoint Login por medio de la ruta /login
*/
router.post('/login', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken); 

export default router;
