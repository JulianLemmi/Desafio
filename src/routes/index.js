import { Router } from "express";
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";

const router = Router();

// Rutas para gestionar productos
router.use("/products", productsRouters);

// Rutas para gestionar carritos
router.use("/carts", cartsRouters);

export default router;
