// Importamos Router de Express y el DAO (Data Access Object) para el carrito
import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";

// Creamos una nueva instancia del router
const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    // Llamamos a la función de creación del DAO para el carrito
    const cart = await cartDao.create();

    // Enviamos una respuesta exitosa con el carrito creado
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Ruta para añadir un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtenemos los IDs del carrito y del producto desde los parámetros de la URL
    const { cid, pid } = req.params;
    // Llamamos a la función del DAO para añadir el producto al carrito
    const cart = await cartDao.addProductToCart(cid, pid);
    
    // Verificamos si el producto o el carrito no fueron encontrados y enviamos una respuesta de error apropiada
    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    // Enviamos una respuesta exitosa con el carrito actualizado
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Ruta para actualizar la cantidad de un producto en un carrito
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtenemos los IDs del carrito y del producto desde los parámetros de la URL, y la cantidad desde el cuerpo de la solicitud
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    // Llamamos a la función del DAO para actualizar la cantidad del producto en el carrito
    const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);
    // Verificamos si el producto o el carrito no fueron encontrados y enviamos una respuesta de error apropiada
    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    // Enviamos una respuesta exitosa con el carrito actualizado
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Ruta para eliminar un producto de un carrito
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtenemos los IDs del carrito y del producto desde los parámetros de la URL
    const { cid, pid } = req.params;
    // Llamamos a la función del DAO para eliminar el producto del carrito
    const cart = await cartDao.deleteProductInCart(cid, pid);
    // Verificamos si el producto o el carrito no fueron encontrados y enviamos una respuesta de error apropiada
    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    // Enviamos una respuesta exitosa con el carrito actualizado
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Ruta para obtener un carrito por su ID
router.get("/:cid", async (req, res) => {
  try {
    // Obtenemos el ID del carrito desde los parámetros de la URL
    const { cid } = req.params;
    // Llamamos a la función del DAO para obtener el carrito por su ID
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    // Enviamos una respuesta exitosa con el carrito encontrado
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Ruta para actualizar un carrito con nuevos datos
router.put("/:cid", async (req, res) => {
  try {
    // Obtenemos el ID del carrito desde los parámetros de la URL y los datos del cuerpo de la solicitud
    const { cid } = req.params;
    const body = req.body;

    // Llamamos a la función del DAO para actualizar el carrito con los nuevos datos
    const cart = await cartDao.update(cid, body);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
    // Enviamos una respuesta exitosa con el carrito actualizado
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Ruta para eliminar todos los productos de un carrito
router.delete("/:cid", async (req, res) => {
  try {
    // Obtenemos el ID del carrito desde los parámetros de la URL
    const { cid } = req.params;
   
    // Llamamos a la función del DAO para eliminar todos los productos del carrito
    const cart = await cartDao.deleteAllProductsInCart(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
    // Enviamos una respuesta exitosa con el carrito actualizado
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    // Capturamos y mostramos cualquier error, enviando una respuesta de error del servidor
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Exportamos el router para que pueda ser utilizado en otras partes del proyecto
export default router;
