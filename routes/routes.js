let express = require("express")
let app = express();
let router = express.Router();
let HomeController = require("../controllers/HomeController");
let Usercontroller = require("../controllers/UserController");
let AdminAuth = require("../middleware/AdminAuth")

router.get('/', HomeController.index);
router.post('/user', Usercontroller.create);
router.get('/user', AdminAuth, Usercontroller.index);
router.get('/user/:id',AdminAuth, Usercontroller.findUser);
router.put('/user',AdminAuth, Usercontroller.editUser);
router.delete('/user/:id', AdminAuth, Usercontroller.deleteUser);
router.post('/recoverpassword', Usercontroller.revocerPassaword);
router.post('/changepassword', Usercontroller.changePassword);
router.post('/login', Usercontroller.login);
router.post('/validate', AdminAuth, HomeController.validate);

module.exports = router;