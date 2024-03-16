/*class ProductManager {
    constructor(){
        this.products = [];
        this.counter = 0;
    }

    agregarProducto(nombre, descripcion, precio, codigo, stock){
        for (let i = 0; i < this.products.length; i++){
            if (this.products[i].codigo === codigo){
                throw new Error(`El código ${codigo} ya está en uso`);
            }   
        }

        const nuevoProducto = {
            nombre, descripcion, precio, codigo, stock,
        }

        if(!Object.values(nuevoProducto).every((value) => value !== undefined)){
            throw new Error ("Por favor completa todos los campos, todos son obligatorios");
        }

        this.counter++;

        this.products.push({
            ...nuevoProducto,
            id: this.counter,
        });
    }

    traerTodosLosProductos() {
        return this.products;
    }

    borrarTodosLosProductos() {
        this.products = [];
    }

    borrarProductoPorId(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            console.log(`Producto con ID ${id} borrado exitosamente.`);
        } else {
            console.log(`No existe ningún producto con el ID ${id}.`);
        }
    }

    buscarPorId(id){
        return this.products.find((existingProduct)=> existingProduct.id === id);
    }

    traerProductoPorId(id){
        const producto = this.buscarPorId(id);
        if (!producto){
            console.log("No existe un producto con este ID");
            return;
        }
        return producto;
    }
}

const manager = new ProductManager();

// prueba de agregar productos
try {
    manager.agregarProducto("Camiseta", "Camiseta de algodón", 15.99, "C001", 50);
    manager.agregarProducto("Pantalón", "Pantalón vaquero", 29.99, "P002", 30);
    manager.agregarProducto("Zapatillas", "Zapatillas deportivas", 49.99, "Z003", 20);
} catch (error) {
    console.error("Error al agregar producto:", error.message);
}

// Traer todos los productos
const todosLosProductos = manager.traerTodosLosProductos();
console.log("Todos los productos:", todosLosProductos);

// Buscar un producto por ID
const productoBuscado = manager.traerProductoPorId(2);
console.log("Producto buscado:", productoBuscado);

// Borrar un producto por ID
manager.borrarProductoPorId(1);

// Obtener todos los productos después de borrar
const productosRestantes = manager.traerTodosLosProductos();
console.log("Productos después de borrar:", productosRestantes);

// Borrar todos los productos
manager.borrarTodosLosProductos();
console.log("Productos después de borrar todo:", manager.traerTodosLosProductos());
*/