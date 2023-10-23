let User = require("../models/User")
let PasswordToken = require("../models/PasswordToken")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

let secret = "qwerrtyuiopasdfghjklçzxcvbnm7539851465"
class Usercontroller {
    async index(req, res) {
        let users = await User.findAll();
        res.json(users);
    }

    async create(req, res) {
        let { email, name, password } = req.body;
        if (email == undefined || email == '' || email == ' ') {
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
            res.send("" + result.token);
        } else {
            res.status(406);
            res.send(result.err)
        }
    }

    async changePassword(req, res) {
        let token = req.body.token;
        let password = req.body.password;
        let isValidToken = await PasswordToken.validate(token);
        if (isValidToken.status) {
            await User.changePassword(password, isValidToken.token.user_id, isValidToken.token.token);
            res.status(200);
            res.send("Senha alterada!");
        } else {
            res.status(406);
            res.send('Token inválido!');
        }
    }

    async login(req, res) {
        let { email, password } = req.body;

        let user = await User.findByEmail(email);

        if (user != undefined) {
            let result = await bcrypt.compare(password, user.password);
            if(result){
                let token = jwt.sign({email: user.email, role: user.role}, secret);
                res.status(200);
                res.json({token:token});
            }else{
                res.status(406);
                res.send("Email/Senha incorreta!")
            }
        } else {
            res.json({status: false});
        }
    }
}

module.exports = new Usercontroller();