import { ProductManager } from '../services/ProductManager.js';
import { Router } from "express";
import { cartManager } from '../services/cartManager.js';

const cartsRouter = Router()
const carts = new cartManager("./src/data/carts.json");
const products = new ProductManager("./src/data/products.json");

cartsRouter.get(`/:cid`, async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await carts.getCartById(cid);
        res.json(cart);
    } catch (error) {
        res.status(404).send({ error: "Carrito no encontrado" });
    }
});

cartsRouter.post(`/`, async (req, res) => {
    try {
        const newCart = await carts.addCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const productDetails = await products.getProductById(pid);  
        if (!productDetails) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        const updatedCart = await carts.addProductToACart(cid, productDetails);
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default cartsRouter;