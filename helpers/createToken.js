const jwt = require("jsonwebtoken")



const createToken = (id) => {

    return jwt.sign({id}, "mysecret", {expiresIn: "2d"})
}



module.exports = createToken