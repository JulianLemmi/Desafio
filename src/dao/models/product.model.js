import mongoose from "mongoose"; // Importa el módulo mongoose

// Define el nombre de la colección en la base de datos
const productCollection = "products";

// Define el esquema para los documentos de la colección 'products'
const productSchema = new mongoose.Schema({
  title: {
    type: String,    // El campo 'title' es de tipo cadena
    require: true,   // El campo 'title' es obligatorio
  },
  description: {
    type: String,    // El campo 'description' es de tipo cadena
    require: true,   // El campo 'description' es obligatorio
  },
  thumbnail: {
    type: Array,     // El campo 'thumbnail' es de tipo array
    default: [],     // El valor por defecto de 'thumbnail' es un array vacío
  },
  code: {
    type: String,    // El campo 'code' es de tipo cadena
    require: true,   // El campo 'code' es obligatorio
  },
  stock: {
    type: Number,    // El campo 'stock' es de tipo número
    require: true,   // El campo 'stock' es obligatorio
  },
  status: {
    type: Boolean,   // El campo 'status' es de tipo booleano
    default: true,   // El valor por defecto de 'status' es true
  },
  price: {
    type: Number,    // El campo 'price' es de tipo número
    require: true,   // El campo 'price' es obligatorio
  },
});

// Crea un modelo de Mongoose basado en el esquema definido y la colección especificada
export const productModel = mongoose.model(productCollection, productSchema);
