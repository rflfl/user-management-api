const jwt = require("jsonwebtoken")
let secret = "qwerrtyuiopasdfghjklçzxcvbnm7539851465"
module.exports = function (req, res, next){
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1];
        try {
            let decoded = jwt.verify(token, secret);
            if(decoded.role == 1){
                next();
            } else {
                res.status(403);
                res.send("Você não está autorizado");
                return;
            }
        } catch (error) {
        }
    } else {
        res.status(403);
        res.send("Você nao está autorizado");
    }
}