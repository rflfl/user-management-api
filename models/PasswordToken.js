let knex = require("../database/connection");
const User = require("./User");

class PasswordToken {
    async create(email) {
        let user = await User.findByEmail(email);
        if (user != undefined) {
            try {
                let token = Date.now();
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("passwordtokens");
                return { status: true, token: token }
            } catch (error) {
                console.log(err)
                return { status: false, err: err }
            }
        } else {
            return { status: false, err: "O e-mail não existe no banco de dados" }
        }
    }
}

module.exports = new PasswordToken();