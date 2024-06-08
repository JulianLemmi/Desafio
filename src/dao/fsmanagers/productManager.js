import fs from "fs";  // Importa el módulo fs para trabajar con el sistema de archivos

let products = [];  // Array para almacenar los productos
let pathFile = "./src/data/products.json";  // Ruta del archivo donde se almacenan los productos

// Función para agregar un nuevo producto
const addProduct = async (product) => {
  const { title, description, price, thumbnail, code, stock } = product;  // Desestructura el objeto product para obtener sus propiedades
  await getProducts();  // Carga los productos existentes
  const newProduct = {
    id: products.length + 1,  // Asigna un ID al nuevo producto
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status: true  // Establece el estado del producto a true
  };

  // Verifica que todos los campos del nuevo producto estén definidos
  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  // Verifica si ya existe un producto con el mismo código
  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }

  products.push(newProduct);  // Agrega el nuevo producto al array de productos

  // Guarda los productos actualizados en el archivo
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// Función para obtener todos los productos o un número limitado de productos
const getProducts = async (limit) => {
  const productsJson = await fs.promises.readFile(pathFile, "utf8");  // Lee el archivo de productos
  products = JSON.parse(productsJson) || [];  // Parsea el contenido del archivo y lo asigna a la variable products

  if (!limit) return products;  // Si no se especifica un límite, devuelve todos los productos

  return products.slice(0, limit);  // Devuelve el número limitado de productos
};

// Función para obtener un producto por su ID
const getProductById = async (id) => {
  await getProducts();  // Carga los productos existentes
  const product = products.find((product) => product.id === id);  // Busca el producto por su ID
  if (!product) {
    console.log(`No se encontró el producto con el id ${id}`);
    return;
  }

  console.log(product);  // Imprime el producto encontrado en la consola
  return product;  // Devuelve el producto encontrado
};

// Función para actualizar un producto por su ID
const updateProduct = async (id, dataProduct) => {
  await getProducts();  // Carga los productos existentes
  const index = products.findIndex((product) => product.id === id);  // Encuentra el índice del producto a actualizar
  products[index] = {
    ...products[index],  // Mantiene las propiedades existentes del producto
    ...dataProduct,  // Actualiza las propiedades con los nuevos datos
  };

  // Guarda los productos actualizados en el archivo
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// Función para eliminar un producto por su ID
const deleteProduct = async (id) => {
  await getProducts();  // Carga los productos existentes
  products = products.filter((product) => product.id !== id);  // Filtra el producto a eliminar
  await fs.promises.writeFile(pathFile, JSON.stringify(products));  // Guarda los productos actualizados en el archivo
};

// Exporta todas las funciones para que puedan ser utilizadas en otras partes de la aplicación
export default {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
