let knex = require('../database/connection');
let bcrypt = require('bcrypt');
class User {

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

}

module.exports = new User();