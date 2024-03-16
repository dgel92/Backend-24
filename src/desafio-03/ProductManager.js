import fs from "fs";

export class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.readProductsFromFile();
    }
    
    async readProductsFromFile() {
        try {
        const data = await fs.promises.readFile(this.filePath, "utf-8");
        this.products = JSON.parse(data);
        } catch (error) {
        console.error("Error durante la lectura del archivo:", error.message);
        this.products = [];
        } 
    }


    async getProducts() {
        await this.readProductsFromFile();
        return this.products;
    }


    async getProductById(id) {
        await this.readProductsFromFile();
        const productId = parseInt(id);
        const product = this.products.find((product) => product.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }
}