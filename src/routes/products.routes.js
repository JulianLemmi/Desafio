import { Router } from "express";
import productManager from "../managers/productManager.js";

const router = Router();

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    res.status(500).json({ error: "Error al obtener todos los productos" });
  }
});

// Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener un producto por su ID:", error);
    res.status(500).json({ error: "Error al obtener un producto por su ID" });
  }
});

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar un nuevo producto:", error);
    res.status(500).json({ error: "Error al agregar un nuevo producto" });
  }
});

// Ruta para actualizar un producto existente por su ID
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updateProduct = await productManager.updateProduct(pid, product);
    res.status(201).json(updateProduct);
  } catch (error) {
    console.error("Error al actualizar un producto:", error);
    res.status(500).json({ error: "Error al actualizar un producto" });
  }
});

// Ruta para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar un producto:", error);
    res.status(500).json({ error: "Error al eliminar un producto" });
  }
});

export default router;
