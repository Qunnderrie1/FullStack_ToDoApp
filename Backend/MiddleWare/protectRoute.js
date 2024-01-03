const jwt = require('jsonwebtoken');
const user = require('../Model/UserModel');


const protect = async (req, res, next) => {

    let token;

    token = req.cookies.token

    if(token){
        try {
            const decode = jwt.verify(token , process.env.JWT_SECERT);
            req.user = await user.findById(decode.userId).select("-password")

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, Invaild token")
            
        }
    }else{
        throw new Error("Not authorized, No Token")
    }

}


module.exports = { protect }

