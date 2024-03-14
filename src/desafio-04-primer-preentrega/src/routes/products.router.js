import { Router } from "express";

const router = Router();
const products = [];

router.get("/", (req, res)=>{
    res.send(users);

})

router.post("/", (req, res)=>{
    const {name, price, descripcion, stock} = req.body;
    if (!name || !price || !descripcion || !stock)
        return res.status(400).send({error:"porfavor todos los datos son obligatorios para agregar un producto al catalogo"})
    users.push({name, price, descripcion, stock});

    res.status(201).send({message: "producto creado correctamente"})
})
export default router