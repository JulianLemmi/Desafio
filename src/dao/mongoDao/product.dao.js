import { productModel } from "../models/product.model.js"; // Importa el modelo de producto desde el archivo correspondiente

// Función para obtener todos los productos
const getAll = async () => {
  const products = await productModel.find(); // Busca todos los productos en la base de datos
  return products; // Devuelve la lista de productos encontrados
};

// Función para obtener un producto por su ID
const getById = async (id) => {
  const product = await productModel.findById(id); // Busca un producto por su ID en la base de datos
  return product; // Devuelve el producto encontrado
};

// Función para crear un nuevo producto
const create = async (data) => {
  const product = await productModel.create(data); // Crea un nuevo producto con los datos proporcionados
  return product; // Devuelve el producto creado
};

// Función para actualizar un producto por su ID
const update = async (id, data) => {
  await productModel.findByIdAndUpdate(id, data); // Actualiza el producto con el ID especificado usando los datos proporcionados
  const product = await productModel.findById(id); // Busca el producto actualizado por su ID
  return product; // Devuelve el producto actualizado
};

// Función para eliminar un producto por su ID
const deleteOne = async (id) => {
  const product = await productModel.deleteOne({ _id: id }); // Elimina el producto con el ID especificado
  if(product.deletedCount === 0) return false; // Si no se eliminó ningún producto, devuelve false
  return true; // Si se eliminó el producto, devuelve true
};

// Exporta las funciones para su uso en otros módulos
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne
};
