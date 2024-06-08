import { productModel } from "../models/product.model.js";  // Importa el modelo de producto

// Función para obtener todos los productos con paginación y filtros
const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);  // Utiliza la función paginate del modelo de producto con la consulta y opciones proporcionadas
  return products;  // Devuelve los productos obtenidos
};

// Función para obtener un producto por su ID
const getById = async (id) => {
  const product = await productModel.findById(id);  // Busca el producto por su ID en la base de datos
  return product;  // Devuelve el producto encontrado
};

// Función para crear un nuevo producto
const create = async (data) => {
  const product = await productModel.create(data);  // Crea un nuevo producto en la base de datos con los datos proporcionados
  return product;  // Devuelve el producto creado
};

// Función para actualizar un producto por su ID
const update = async (id, data) => {
  await productModel.findByIdAndUpdate(id, data);  // Actualiza el producto en la base de datos con los nuevos datos
  const product = await productModel.findById(id);  // Busca y obtiene el producto actualizado por su ID
  return product;  // Devuelve el producto actualizado
};

// Función para eliminar un producto por su ID
const deleteOne = async (id) => {
  const product = await productModel.deleteOne({ _id: id });  // Elimina el producto por su ID en la base de datos
  if (product.deletedCount === 0) return false;  // Si no se eliminó ningún producto, devuelve false
  return true;  // Si se eliminó el producto, devuelve true
};

// Exporta todas las funciones para que puedan ser utilizadas en otras partes de la aplicación
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
