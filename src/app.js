import express from "express";
import router from "./routes/index.js";

const app = express();

// Middleware para el manejo de solicitudes JSON
app.use(express.json());

// Middleware para el manejo de solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true }));

// Middleware principal para enrutar peticiones
app.use("/api", router);

// Iniciar el servidor y escuchar en el puerto 8080
app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
