import fs from "fs";

export class cartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = [];
        this.nextId = 1;
        this.readCartsFromFile();
    }

    async readCartsFromFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, "utf-8");
            this.carts = JSON.parse(data);
            this.nextId = this.carts.length > 0 ? Math.max(...this.carts.map((p) => p.id)) + 1 : 1;
        } catch (error) {
            throw new Error(`Error en la lectura ${error.message}`);
        }
    }

    async writeCartsToFile() {
        try {
            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(this.carts, null, 2),
                "utf-8"
            );
        } catch (error) {
            throw new Error(`Error en la escritura ${error.message}`);
        }
    }

    async findCartIndex(id) {
        return this.carts.findIndex((cart) => cart.id == id);
    }

    async getCartById(id) {
        await this.readCartsFromFile();
        const cart = this.carts.find((cart) => cart.id == id);
        if (!cart) {
            throw new Error("Carrito no encontrado.");
        }
        return cart;
    }

    async addCart() {
        await this.readCartsFromFile();
        const newCart = {
            id: this.nextId++,
            products: [],
        };
        this.carts.push(newCart);
        await this.writeCartsToFile();
        return newCart;
    }

    async addProductToACart(cartId, productDetails, quantity = 1) {
        await this.readCartsFromFile();
    
        const cartIndex = await this.findCartIndex(cartId);
    
        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado.");
        }
    
        const cart = this.carts[cartIndex];
    
        const productIndex = cart.products.findIndex((item) => item.productId == productDetails.id);
    
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId: productDetails.id, quantity });
        }
    
        await this.writeCartsToFile();
        return cart;
    }}