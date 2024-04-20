import express from "express";
import productManager from "./productManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit ? parseInt(limit) : undefined);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Todos los parámetros siempre vienen en formato string

    const product = await productManager.getProductById(parseInt(pid));

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});
