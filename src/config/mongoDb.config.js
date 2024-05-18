import mongoose from "mongoose";

const urlDb = "mongodb+srv://admin:admin123456@e-commers.7frf59x.mongodb.net/";

export const connectMongoDB = async () => {
  try {
    // Conexión con la base de datos
    await mongoose.connect(urlDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongo DB Conectado");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};
