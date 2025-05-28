import { Router } from "express";
import {
  login,
  getTimeToken,
  updateToken,
  getAllUsers,
  getUserById,
  createUser
} from "../controllers/auth.controller";

const router = Router();

router.post('/login', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

export default router;
