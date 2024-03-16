import { Router } from "express";
import {uploader} from "../../util.js"

const router = Router();
const users = [];

router.get("/", (req, res)=>{
    res.send(users);

})

router.post("/",uploader.single("profile"), (req, res)=>{
    if(!req.file){
        return res.status(400).send({error: "Se necesita cargar la imagen para crear el usuario"});
    }

    const {name, apellido, edad, mail, curso} = req.body;
    if (!name || !apellido || !edad || !mail || !curso)
        return res.status(400).send({error:"porfavor todos los datos son obligatorios"})
    
    const profile = req.file.path;
    users.push({name, apellido, edad, mail, curso, profile});

    res.status(201).send({message: "usuario creado correctamente"})
})
export default router