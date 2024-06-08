import { Router } from "express";  // Importa el Router de Express
import cartDao from "../dao/mongoDao/cart.dao.js";  // Importa el Data Access Object (DAO) para los carritos

const router = Router();  // Crea una nueva instancia del Router de Express

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartDao.create();  // Crea un nuevo carrito en la base de datos

    res.status(201).json({ status: "success", payload: cart });  // Devuelve el nuevo carrito creado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;  // Obtiene el ID del carrito y del producto de los parámetros de la URL
    const cart = await cartDao.addProductToCart(cid, pid);  // Añade el producto al carrito

    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });  // Si no se encuentra el producto, devuelve un error 404
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });  // Si no se encuentra el carrito, devuelve un error 404

    res.status(200).json({ status: "success", payload: cart });  // Devuelve el carrito actualizado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para actualizar la cantidad de un producto en un carrito
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;  // Obtiene el ID del carrito y del producto de los parámetros de la URL
    const { quantity } = req.body;  // Obtiene la nueva cantidad del producto del cuerpo de la solicitud
    
    const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);  // Actualiza la cantidad del producto en el carrito

    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });  // Si no se encuentra el producto, devuelve un error 404
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });  // Si no se encuentra el carrito, devuelve un error 404

    res.status(200).json({ status: "success", payload: cart });  // Devuelve el carrito actualizado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para eliminar un producto de un carrito
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;  // Obtiene el ID del carrito y del producto de los parámetros de la URL
    const cart = await cartDao.deleteProductInCart(cid, pid);  // Elimina el producto del carrito

    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });  // Si no se encuentra el producto, devuelve un error 404
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });  // Si no se encuentra el carrito, devuelve un error 404

    res.status(200).json({ status: "success", payload: cart });  // Devuelve el carrito actualizado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para obtener un carrito por su ID
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;  // Obtiene el ID del carrito de los parámetros de la URL
    const cart = await cartDao.getById(cid);  // Busca el carrito por su ID

    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });  // Si no se encuentra el carrito, devuelve un error 404

    res.status(200).json({ status: "success", payload: cart });  // Devuelve el carrito encontrado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para actualizar un carrito por su ID
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;  // Obtiene el ID del carrito de los parámetros de la URL
    const body = req.body;  // Obtiene los datos del cuerpo de la solicitud
   
    const cart = await cartDao.update(cid, body);  // Actualiza el carrito en la base de datos

    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });  // Si no se encuentra el carrito, devuelve un error 404
    
    res.status(200).json({ status: "success", payload: cart });  // Devuelve el carrito actualizado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para eliminar todos los productos de un carrito por su ID
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;  // Obtiene el ID del carrito de los parámetros de la URL
   
    const cart = await cartDao.deleteAllProductsInCart(cid);  // Elimina todos los productos del carrito

    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });  // Si no se encuentra el carrito, devuelve un error 404
    
    res.status(200).json({ status: "success", payload: cart });  // Devuelve el carrito actualizado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

export default router;  // Exporta el router para que pueda ser utilizado en otras partes de la aplicación
