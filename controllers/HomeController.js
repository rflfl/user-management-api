class HomeController{

    async index(req, res){
        res.send("User Management API");
    }

    async validate(req, res){
        res.send("ok");
    }

}

module.exports = new HomeController();