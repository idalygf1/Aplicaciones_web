import { Request, Response } from "express";
import { Order } from "../models/order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ message: "Orden creada", order });
  } catch (error) {
    res.status(500).json({ message: "Error al crear orden", error });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find();
  res.json({ orders });
};
