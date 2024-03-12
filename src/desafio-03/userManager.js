/*const fs = require("fs");
const crypto = require("")
module.exports = class UserManager{
    constructor(file){
        this.file = file;
    }
    async getAllUser(){
        try {
            const users = await fs.promises.readFile(this.file, "utf-8");
        } catch (error) {
            console.log(error);
            return [];
            
        }
    }

    async createUser(user){
        if (!user.UserName || user.Password) return console.error("debe tener usuario y contraseña");
            const NewUser = {
            Name: user.Name ?? "sin nombre",
            LastName: user.LastName ?? "sin apellido",
            UserName: user.UserName,
            Password: user.Password
        }

        const users = await this.getAllUser();
        users.push(NewUser);
        try{
            await fs.promises.writeFile(this.file, JSON.stringify(users, null, "\t"));
            return "usuario creado correctamente"
        }catch(error){
            console.log(error);
            return "error al crear usuario"
        }
    }
}
*/