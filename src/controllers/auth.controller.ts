import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToke";
import dayjs from "dayjs";
import cache from "../utils/cache";
import { User } from "../models/user";

// LOGIN
export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "12345") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const userId = "123456789";
  const accessToken = generateAccessToken(userId);
  cache.set(userId, accessToken, 60 * 15); // 15 minutos

  return res.json({
    message: "Login exitoso",
    accessToken,
  });
};

// GET TTL TOKEN
export const getTimeToken = (req: Request, res: Response) => {
  const { userId } = req.params;
  const ttl = cache.getTtl(userId);

  if (!ttl) return res.status(404).json({ message: "Token no encontrado" });

  const now = Date.now();
  const timeToLiveSeconds = Math.floor((ttl - now) / 1000);
  const expTime = dayjs(ttl).format("HH:mm:ss");

  return res.json({
    message: "Token activo",
    expiraEn: `${timeToLiveSeconds} segundos`,
    horaExpiracion: expTime,
  });
};

// UPDATE TTL TOKEN
export const updateToken = (req: Request, res: Response) => {
  const { userId } = req.params;
  const ttl = cache.getTtl(userId);
  if (!ttl) return res.status(404).json({ message: "Token no encontrado" });

  const token = cache.get(userId);
  if (!token) return res.status(404).json({ message: "No se encontró el token" });

  const newTTL = 60 * 15;
  cache.set(userId, token, newTTL);

  return res.json({ message: "Token actualizado", nuevoTTL: `${newTTL} segundos` });
};

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  const userList = await User.find();
  return res.json({ userList });
};

// GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ user });
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error al buscar usuario", error });
  }
};

// CREATE USER
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};
