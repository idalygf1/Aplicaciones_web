import { Router } from "express";
import {
  login,
  getTimeToken,
  updateToken,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller";

import {
  createRole,
  getAllRoles
} from "../controllers/role.controller";

import {
  createOrder,
  getAllOrders
} from "../controllers/order.controller";

const router = Router();

// Rutas de autenticación y usuarios
router.post('/login', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Rutas de roles
router.post("/roles", createRole);
router.get("/roles", getAllRoles);

// Rutas de órdenes
router.post("/orders", createOrder);
router.get("/orders", getAllOrders);

export default router;
