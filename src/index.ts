import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes';
import connectDBMongo from "./config/db";

const app = express(); // Express app
const PORT = 3000;

// Middlewares
app.use(express.json()); // JSON parser
app.use(morgan('dev')); // Logger

// Rutas
app.use('/api/auth', authRoutes);

// Conectar a MongoDB y levantar servidor
connectDBMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB");
  });
