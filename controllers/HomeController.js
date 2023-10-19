class HomeController{

    async index(req, res){
        res.send("User Management API");
    }

}

module.exports = new HomeController();