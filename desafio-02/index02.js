const { rejects } = require("assert");
const { log } = require("console");
const fs = require("fs");

class ProductsManager {
    
    constructor() {
        this.path = "../desafio-02/dataProducts.json";
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
        this.id = 1;
    }

//Agregar productos verificando el ID)
        async addProduct(nombre, descripcion, precio, codigo, stock) {
            const codeUsed = this.products.some(product => product.codigo === codigo);
            if (codeUsed) {
                throw new Error(`El código ${codigo} ya está en uso`);
            }

            const addNewProduct = {
                id: this.id++,
                nombre,
                descripcion,
                precio,
                codigo,
                stock
            };
            this.products.push(addNewProduct);
            console.log("Producto agregado:", addNewProduct);
        
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
        }


//traer todos los productos//
async getAllProducts (){
    try {
        const readFile  = await fs.promises.readFile(this.path,"utf-8");
        const productData = JSON.parse(readFile)
        return productData;
    } catch (error) {
        console.log("error al obtener todos los productos", error);
        
    }
}

//traer productos por ID//
async getProductById (id){
    try {
        const prodId = parseInt(id);
        const product = this.products.find(product => product.id === prodId);
        if (product){
            return product
        }else{
            throw("el producto no existe")
            return null;
        }
    } catch (error) {
        console.log("Error al obtener el producto", error);
        return null        
    }
}

//Borrar por ID
async deleteProduct (id){
    const deleteForId = this.products.findIndex(product => product.id === id)
    if(deleteForId === -1) {
        console.error("Producto no encontrado");
        return
    };
    this.products.splice(deleteForId , 1)

    await fs.promises.writeFile(this.path , JSON.stringify(this.products, null, "\t"));
    console.log(`Producto ${id} eliminado correctamente`);
}

//borrar todo
async deleteAllProducts(){
    this.products = [];
    console.log("Todos los productos han sido eliminados");
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
}


/*correxion del desafio anterior y consulta tambien

async traerProductoPorId(id) {
    return new Promise((resolve, reject) => {
        const prod = this.products.find(prod => prod.id === id);
        if (!prod) {
            reject(new Error("No existe un producto con este ID"));
            const NuevoProducto ={
                id: id,
                nombre: "nuevo producto",
                descripcion: 
            }
        } else {
            resolve(prod);
        }
    });
}


*/

}

const products = new ProductsManager();

async function addProductsData(){
    
    await products.addProduct(
        "peras",
        "deliciosas",
        "$2300",
        "02",
        "150"
    );
    
    await products.addProduct(
        "uvas",
        "verdes",
        "3000",
        "03",
        "2122"
    )
    
    await products.addProduct(
        "palta",
        "no maduras",
        "7600",
        "13",
        "12"
    )
    await products.addProduct(
        "naranja",
        "ombligo",
        "1600",
        "103",
        "1200"
    )

}

async function ejemplo() {
    await addProductsData();
    console.log(await products.getAllProducts());
    console.log(await products.getProductById(1));
    console.log(await products.getProductById(2));
    console.log(await products.deleteProduct(1));
}


ejemplo();

