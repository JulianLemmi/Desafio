import { Router } from "express"; // Importa el módulo Router de Express
import cartDao from "../dao/mongoDao/cart.dao.js"; // Importa el objeto cartDao que contiene métodos para interactuar con la base de datos
const router = Router(); // Crea una nueva instancia de Router

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartDao.create(); // Llama al método create de cartDao para crear un nuevo carrito

    res.status(201).json({ status: "success", payload: cart }); // Responde con un estado 201 (creado) y el carrito creado
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

// Ruta para añadir un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params; // Extrae los parámetros cid (ID del carrito) y pid (ID del producto) de la URL
    const cart = await cartDao.addProductToCart(cid, pid); // Llama al método addProductToCart de cartDao para añadir el producto al carrito

    // Verifica si el producto no se encontró
    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    // Verifica si el carrito no se encontró
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    res.status(200).json({ status: "success", payload: cart }); // Responde con un estado 200 (éxito) y el carrito actualizado
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

// Ruta para obtener un carrito específico por su ID
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params; // Extrae el parámetro cid (ID del carrito) de la URL
    const cart = await cartDao.getById(cid); // Llama al método getById de cartDao para obtener el carrito por su ID
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` }); // Verifica si el carrito no se encontró

    res.status(200).json({ status: "success", payload: cart }); // Responde con un estado 200 (éxito) y el carrito encontrado
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

export default router; // Exporta el router para que pueda ser utilizado en otros módulos
