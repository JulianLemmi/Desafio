import { Router } from "express";
import cartManager from "../managers/cartManager.js";

const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error al crear un nuevo carrito:", error);
    res.status(500).json({ error: "Error al crear un nuevo carrito" });
  }
});

// Ruta para agregar un producto a un carrito existente
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductToCart(cid, pid);
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error al agregar un producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar un producto al carrito" });
  }
});

// Ruta para obtener un carrito por su ID
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error al obtener el carrito por su ID:", error);
    res.status(500).json({ error: "Error al obtener el carrito por su ID" });
  }
});

export default router;
