let knex = require("../database/connection");
const User = require("./User");

class PasswordToken {
    async create(email) {
        let user = await User.findByEmail(email);
        if (user != undefined) {
            await knex.insert({
                user_id: user.id,
                used: 0,
                token: Date.now()
            })
        } else {
            return { status: false, err: "O e-mail não existe no bancp de dados" }
        }
    }
}

module.exports = new PasswordToken();