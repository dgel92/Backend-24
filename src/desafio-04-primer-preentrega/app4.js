import UserManager4 from "../desafio-04-primer-preentrega/UserManager4";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Instancia del UserManager
const UM = new UserManager("./users.js");

// Obtener todos los usuarios
app.get("/api/users", async (req, res) => {
    try {
        const users = await UM.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo usuario
app.post("/api/users", async (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await UM.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un usuario existente
app.put("/api/users/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const updatedUser = await UM.updateUser(uid, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un usuario existente
app.delete("/api/users/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        await UM.deleteUser(uid);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});