// endpoint recibe un request, responde un response
import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToke"; // Asegúrate que el archivo se llame así
import dayjs from "dayjs";
import cache from "../utils/cache"; // Asegúrate de tener esta importación correctamente configurada

export const login = (req: Request, res: Response) => {
  let number: number = 1;

  const { username, password } = req.body;

  if (username !== "admin" || password !== "12345") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const userId = "123456789";
  const accessToken = generateAccessToken(userId);

  cache.set(userId, accessToken, 60 * 15); // 15 minutos en segundos

  return res.json({
    message: "Login exitoso",
    accessToken
  });
};

export const getTimeToken = (req: Request, res: Response) => {
  const userId = "123456789";
  const ttl = cache.getTtl(userId); // Tiempo de expiración en ms

  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const now = Date.now();
  const timeToLiveSeconds = Math.floor((ttl - now) / 1000);
  const expTime = dayjs(ttl).format('HH:mm:ss');

  return res.json({
    message: "Token activo",
    expiraEn: `${timeToLiveSeconds} segundos`,
    horaExpiracion: expTime
  });
};
