import { Router } from "express";  // Importa el Router de Express
import productDao from "../dao/mongoDao/product.dao.js";  // Importa el Data Access Object (DAO) para los productos

const router = Router();  // Crea una nueva instancia del Router de Express

// Ruta para obtener todos los productos con filtros opcionales
router.get("/", async (req, res) => {
  try {
    // Obtiene los parámetros de la consulta (query) de la URL
    const { limit, page, sort, category, status } = req.query;
    
    // Define las opciones para la consulta, con valores por defecto
    const options = {
      limit: limit || 10,  // Limita el número de resultados (por defecto 10)
      page: page || 1,  // Especifica la página de resultados (por defecto 1)
      sort: {
        price: sort === "asc" ? 1 : -1,  // Ordena por precio de forma ascendente o descendente
      },
      lean: true,  // Devuelve objetos JavaScript simples en lugar de documentos Mongoose
    };

    // Si se especifica un estado, filtra los productos por estado
    if (status) {
      const products = await productDao.getAll({ status: status }, options);
      return res.status(200).json({ products });
    }

    // Si se especifica una categoría, filtra los productos por categoría
    if (category) {
      const products = await productDao.getAll({ category: category }, options);
      return res.status(200).json({ products });
    }

    // Si no se especifica ni estado ni categoría, obtiene todos los productos
    const products = await productDao.getAll({}, options);

    // Devuelve los productos obtenidos en la respuesta
    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;  // Obtiene el ID del producto de los parámetros de la URL

    const product = await productDao.getById(pid);  // Busca el producto por su ID
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });  // Si no se encuentra el producto, devuelve un error 404

    res.status(200).json({ status: "success", payload: product });  // Devuelve el producto encontrado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body;  // Obtiene los datos del producto del cuerpo de la solicitud
    const newProduct = await productDao.create(product);  // Crea un nuevo producto en la base de datos

    res.status(201).json({ status: "success", payload: newProduct });  // Devuelve el nuevo producto creado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para actualizar un producto existente por su ID
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;  // Obtiene el ID del producto de los parámetros de la URL
    const productData = req.body;  // Obtiene los datos actualizados del producto del cuerpo de la solicitud

    const updateProduct = await productDao.update(pid, productData);  // Actualiza el producto en la base de datos
    if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });  // Si no se encuentra el producto, devuelve un error 404

    res.status(200).json({ status: "success", payload: updateProduct });  // Devuelve el producto actualizado en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

// Ruta para eliminar un producto existente por su ID
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;  // Obtiene el ID del producto de los parámetros de la URL
    const product = await productDao.deleteOne(pid);  // Elimina el producto de la base de datos
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });  // Si no se encuentra el producto, devuelve un error 404

    res.status(200).json({ status: "success", payload: "Producto eliminado" });  // Devuelve un mensaje de éxito en la respuesta
  } catch (error) {
    console.log(error);  // Imprime el error en la consola para depuración
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });  // Devuelve un error 500 en caso de fallo
  }
});

export default router;  // Exporta el router para que pueda ser utilizado en otras partes de la aplicación
