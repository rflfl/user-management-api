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

    async validate(token) {
        try {
            let result = await knex.select("*").where({ token: token }).table("passwordtokens");
            if (result.length > 0) {
                let tk = result[0]
                if (tk.used) {
                    return { status: false };
                } else {
                    return { status: true, token: tk };
                }
            } else {
                return false;
            }
        } catch (error) {

        }
    }

    async setUsed(token){
        await knex.update({used:1}).where({token:token}).table("passwordtokens");
    }
}

module.exports = new PasswordToken();