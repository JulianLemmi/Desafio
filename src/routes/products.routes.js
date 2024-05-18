import { Router } from "express"; // Importa el módulo Router de Express
import productDao from "../dao/mongoDao/product.dao.js"; // Importa el objeto productDao que contiene métodos para interactuar con la base de datos

const router = Router(); // Crea una nueva instancia de Router

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    // Obtiene todos los productos llamando al método getAll de productDao
    const products = await productDao.getAll();

    // Responde con un estado 200 (éxito) y los productos obtenidos
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

// Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Extrae el parámetro pid (ID del producto) de la URL

    // Llama al método getById de productDao para obtener el producto por su ID
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` }); // Verifica si el producto no se encontró

    // Responde con un estado 200 (éxito) y el producto encontrado
    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

// Ruta para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body; // Obtiene los datos del nuevo producto del cuerpo de la petición
    const newProduct = await productDao.create(product); // Llama al método create de productDao para crear un nuevo producto

    // Responde con un estado 201 (creado) y el nuevo producto creado
    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

// Ruta para actualizar un producto por su ID
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Extrae el parámetro pid (ID del producto) de la URL
    const productData = req.body; // Obtiene los datos actualizados del producto del cuerpo de la petición

    // Llama al método update de productDao para actualizar el producto
    const updateProduct = await productDao.update(pid, productData);
    if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` }); // Verifica si el producto no se encontró

    // Responde con un estado 200 (éxito) y el producto actualizado
    res.status(200).json({ status: "success", payload: updateProduct });
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

// Ruta para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Extrae el parámetro pid (ID del producto) de la URL

    // Llama al método deleteOne de productDao para eliminar el producto
    const product = await productDao.deleteOne(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` }); // Verifica si el producto no se encontró
    
    // Responde con un estado 200 (éxito) y un mensaje indicando que el producto fue eliminado
    res.status(200).json({ status: "success", payload: "Producto eliminado" });
  } catch (error) {
    console.log(error); // Imprime cualquier error en la consola
  }
});

export default router; // Exporta el router para que pueda ser utilizado en otros módulos
