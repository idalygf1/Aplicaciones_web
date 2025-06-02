// models/order.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  total: number;
  subtotal: number;
  status: boolean;
  createDate: Date;
  updateDate: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

export const Order = model<IOrder>("Order", orderSchema);
