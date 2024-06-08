import fs from "fs";  // Importa el módulo fs para trabajar con el sistema de archivos

let carts = [];  // Array para almacenar los carritos
const pathFile = "./src/data/carts.json";  // Ruta del archivo donde se almacenan los carritos

// Función para obtener todos los carritos
const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile);  // Lee el archivo de carritos
  carts = JSON.parse(cartsJson) || [];  // Parsea el contenido del archivo y lo asigna a la variable carts

  return carts;  // Devuelve la lista de carritos
};

// Función para crear un nuevo carrito
const createCart = async () => {
  await getCarts();  // Carga los carritos existentes

  const newCart = {
    id: carts.length + 1,  // Asigna un ID al nuevo carrito
    products: []  // Inicializa el carrito con un array de productos vacío
  };

  carts.push(newCart);  // Agrega el nuevo carrito al array de carritos

  // Guarda los carritos actualizados en el archivo
  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  return newCart;  // Devuelve el carrito creado
};

// Función para obtener los productos de un carrito por su ID
const getCartById = async (cid) => {
  await getCarts();  // Carga los carritos existentes
  
  const cart = carts.find(c => c.id === cid);  // Busca el carrito por su ID

  if (!cart) return `No se encuentra el carrito con el id ${cid}`;  // Si no se encuentra el carrito, devuelve un mensaje de error

  return cart.products;  // Devuelve los productos del carrito encontrado
};

// Función para agregar un producto a un carrito por su ID
const addProductToCart = async (cid, pid) => {
  await getCarts();  // Carga los carritos existentes
  
  const index = carts.findIndex(c => c.id === cid);  // Encuentra el índice del carrito
  if (index === -1) return `No se encontró el carrito con el id ${cid}`;  // Si no se encuentra el carrito, devuelve un mensaje de error

  carts[index].products.push({
    product: pid,  // Agrega el ID del producto
    quantity: 1  // Establece la cantidad del producto a 1
  });

  // Guarda los carritos actualizados en el archivo
  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  return carts[index];  // Devuelve el carrito actualizado
};

// Exporta todas las funciones para que puedan ser utilizadas en otras partes de la aplicación
export default {
  getCarts,
  createCart,
  getCartById,
  addProductToCart
};
