import fs from "fs";

// Ruta del archivo JSON donde se almacenan los carritos
const pathFile = "./src/data/carts.json";
let carts = [];

// Función asincrónica para obtener los datos de los carritos desde el archivo
const getCarts = async () => {
  try {
    const cartsJson = await fs.promises.readFile(pathFile);
    carts = JSON.parse(cartsJson) || [];
  } catch (error) {
    console.error("Error al obtener los datos de los carritos:", error);
  }

  return carts;
};

// Función asincrónica para crear un nuevo carrito
const createCart = async () => {
  try {
    await getCarts();

    // Crear un nuevo carrito con un ID único y sin productos inicialmente
    const newCart = {
      id: carts.length + 1,
      products: []
    };

    // Agregar el nuevo carrito a la lista de carritos
    carts.push(newCart);

    // Guardar la lista actualizada de carritos en el archivo JSON
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return newCart;
  } catch (error) {
    console.error("Error al crear un nuevo carrito:", error);
    throw error;
  }
};

// Función asincrónica para obtener un carrito por su ID
const getCartById = async (cid) => {
  try {
    await getCarts();

    // Buscar el carrito por su ID
    const cart = carts.find((c) => c.id === cid);

    if (!cart) return `No se encuentra el carrito con el ID ${cid}`;

    return cart.products;
  } catch (error) {
    console.error("Error al obtener el carrito por su ID:", error);
    throw error;
  }
};

// Función asincrónica para agregar un producto a un carrito existente
const addProductToCart = async (cid, pid) => {
  try {
    await getCarts();

    // Buscar el índice del carrito en la lista de carritos
    const index = carts.findIndex((c) => c.id === cid);
    if (index === -1) return `No se encontró el carrito con el ID ${cid}`;

    // Agregar el producto al carrito especificado con una cantidad inicial de 1
    carts[index].products.push({
      product: pid,
      quantity: 1
    });

    return carts[index];
  } catch (error) {
    console.error("Error al agregar un producto al carrito:", error);
    throw error;
  }
};

// Exportar las funciones para su uso en otros módulos
export default {
  getCarts,
  createCart,
  getCartById,
  addProductToCart
};
