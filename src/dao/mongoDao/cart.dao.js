import { cartModel } from "../models/cart.model.js";  // Importa el modelo de carrito
import { productModel } from "../models/product.model.js";  // Importa el modelo de producto

// Función para obtener un carrito por su ID
const getById = async (id) => {
  const cart = await cartModel.findById(id);  // Busca el carrito por su ID en la base de datos
  return cart;  // Devuelve el carrito encontrado
};

// Función para crear un nuevo carrito
const create = async (data) => {
  const cart = await cartModel.create(data);  // Crea un nuevo carrito en la base de datos con los datos proporcionados
  return cart;  // Devuelve el carrito creado
};

// Función para agregar un producto a un carrito
const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid);  // Busca el producto por su ID en la base de datos
  if (!product) return { product: false };  // Si no se encuentra el producto, devuelve un objeto indicando que el producto no existe
  const cart = await cartModel.findById(cid);  // Busca el carrito por su ID en la base de datos
  if (!cart) return { cart: false };  // Si no se encuentra el carrito, devuelve un objeto indicando que el carrito no existe

  // Incrementa la cantidad del producto en el carrito si ya existe
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid }, 
    { $inc: { "products.$.quantity": 1 } }
  );

  /* 
  $inc: Operador de incremento que aumenta el valor de un campo numérico en la cantidad especificada.
  "products.$.quantity": Incrementa la cantidad del producto específico en el array de productos del carrito.
  $: Operador de posición que selecciona el primer elemento del array que coincide con la condición.
  */

  if (!productInCart) {
    // Si el producto no está en el carrito, lo agrega con cantidad 1
    await cartModel.updateOne(
      { _id: cid }, 
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }

  const cartUpdate = await cartModel.findById(cid);  // Obtiene el carrito actualizado
  // const cartUpdate = await cartModel.findById(cid).populate("products.product");  // Obtiene el carrito actualizado con los productos poblados (descomentar si se necesita)
  return cartUpdate;  // Devuelve el carrito actualizado
};

// Función para eliminar un producto de un carrito
const deleteProductInCart = async (cid, pid) => {
  const product = await productModel.findById(pid);  // Busca el producto por su ID en la base de datos
  if (!product) return { product: false };  // Si no se encuentra el producto, devuelve un objeto indicando que el producto no existe

  // Decrementa la cantidad del producto en el carrito
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid }, 
    { $inc: { "products.$.quantity": -1 } }
  );
  if (!cart) return { cart: false };  // Si no se encuentra el carrito, devuelve un objeto indicando que el carrito no existe

  const cartUpdate = await cartModel.findById(cid);  // Obtiene el carrito actualizado
  return cartUpdate;  // Devuelve el carrito actualizado
};

// Función para actualizar los datos de un carrito
const update = async (cid, data) => {
  await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });  // Limpia todos los productos del carrito
  await cartModel.updateOne({ _id: cid }, { $set: { products: data } });  // Establece los nuevos productos en el carrito
  const cart = await cartModel.findById(cid);  // Obtiene el carrito actualizado
  return cart;  // Devuelve el carrito actualizado
};

// Función para actualizar la cantidad de un producto en un carrito
const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const product = await productModel.findById(pid);  // Busca el producto por su ID en la base de datos
  if (!product) return { product: false };  // Si no se encuentra el producto, devuelve un objeto indicando que el producto no existe

  // Actualiza la cantidad del producto en el carrito
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid }, 
    { $set: { "products.$.quantity": quantity } }
  );
  if (!cart) return { cart: false };  // Si no se encuentra el carrito, devuelve un objeto indicando que el carrito no existe

  const cartUpdate = await cartModel.findById(cid);  // Obtiene el carrito actualizado
  return cartUpdate;  // Devuelve el carrito actualizado
};

// Función para eliminar todos los productos de un carrito
const deleteAllProductsInCart = async (cid) => {
  const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });  // Limpia todos los productos del carrito
  const cartUpdate = await cartModel.findById(cid);  // Obtiene el carrito actualizado
  return cartUpdate;  // Devuelve el carrito actualizado
};

// Exporta todas las funciones para que puedan ser utilizadas en otras partes de la aplicación
export default {
  getById,
  create,
  addProductToCart,
  deleteProductInCart,
  update,
  updateQuantityProductInCart,
  deleteAllProductsInCart,
};
