import { ProductManager } from "./ProductManager.js";
import express from "express";

const products = new ProductManager("./Data/products.json");

const app = express();
const PORT = 8080

app.use(express.urlencoded({extended: true}));

app.get("/products", async(req, res)=>{
    try {
        const {limit} =req.query;
        const productList = await products.getProducts();
        res.json(limit? productList.slice(0, Number(limit)): productList)        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products.getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(404).send({ error: "Producto no encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});