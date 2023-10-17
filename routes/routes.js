var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
let Usercontroller = require("../controllers/UserController");

router.get('/', HomeController.index);
router.post('/user', Usercontroller.create);
router.get('/user', Usercontroller.index);
router.get('/user/:id', Usercontroller.findUser);
router.put('/user', Usercontroller.editUser);
router.delete('/user/:id', Usercontroller.deleteUser);

module.exports = router;