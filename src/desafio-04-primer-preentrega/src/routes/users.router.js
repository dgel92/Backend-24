import { Router } from "express";

const router = Router();
const users = [];

router.get("/", (req, res)=>{
    res.send(users);

})

router.post("/", (req, res)=>{
    const {name, apellido, edad, mail, curso} = req.body;
    if (!name || !apellido || !edad || !mail || !curso)
        return res.status(400).send({error:"porfavor todos los datos son obligatorios"})
    users.push({name, apellido, edad, mail, curso});

    res.status(201).send({message: "usuario creado correctamente"})
})
export default router