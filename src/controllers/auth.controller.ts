import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToke";
import dayjs from "dayjs";
import cache from "../utils/cache";


export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "12345") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const userId = "123456789";
  const accessToken = generateAccessToken(userId);

  // Guardar en cache por 15 minutos
  cache.set(userId, accessToken, 60 * 15);

  return res.json({
    message: "Login exitoso",
    accessToken,
  });
};


export const getTimeToken = (req: Request, res: Response) => {
  const { userId } = req.params;

  const ttl = cache.getTtl(userId);

  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const now = Date.now();
  const timeToLiveSeconds = Math.floor((ttl - now) / 1000);
  const expTime = dayjs(ttl).format("HH:mm:ss");

  return res.json({
    message: "Token activo",
    expiraEn: `${timeToLiveSeconds} segundos`,
    horaExpiracion: expTime,
  });
};


export const updateToken = (req: Request, res: Response) => {
  const { userId } = req.params;

  const ttl = cache.getTtl(userId);
  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const token = cache.get(userId);
  if (!token) {
    return res.status(404).json({ message: "No se encontró el token para actualizar" });
  }

  const newTTL = 60 * 15; // 15 minutos
  cache.set(userId, token, newTTL);

  return res.json({
    message: "Token actualizado",
    nuevoTTL: `${newTTL} segundos`,
  });
};
