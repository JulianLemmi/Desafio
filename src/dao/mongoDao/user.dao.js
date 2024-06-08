import { userModel } from "../models/user.model.js";  // Importa el modelo de usuario

// Función para obtener todos los usuarios
const getAll = async () => {
  const users = await userModel.find();  // Busca todos los usuarios en la base de datos
  return users;  // Devuelve la lista de usuarios
};

// Función para obtener un usuario por su ID
const getById = async (id) => {
  const user = await userModel.findById(id);  // Busca un usuario por su ID en la base de datos
  return user;  // Devuelve el usuario encontrado
};

// Función para obtener un usuario por su correo electrónico
const getByEmail = async (email) => {
  const user = await userModel.findOne({ email });  // Busca un usuario por su correo electrónico en la base de datos
  return user;  // Devuelve el usuario encontrado
};

// Función para crear un nuevo usuario
const create = async (data) => {
  const user = await userModel.create(data);  // Crea un nuevo usuario en la base de datos con los datos proporcionados
  return user;  // Devuelve el usuario creado
};

// Función para actualizar un usuario por su ID
const update = async (id, data) => {
  await userModel.findByIdAndUpdate(id, data);  // Actualiza el usuario en la base de datos con los nuevos datos
  const user = await userModel.findById(id);  // Busca y obtiene el usuario actualizado por su ID
  return user;  // Devuelve el usuario actualizado
};

// Función para eliminar un usuario por su ID
const deleteOne = async (id) => {
  const user = await userModel.deleteOne({ _id: id });  // Elimina el usuario por su ID en la base de datos
  if (user.deletedCount === 0) return false;  // Si no se eliminó ningún usuario, devuelve false
  return true;  // Si se eliminó el usuario, devuelve true
};

// Exporta todas las funciones para que puedan ser utilizadas en otras partes de la aplicación
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  getByEmail
};
