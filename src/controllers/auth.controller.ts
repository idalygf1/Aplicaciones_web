// endpoint recibe un request, responde un response
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  // asignar tipo de dato después de :
  // inicializar variable después del =
  let number: number = 1;

  // dentro del body del request buscar las variables de username y password
  const { username, password } = req.body;

  if (username !== "admin" || password !== "1234") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  return res.json({message: "Login exitoso"});
};
