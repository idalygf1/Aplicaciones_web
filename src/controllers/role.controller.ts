// src/controllers/role.controller.ts
import { Request, Response } from "express";
import { Role } from "../models/role";

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ message: "Rol creado", role });
  } catch (error) {
    res.status(500).json({ message: "Error al crear rol", error });
  }
};

export const getAllRoles = async (_req: Request, res: Response) => {
  const roles = await Role.find();
  res.json({ roles });
};
