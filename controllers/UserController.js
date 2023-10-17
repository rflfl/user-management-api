let User = require("../models/User")
class Usercontroller{
    async index(req, res){}

    async create(req,res){
        let { email, name, password } = req.body;
        if( email == undefined ){
            res.status(400);
            res.json({err: "o email é inválido"})
            return;
        }
        let existEmail = await User.findEmail(email)
        if(existEmail){
            res.status(406);
            res.json({err: "o e-mail já está cadastrado."});
            return;
        }
        await User.newUser(email, password, name);

        res.status(200);
        res.send("Ok");
    }
}

module.exports = new Usercontroller();