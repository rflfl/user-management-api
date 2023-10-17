let knex = require('../database/connection');
let bcrypt = require('bcrypt');
class User {

    async findAll() {
        try {
            let result = await knex.select("id", "email", "name", "role").table("users");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findById(id) {
        try {
            let result = await knex.select("id", "email", "name", "role").where({ id: id }).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findByEmail(email) {
        try {
            let result = await knex.select("id", "email", "name", "role").where({ email: email }).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async newUser(email, password, name) {
        try {
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({ email, password: hash, name, role: 0 }).table("users");
        } catch (err) {
            console.log(err)
        }
    }

    async findEmail(email) {
        try {
            let result = await knex.select("*").where({ email: email }).table("users");
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async update(id, email, name, role) {

        let user = await this.findById(id)

        if (user != undefined) {
            let editUser = {};

            if (email != undefined && email != user.email) {
                let result = await this.findEmail(email);
                if (!result) {
                    editUser.email = email;
                } else {
                    return { status: false, err: "Email já cadastrado no sistema." }
                }
            }

            if (name != undefined) {
                editUser.name = name;
            }
            if (role != undefined) {
                editUser.role = name;
            }

            try {
                await knex.update(editUser).where({ id: id }).table("users");
                return { status: true }
            } catch (err) {
                return { status: false, err: err }
            }

        } else {
            return { status: false, err: "o usuário não existe." }
        }

    }

    async delete(id){
        try {
            await knex("users").where({id: id}).del();
            return {status: true}
        } catch (err) {
            return { status: false, err: err }
        }
    }

}

module.exports = new User();