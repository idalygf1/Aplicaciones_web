import express from "express";
import morgan from "morgan";
import connectDBMongo from "./config/db";

// Importar rutas
import authRoutes from "./routes/auth.routes";
import roleRoutes from "./routes/role.routes";
import orderRoutes from "./routes/order.routes";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/orders", orderRoutes);

// Conexión y servidor
connectDBMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB", error);
  });
