import { cartModel } from "../models/cart.model.js"; // Importa el modelo de carrito desde el archivo correspondiente
import { productModel } from "../models/product.model.js"; // Importa el modelo de producto desde el archivo correspondiente

// Función para obtener un carrito por su ID
const getById = async (id) => {
  const cart = await cartModel.findById(id); // Busca un carrito por su ID en la base de datos
  return cart; // Devuelve el carrito encontrado
};

// Función para crear un nuevo carrito
const create = async (data) => {
  const cart = await cartModel.create(data); // Crea un nuevo carrito con los datos proporcionados
  return cart; // Devuelve el carrito creado
};

// Función para añadir un producto a un carrito
const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid); // Busca un producto por su ID en la base de datos
  if(!product) return { product: false }; // Si el producto no se encuentra, devuelve un objeto indicando que el producto no existe

  // Añade el producto al carrito utilizando su ID
  await cartModel.findByIdAndUpdate(cid, { $push: { products: product } });

  const cart = await cartModel.findById(cid); // Busca el carrito actualizado por su ID
  if(!cart) return { cart: false }; // Si el carrito no se encuentra, devuelve un objeto indicando que el carrito no existe

  return cart; // Devuelve el carrito actualizado
};

// Exporta las funciones para su uso en otros módulos
export default {
  getById,
  create,
  addProductToCart
};
