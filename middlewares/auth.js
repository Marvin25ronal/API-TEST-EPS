const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        jwt.verify(token, 'marvin25', (err, payload) => {
            //console.log(token)
            if (err) {
                console.log(err)
                return res.status(401).send('Invalid Token')
            }
            //verificamos expiracion
            //console.log(payload)
            let date = new Date(payload.exp * 1000)
            if (date <= new Date()) {
                console.log('expirado')
            }
            req.user = payload
            return next()
        })



    } catch (err) {
        console.log(err)
        return res.status(401).send('Invalid Token')
    }
    return next();
}
module.exports = verifyToken