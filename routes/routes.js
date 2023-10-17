var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
let Usercontroller = require("../controllers/UserController");

router.get('/', HomeController.index);
router.post('/user', Usercontroller.create);

module.exports = router;