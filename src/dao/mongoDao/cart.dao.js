// Importamos los modelos de carrito y producto
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

// Función para obtener un carrito por su ID
const getById = async (id) => {
  // Buscamos el carrito en la base de datos usando su ID
  const cart = await cartModel.findById(id);
  return cart; // Devolvemos el carrito encontrado
};

// Función para crear un nuevo carrito
const create = async (data) => {
  // Creamos un nuevo carrito con los datos proporcionados
  const cart = await cartModel.create(data);
  return cart; // Devolvemos el carrito creado
};

// Función para añadir un producto a un carrito
const addProductToCart = async (cid, pid) => {
  // Buscamos el producto en la base de datos usando su ID
  const product = await productModel.findById(pid);
  if (!product) return { product: false }; // Si no se encuentra el producto, devolvemos false

  // Buscamos el carrito en la base de datos usando su ID
  const cart = await cartModel.findById(cid);
  if (!cart) return { cart: false }; // Si no se encuentra el carrito, devolvemos false

  // Intentamos encontrar y actualizar el producto en el carrito incrementando su cantidad en 1
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  );
  /* 
  $inc: Este es el operador de incremento. Se utiliza para incrementar el valor de un campo numérico en la cantidad especificada.
  "products.$.quantity": 
  products: es el nombre del array 
  $:  es el operador de posición. Representa el primer elemento del array que coincide con la condición especificada 
  en el filtro de la consulta. Básicamente, este operador selecciona el elemento correcto del array para la actualización.
  quantity: es el campo del objeto dentro del array products cuyo valor queremos incrementar.
  */

  // Si el producto no está en el carrito, lo añadimos con cantidad 1
  if (!productInCart) {
    await cartModel.updateOne(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }

  // Buscamos el carrito actualizado en la base de datos
  const cartUpdate = await cartModel.findById(cid);
  // const cartUpdate = await cartModel.findById(cid).populate("products.product"); // Descomentar para hacer populate

  return cartUpdate; // Devolvemos el carrito actualizado
};

// Función para eliminar un producto de un carrito
const deleteProductInCart = async (cid, pid) => {
  // Buscamos el producto en la base de datos usando su ID
  const product = await productModel.findById(pid);
  if (!product) return { product: false }; // Si no se encuentra el producto, devolvemos false

  // Disminuimos la cantidad del producto en el carrito en 1
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": -1 } }
  );
  if (!cart) return { cart: false }; // Si no se encuentra el carrito, devolvemos false

  // Buscamos el carrito actualizado en la base de datos
  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate; // Devolvemos el carrito actualizado
};

// Función para actualizar un carrito con nuevos datos
const update = async (cid, data) => {
  // Limpiamos los productos actuales del carrito
  await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });

  // Actualizamos el carrito con los nuevos datos proporcionados
  await cartModel.updateOne({ _id: cid }, { $set: { products: data } });

  // Buscamos el carrito actualizado en la base de datos
  const cart = await cartModel.findById(cid);
  return cart; // Devolvemos el carrito actualizado
};

// Función para actualizar la cantidad de un producto en un carrito
const updateQuantityProductInCart = async (cid, pid, quantity) => {
  // Buscamos el producto en la base de datos usando su ID
  const product = await productModel.findById(pid);
  if (!product) return { product: false }; // Si no se encuentra el producto, devolvemos false

  // Actualizamos la cantidad del producto en el carrito
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } }
  );
  if (!cart) return { cart: false }; // Si no se encuentra el carrito, devolvemos false

  // Buscamos el carrito actualizado en la base de datos
  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate; // Devolvemos el carrito actualizado
};

// Función para eliminar todos los productos de un carrito
const deleteAllProductsInCart = async (cid) => {
  // Actualizamos el carrito estableciendo su array de productos como vacío
  const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });

  // Buscamos el carrito actualizado en la base de datos
  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate; // Devolvemos el carrito actualizado
};

// Exportamos todas las funciones como un objeto para poder usarlas en otras partes del proyecto
export default {
  getById,
  create,
  addProductToCart,
  deleteProductInCart,
  update,
  updateQuantityProductInCart,
  deleteAllProductsInCart,
};
