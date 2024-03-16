import fs from "fs";

export class UserManager4{
    constructor(file) {
        this.file = file;
    }

    async CreateUser(user) {
        const newUser = {
            Id: await this.GetId(),
            name: user.name ?? "sin nombre",
            lastname: user.lastname ?? "sin apellido",
            age: user.age ?? "sin edad",
            curso: user.curso ?? "sin curso"
        };
        const users = await this.findUsers();
        users.push(newUser);

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(users, null, "\t"));
            console.log("usuario creado correctamente");
        } catch (error) {
            console.log("error al crear usuario \n", error);
        }
    }

    async getAllUsers() {
        try {
            const usersData = await fs.promises.readFile(this.file, "utf-8");
            return JSON.parse(usersData);
        } catch (error) {
            console.log("error al leer los usuarios \n", error);
            return [];
        }
    }

    async updateUser(Id, user) {
        const users = await this.getAllUsers();
        let userUpdated = {};

        for (let i = 0; i < users.length; i++) {
            if (users[i].Id === Id) {
                users[i].name = user.name ?? users[i].name;
                users[i].lastname = user.lastname ?? users[i].lastname;
                users[i].age = user.age ?? users[i].age;
                users[i].curso = user.curso ?? users[i].curso;

                userUpdated = users[i];
                break;
            }
        }

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(users, null, "\t"));
            return userUpdated;
        } catch (error) {
            console.log("error al actualizar el usuario \n", error);
            return null;
        }
    }

    async deleteUser(id) {
        const users = await this.getAllUsers();
        const initialLength = users.length;
        const updatedUsers = users.filter(user => user.Id != id);

        try {
            if (initialLength === updatedUsers.length) {
                throw new Error("No se encontró el usuario a eliminar");
            }
            await fs.promises.writeFile(this.file, JSON.stringify(updatedUsers, null, "\t"));
            console.log("Usuario eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar el usuario \n", error.message);
        }
    }

    async GetId() {
        const users = await this.getAllUsers();
        if (users.length > 0) {
            return parseInt(users[users.length - 1].Id) + 1;
        } else {
            return 1;
        }
    }

    async findUsers() {
        try {
            const usersData = await fs.promises.readFile(this.file, "utf-8");
            return JSON.parse(usersData);
        } catch (error) {
            console.log("error al leer los usuarios \n", error);
            return [];
        }
    }
}
