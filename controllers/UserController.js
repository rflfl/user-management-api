let User = require("../models/User")
let PasswordToken = require("../models/PasswordToken")
class Usercontroller {
    async index(req, res) {
        let users = await User.findAll();
        res.json(users);
    }

    async create(req, res) {
        let { email, name, password } = req.body;
        if (email == undefined) {
            res.status(400);
            res.json({ err: "o email é inválido" })
            return;
        }
        let existEmail = await User.findEmail(email)
        if (existEmail) {
            res.status(406);
            res.json({ err: "o e-mail já está cadastrado." });
            return;
        }
        await User.newUser(email, password, name);

        res.status(200);
        res.send("Usuário cadastrado com sucesso!");
    }

    async findUser(req, res) {
        let id = req.params.id;
        let user = await User.findById(id);
        if (user == undefined) {
            res.status(404);
            res.json({})
            return;
        } else {
            res.json(user);
        }
    }

    async editUser(req, res) {
        let { id, name, email, role } = req.body;
        let result = await User.update(id, name, email, role);

        if (result != undefined) {
            if (result.status) {
                res.send("Usuário atualizado com sucesso.")
            } else {
                res.status(406);
                res.send(result.err);
            }
        } else {
            res.status(406);
            res.send("Ocorreu um erro.");
        }
    }

    async deleteUser(req, res) {
        let { id } = req.body;

        let result = await User.delete(id);
        if (result) {
            res.status(200);
            res.send("Usuário excluído com sucesso.");
        } else {
            res.status(406);
            res.send("Ocorreu um erro.");
        }

    }

    async revocerPassaword(req, res) {
        let email = req.body.email;
        let result = await PasswordToken.create(email);
        if (result.status) {
            //enviar o email com o token para recuperar a senha
            res.status(200);
            res.send(""+result.token);
        } else {
            res.status(406);
            res.send(result.err)
        }
    }
}

module.exports = new Usercontroller();