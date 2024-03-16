import cartsRouter from './src/routes/cartsRouter.js';
import express from "express";
import productRouter from './src/routes/productsRouter.js';
import userRouter from "./src/routes/usersRouter.js";

const app = express();

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Servidor Ok http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));

app.get('/api', (req, res) => {
    res.send("Ingreso ok")
})

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use('/api/carts', cartsRouter);
